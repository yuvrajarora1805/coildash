import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { card_no, type, data } = body;

    if (!card_no || !type || !data) {
      return NextResponse.json({ error: 'Missing card_no, type, or data' }, { status: 400 });
    }

    const cleanDecimal = (val: any) => {
      if (val === undefined || val === null) return null;
      const s = String(val).trim().replace(/[^0-9.-]/g, '');
      if (!s || s === '-' || s === '.') return null;
      const n = parseFloat(s);
      return isNaN(n) ? null : n;
    };

    const cleanStr = (val: any) => {
      if (val === undefined || val === null) return null;
      const s = String(val).trim();
      return s === '' ? null : s;
    };

    const cleanTime = (val: any) => {
      if (val === undefined || val === null) return null;
      const s = String(val).trim();
      if (!s || s === '--:--' || s === '') return null;
      return /^\d{1,2}:\d{2}(:\d{2})?$/.test(s) ? s : null;
    };

    const cleanInt = (val: any, fallback = 0) => {
      if (val === undefined || val === null) return fallback;
      const n = parseInt(String(val).replace(/[^0-9-]/g, ''), 10);
      return isNaN(n) ? fallback : n;
    };

    const connection = await pool.getConnection();
    try {
      // Find card ID
      const [cards]: any = await connection.query('SELECT id FROM process_cards WHERE card_no = ?', [card_no]);
      if (!cards.length) {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }
      const cardId = cards[0].id;

      if (type === 'first_off' || type === 'last_off') {
        // data: [{ sample_no, fl, od_id, nc, ends, helix, visual, sample_time, sign }]
        await connection.query('DELETE FROM process_card_inspections WHERE process_card_id = ? AND stage = ?', [cardId, type]);
        const samples = Array.isArray(data) ? data : [];
        for (let idx = 0; idx < samples.length; idx++) {
          const row = samples[idx];
          await connection.query(`
            INSERT INTO process_card_inspections (process_card_id, stage, sample_no, fl, od_id, nc, ends, helix, visual, sample_time, sign)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            cardId, type, cleanInt(row.sample_no, idx + 1),
            cleanStr(row.fl), cleanStr(row.od_id), cleanStr(row.nc), cleanStr(row.ends),
            cleanStr(row.helix), cleanStr(row.visual), cleanTime(row.sample_time), cleanStr(row.sign)
          ]);
        }
      } else if (type === 'observations') {
        // data: array of rows
        await connection.query('DELETE FROM process_card_observations WHERE process_card_id = ?', [cardId]);
        for (let i = 0; i < (Array.isArray(data) ? data.length : 0); i++) {
          const row = data[i];
          await connection.query(`
            INSERT INTO process_card_observations (
              process_card_id, row_no,
              start_lo, start_od, start_nc, start_ends,
              mid_lo, mid_od, mid_nc, mid_ends,
              end_lo, end_od, end_nc, end_ends,
              qty, operator_sign, supervisor_sign, section_head_sign
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            cardId, i + 1,
            cleanStr(row.start_lo), cleanStr(row.start_od), cleanStr(row.start_nc), cleanStr(row.start_ends),
            cleanStr(row.mid_lo), cleanStr(row.mid_od), cleanStr(row.mid_nc), cleanStr(row.mid_ends),
            cleanStr(row.end_lo), cleanStr(row.end_od), cleanStr(row.end_nc), cleanStr(row.end_ends),
            cleanInt(row.qty, 0),
            cleanStr(row.operator_sign), cleanStr(row.supervisor_sign), cleanStr(row.section_head_sign)
          ]);
        }
      } else if (type === 'rejections') {
        // data: array of rejection rows
        await connection.query('DELETE FROM process_card_rejections WHERE process_card_id = ?', [cardId]);
        for (const row of (Array.isArray(data) ? data : [])) {
          await connection.query(`
            INSERT INTO process_card_rejections (
              process_card_id, cchl_coil_no, part_no, job_setting, id_od, nc, wire_bend, power_cut, total_rej, wire_cut_fit, remarks
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            cardId, cleanStr(row.cchl_coil_no), cleanStr(row.part_no),
            cleanInt(row.job_setting, 0), cleanInt(row.id_od, 0), cleanInt(row.nc, 0),
            cleanInt(row.wire_bend, 0), cleanInt(row.power_cut, 0), cleanInt(row.total_rej, 0),
            cleanInt(row.wire_cut_fit, 0), cleanStr(row.remarks)
          ]);
        }
      } else if (type === 'abnormality') {
        // data: object with stage, defect_type, downtime_mins, scrap_qty, suspect_qty, tooling_adjustments, quarantine_tag, description, severity, reported_by
        await connection.query(`
          INSERT INTO process_card_abnormalities (
            process_card_id, stage, defect_type, downtime_mins, scrap_qty, suspect_qty, tooling_adjustments, quarantine_tag, description, severity, reported_by
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          cardId, data.stage || 'first_off', cleanStr(data.defect_type),
          cleanInt(data.downtime_mins, 0), cleanInt(data.scrap_qty, 0), cleanInt(data.suspect_qty, 0),
          cleanStr(data.tooling_adjustments), cleanStr(data.quarantine_tag),
          cleanStr(data.description), data.severity || 'minor', cleanStr(data.reported_by) || session.user.name
        ]);
      } else if (type === 'retro_verify') {
        // data: { event_no, press_reading, temp_reading, volt_reading, samples, supervisor_name, supervisor_status, supervisor_remarks }
        const eventNo = cleanInt(data.event_no, 1);
        await connection.query('DELETE FROM process_card_retro_verifications WHERE process_card_id = ? AND event_no = ?', [cardId, eventNo]);
        const samples = Array.isArray(data.samples) ? data.samples : [];
        for (let s = 0; s < samples.length; s++) {
          const row = samples[s];
          await connection.query(`
            INSERT INTO process_card_retro_verifications (
              process_card_id, event_no, press_reading, temp_reading, volt_reading,
              sample_no, fl, od_id, nc, ends, helix, visual, sample_time, sign,
              supervisor_name, supervisor_status, supervisor_remarks
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            cardId, eventNo, cleanStr(data.press_reading), cleanStr(data.temp_reading), cleanStr(data.volt_reading),
            s + 1, cleanStr(row.fl), cleanStr(row.od_id), cleanStr(row.nc), cleanStr(row.ends),
            cleanStr(row.helix), cleanStr(row.visual), cleanTime(row.sample_time), cleanStr(row.sign),
            cleanStr(data.supervisor_name), data.supervisor_status || 'pending', cleanStr(data.supervisor_remarks)
          ]);
        }
      } else if (type === 'material_trace') {
        // data: { coil_no, wire_grade, wire_dia, heat_no, uts_rm_no, coil_weight, part_no }
        const coilNo = cleanStr(data.coil_no);
        const wireGrade = cleanStr(data.wire_grade);
        const wireDia = cleanDecimal(data.wire_dia);
        const heatNo = cleanStr(data.heat_no);
        const utsRmNo = cleanStr(data.uts_rm_no);
        const coilWeight = cleanDecimal(data.coil_weight);

        await connection.query('DELETE FROM material_traceability WHERE process_card_id = ?', [cardId]);
        await connection.query(`
          INSERT INTO material_traceability (process_card_id, coil_no, wire_grade, wire_dia, heat_no, uts_rm_no, coil_weight)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
          cardId, coilNo, wireGrade, wireDia, heatNo, utsRmNo, coilWeight
        ]);

        if (data.part_no) {
          const [parts]: any = await connection.query('SELECT id FROM parts WHERE part_no = ?', [data.part_no]);
          if (parts.length) {
            await connection.query('UPDATE process_cards SET part_id = ? WHERE id = ?', [parts[0].id, cardId]);
          }
        }
      } else if (type === 'quality_limits') {
        // data: { press_reading, temp_reading, volt_reading, quality_verified_by }
        const verifiedBy = cleanStr(data.quality_verified_by);
        await connection.query(`
          UPDATE process_cards 
          SET press_reading = ?, temp_reading = ?, volt_reading = ?,
              quality_verified_by = COALESCE(?, quality_verified_by),
              quality_verified_at = CASE WHEN ? IS NOT NULL THEN NOW() ELSE quality_verified_at END
          WHERE id = ?
        `, [cleanStr(data.press_reading), cleanStr(data.temp_reading), cleanStr(data.volt_reading), verifiedBy, verifiedBy, cardId]);
      } else {
        return NextResponse.json({ error: 'Unknown data type' }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: `${type} saved successfully` });
    } finally {
      connection.release();
    }
  } catch (error: any) {
    console.error('Error saving process card details:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
