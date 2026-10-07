import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.SENSOR_API_SECRET || 'secret123';

    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { machine_no, count, status, error_msg } = body;

    if (!machine_no || typeof count !== 'number') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    try {
      let finalStatus = 'ok';
      if (status === 'error') {
        finalStatus = error_msg || 'unknown_error';
      }
      
      const [result]: any = await connection.query(
        'UPDATE machines SET live_count = live_count + ?, sensor_status = ? WHERE machine_no = ?',
        [count, finalStatus, machine_no]
      );

      if (result.affectedRows === 0) {
        return NextResponse.json({ error: 'Machine not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error in sensor update API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
