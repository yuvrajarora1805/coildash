import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'operator') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const connection = await pool.getConnection();
    try {
      // Create a new card number (e.g. PC-YYYYMMDD-XXXX)
      const dateStr = new Date().toISOString().slice(0,10).replace(/-/g, '');
      const [countResult]: any = await connection.query('SELECT COUNT(*) as count FROM process_cards');
      const nextId = countResult[0].count + 1;
      const card_no = `PC-${dateStr}-${nextId.toString().padStart(4, '0')}`;

      // Default machine and part for prototype if not provided
      let machine_id = 1; // S-01
      let part_id = 1;

      // Insert process card
      const [insertResult]: any = await connection.query(
        `INSERT INTO process_cards (card_no, machine_id, part_id, operator_id, status)
         VALUES (?, ?, ?, ?, 'draft')`,
        [card_no, machine_id, part_id, session.user.id]
      );
      
      const cardId = insertResult.insertId;

      return NextResponse.json({ success: true, card_no });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating process card:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
