import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows]: any = await connection.query(
        'SELECT machine_no, status, live_count, sensor_status FROM machines'
      );

      return NextResponse.json({ machines: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching machine status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
