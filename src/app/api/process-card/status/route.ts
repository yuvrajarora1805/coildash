import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { card_no, status } = await req.json();

    if (!card_no || !status) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    try {
      await connection.query(
        'UPDATE process_cards SET status = ? WHERE card_no = ?',
        [status, card_no]
      );
    } finally {
      connection.release();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating process card status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
