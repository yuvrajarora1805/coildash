import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'operator') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { spec_helix, actual_helix, actual_lo, actual_od_id, actual_nc, actual_ends, operator_name, setup_date, setup_time, part_no } = data;

    const cleanDecimal = (val: any) => {
      if (val === undefined || val === null) return null;
      const s = String(val).trim().replace(/[^0-9.-]/g, '');
      if (!s || s === '-' || s === '.') return null;
      const n = parseFloat(s);
      return isNaN(n) ? null : n;
    };

    const cleanDate = (val: any) => {
      if (val === undefined || val === null) return null;
      const s = String(val).trim();
      return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
    };

    const cleanTime = (val: any) => {
      if (val === undefined || val === null) return null;
      const s = String(val).trim();
      return /^\d{1,2}:\d{2}(:\d{2})?$/.test(s) ? s : null;
    };

    const sHelix = cleanDecimal(spec_helix);
    const aHelix = cleanDecimal(actual_helix);
    const aLo = cleanDecimal(actual_lo);
    const aOdId = cleanDecimal(actual_od_id);
    const aNc = cleanDecimal(actual_nc);
    const aEnds = cleanDecimal(actual_ends);
    const sDate = cleanDate(setup_date);
    const sTime = cleanTime(setup_time);

    let card_no = '';
    const connection = await pool.getConnection();
    try {
      // Create a new card number (e.g. PC-YYYYMMDD-XXXX)
      const dateStr = new Date().toISOString().slice(0,10).replace(/-/g, '');
      const [countResult]: any = await connection.query('SELECT COUNT(*) as count FROM process_cards');
      const nextId = countResult[0].count + 1;
      card_no = `PC-${dateStr}-${nextId.toString().padStart(4, '0')}`;

      // Default machine and part for prototype if not provided
      let machine_id = 1; // S-01
      let part_id = 1;

      if (part_no) {
        const [parts]: any = await connection.query('SELECT id FROM parts WHERE part_no = ?', [part_no]);
        if (parts.length > 0) part_id = parts[0].id;
      }

      // Insert process card
      const [insertResult]: any = await connection.query(
        `INSERT INTO process_cards (card_no, machine_id, part_id, operator_id, status)
         VALUES (?, ?, ?, ?, 'pending_supervisor')`,
        [card_no, machine_id, part_id, session.user.id]
      );
      
      const cardId = insertResult.insertId;

      // Insert setup parameters
      await connection.query(`
        INSERT INTO process_card_setup (process_card_id, spec_helix, actual_helix, actual_lo, actual_od_id, actual_nc, actual_ends, setup_date, setup_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [cardId, sHelix, aHelix, aLo, aOdId, aNc, aEnds, sDate, sTime]);

    } finally {
      connection.release();
    }

    return NextResponse.json({ success: true, card_no });
  } catch (error: any) {
    console.error('Error creating process card:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
