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
    const { card_no, spec_helix, actual_helix, spec_lo, actual_lo, spec_od_id, actual_od_id, spec_nc, actual_nc, spec_ends, actual_ends, operator_name, setup_date, setup_time, part_no } = data;

    if (!card_no) {
      return NextResponse.json({ error: 'Missing card_no' }, { status: 400 });
    }

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
    const sLo = cleanDecimal(spec_lo);
    const aLo = cleanDecimal(actual_lo);
    const sOdId = cleanDecimal(spec_od_id);
    const aOdId = cleanDecimal(actual_od_id);
    const sNc = cleanDecimal(spec_nc);
    const aNc = cleanDecimal(actual_nc);
    const sEnds = cleanDecimal(spec_ends);
    const aEnds = cleanDecimal(actual_ends);
    const sDate = cleanDate(setup_date);
    const sTime = cleanTime(setup_time);

    const connection = await pool.getConnection();
    try {
      // Find process card
      const [cards]: any = await connection.query('SELECT id FROM process_cards WHERE card_no = ?', [card_no]);
      if (!cards.length) {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }
      const cardId = cards[0].id;

      // Update part_no if changed
      if (part_no) {
        const [parts]: any = await connection.query('SELECT id FROM parts WHERE part_no = ?', [part_no]);
        if (parts.length) {
           await connection.query('UPDATE process_cards SET part_id = ? WHERE id = ?', [parts[0].id, cardId]);
        }
      }

      // Upsert setup parameters
      const [setups]: any = await connection.query('SELECT id FROM process_card_setup WHERE process_card_id = ?', [cardId]);
      if (setups.length) {
        await connection.query(`
          UPDATE process_card_setup 
          SET spec_helix = ?, actual_helix = ?, spec_lo = ?, actual_lo = ?, spec_od_id = ?, actual_od_id = ?, spec_nc = ?, actual_nc = ?, spec_ends = ?, actual_ends = ?, setup_date = ?, setup_time = ?
          WHERE process_card_id = ?
        `, [sHelix, aHelix, sLo, aLo, sOdId, aOdId, sNc, aNc, sEnds, aEnds, sDate, sTime, cardId]);
      } else {
        await connection.query(`
          INSERT INTO process_card_setup (process_card_id, spec_helix, actual_helix, spec_lo, actual_lo, spec_od_id, actual_od_id, spec_nc, actual_nc, spec_ends, actual_ends, setup_date, setup_time)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [cardId, sHelix, aHelix, sLo, aLo, sOdId, aOdId, sNc, aNc, sEnds, aEnds, sDate, sTime]);
      }

    } finally {
      connection.release();
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving setup:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
