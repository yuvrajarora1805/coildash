import pool from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import PrintCardClient from './PrintCardClient';

export default async function PrintCardPage({ params }: { params: Promise<{ card_no: string }> }) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/login');
  }

  const { card_no } = await params;
  let cardData: any = null;

  try {
    const connection = await pool.getConnection();
    try {
      const [cards]: any = await connection.query(`
        SELECT pc.*, m.machine_no, p.part_no, p.part_name, u.name as operator_name,
               pcs.spec_helix, pcs.actual_helix, pcs.spec_lo, pcs.actual_lo, pcs.spec_od_id, pcs.actual_od_id, pcs.spec_nc, pcs.actual_nc, pcs.spec_ends, pcs.actual_ends, pcs.setup_date, pcs.setup_time,
               sa.action as setup_approval_action, sa.remarks as setup_approval_remarks, sa.created_at as setup_approved_at,
               su.name as supervisor_name
        FROM process_cards pc
        LEFT JOIN machines m ON pc.machine_id = m.id
        LEFT JOIN parts p ON pc.part_id = p.id
        LEFT JOIN users u ON pc.operator_id = u.id
        LEFT JOIN process_card_setup pcs ON pcs.process_card_id = pc.id
        LEFT JOIN setup_approvals sa ON sa.process_card_id = pc.id AND sa.action = 'approved'
        LEFT JOIN users su ON sa.approver_id = su.id
        WHERE pc.card_no = ?
      `, [card_no]);

      if (cards.length > 0) {
        cardData = cards[0];

        // Fetch first-off & last-off inspections
        const [inspections]: any = await connection.query(
          'SELECT * FROM process_card_inspections WHERE process_card_id = ? ORDER BY stage, sample_no ASC',
          [cardData.id]
        );
        cardData.first_off = inspections.filter((i: any) => i.stage === 'first_off');
        cardData.last_off = inspections.filter((i: any) => i.stage === 'last_off');

        // Fetch observations
        const [observations]: any = await connection.query(
          'SELECT * FROM process_card_observations WHERE process_card_id = ? ORDER BY row_no ASC',
          [cardData.id]
        );
        cardData.observations = observations;

        // Fetch rejections
        const [rejections]: any = await connection.query(
          'SELECT * FROM process_card_rejections WHERE process_card_id = ? ORDER BY id ASC',
          [cardData.id]
        );
        cardData.rejections = rejections;

        // Fetch abnormalities
        const [abnormalities]: any = await connection.query(
          'SELECT * FROM process_card_abnormalities WHERE process_card_id = ? ORDER BY id ASC',
          [cardData.id]
        );
        cardData.abnormalities = abnormalities;

        // Fetch retro verifications
        const [retroVerifications]: any = await connection.query(
          'SELECT * FROM process_card_retro_verifications WHERE process_card_id = ? ORDER BY event_no, sample_no ASC',
          [cardData.id]
        );
        cardData.retro_verifications = retroVerifications;

        // Fetch material traceability
        const [materials]: any = await connection.query(
          'SELECT * FROM material_traceability WHERE process_card_id = ?',
          [cardData.id]
        );
        cardData.material = materials.length > 0 ? materials[0] : null;
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching card for print:', error);
  }

  if (!cardData) {
    return <div className="p-8 text-center text-red-600 font-bold">Process Card Not Found</div>;
  }

  return <PrintCardClient card={cardData} />;
}
