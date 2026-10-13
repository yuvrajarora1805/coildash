import Wizard from "../Wizard";
import { getSession } from "@/lib/auth";
import { redirect } from 'next/navigation';
import pool from '@/lib/db';

export default async function ProcessCardDetailPage({ params }: { params: Promise<{ card_no: string }> }) {
  const session = await getSession();
  const user = session?.user || { name: 'Guest', role: 'unknown' };

  if (!user || user.role === 'unknown') {
    redirect('/login');
  }

  const { card_no } = await params;

  let processCard = null;
  try {
    const connection = await pool.getConnection();
    try {
      const [rows]: any = await connection.query(`
        SELECT pc.*, m.machine_no, p.part_no, p.part_name, u.name as operator_name,
               pcs.spec_helix, pcs.actual_helix, pcs.spec_lo, pcs.actual_lo, pcs.spec_od_id, pcs.actual_od_id, pcs.spec_nc, pcs.actual_nc, pcs.spec_ends, pcs.actual_ends, pcs.setup_date, pcs.setup_time,
               mt.coil_no, mt.wire_grade, mt.wire_dia, mt.heat_no, mt.uts_rm_no, mt.coil_weight, mt.gal_weight,
               (SELECT remarks FROM setup_approvals sa WHERE sa.process_card_id = pc.id AND sa.action = 'rejected' ORDER BY sa.created_at DESC LIMIT 1) as rejection_remarks,
               (SELECT remarks FROM setup_approvals sa WHERE sa.process_card_id = pc.id AND sa.action = 'approved' ORDER BY sa.created_at DESC LIMIT 1) as approval_remarks,
               (SELECT su.name FROM setup_approvals sa JOIN users su ON sa.approver_id = su.id WHERE sa.process_card_id = pc.id AND sa.action = 'approved' ORDER BY sa.created_at DESC LIMIT 1) as approved_by_name
        FROM process_cards pc 
        LEFT JOIN machines m ON pc.machine_id = m.id 
        LEFT JOIN parts p ON pc.part_id = p.id 
        LEFT JOIN users u ON pc.operator_id = u.id 
        LEFT JOIN process_card_setup pcs ON pcs.process_card_id = pc.id
        LEFT JOIN material_traceability mt ON mt.process_card_id = pc.id
        WHERE pc.card_no = ?
      `, [card_no]);
      
      if (rows.length > 0) {
        processCard = rows[0];

        // Fetch first-off & last-off inspections
        const [inspections]: any = await connection.query(
          'SELECT * FROM process_card_inspections WHERE process_card_id = ? ORDER BY stage, sample_no ASC',
          [processCard.id]
        );
        processCard.first_off = inspections.filter((i: any) => i.stage === 'first_off');
        processCard.last_off = inspections.filter((i: any) => i.stage === 'last_off');

        // Fetch observations
        const [obs]: any = await connection.query(
          'SELECT * FROM process_card_observations WHERE process_card_id = ? ORDER BY row_no ASC',
          [processCard.id]
        );
        processCard.observations = obs;

        // Fetch rejections
        const [rejs]: any = await connection.query(
          'SELECT * FROM process_card_rejections WHERE process_card_id = ? ORDER BY id ASC',
          [processCard.id]
        );
        processCard.rejections = rejs;
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching process card:', error);
  }

  if (!processCard) {
    return <div className="p-8 text-center">Process Card Not Found</div>;
  }

  // RBAC Checks for viewing existing cards
  if (user.role === 'operator' && processCard.operator_id !== user.id) {
    redirect('/'); // Operators can only view their own cards
  }

  return <Wizard user={user} processCard={processCard} />;
}
