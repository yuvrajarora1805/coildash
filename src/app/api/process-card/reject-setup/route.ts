import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as any;
    if (user.role !== 'supervisor' && user.role !== 'section_head') {
      return NextResponse.json({ error: 'Forbidden: Only supervisors can reject setup' }, { status: 403 });
    }

    const { card_no, remarks } = await req.json();
    if (!card_no) {
      return NextResponse.json({ error: 'Missing card_no' }, { status: 400 });
    }

    if (!remarks || remarks.trim().length < 5) {
      return NextResponse.json({ error: 'Rejection remarks are required (min 5 chars)' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    try {
      const [cards]: any = await connection.query(
        'SELECT id, status FROM process_cards WHERE card_no = ?',
        [card_no]
      );
      if (!cards.length) {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }
      const card = cards[0];
      if (card.status !== 'pending_supervisor') {
        return NextResponse.json({ error: 'Card is not pending supervisor approval' }, { status: 400 });
      }

      // Revert card to draft so operator can fix and resubmit
      await connection.query(
        'UPDATE process_cards SET status = ? WHERE card_no = ?',
        ['draft', card_no]
      );

      // Log the rejection
      await connection.query(
        `INSERT INTO setup_approvals (process_card_id, approver_id, action, remarks)
         VALUES (?, ?, 'rejected', ?)`,
        [card.id, user.id, remarks]
      );
    } finally {
      connection.release();
    }

    return NextResponse.json({ success: true, newStatus: 'draft' });
  } catch (error) {
    console.error('Error rejecting setup:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
