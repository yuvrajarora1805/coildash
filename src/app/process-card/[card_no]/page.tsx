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
        SELECT pc.*, m.machine_no, p.part_no, u.name as operator_name,
               pcs.actual_helix, pcs.actual_lo, pcs.actual_od_id, pcs.actual_nc, pcs.actual_ends, pcs.setup_date, pcs.setup_time
        FROM process_cards pc 
        LEFT JOIN machines m ON pc.machine_id = m.id 
        LEFT JOIN parts p ON pc.part_id = p.id 
        LEFT JOIN users u ON pc.operator_id = u.id 
        LEFT JOIN process_card_setup pcs ON pcs.process_card_id = pc.id
        WHERE pc.card_no = ?
      `, [card_no]);
      
      if (rows.length > 0) {
        processCard = rows[0];
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
