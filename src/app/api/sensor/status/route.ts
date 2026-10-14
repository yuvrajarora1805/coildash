import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    try {
      // Check if last_seen column exists or query with fallback
      let rows: any[] = [];
      try {
        const [result]: any = await connection.query(
          'SELECT machine_no, status, live_count, sensor_status, TIMESTAMPDIFF(SECOND, last_seen, CURRENT_TIMESTAMP) as seconds_since_last_seen FROM machines'
        );
        rows = result;
      } catch (colErr: any) {
        // If last_seen column hasn't been added yet in remote DB, fallback without crashing
        if (colErr.code === 'ER_BAD_FIELD_ERROR') {
          const [result]: any = await connection.query(
            'SELECT machine_no, status, live_count, sensor_status, NULL as seconds_since_last_seen FROM machines'
          );
          rows = result;
        } else {
          throw colErr;
        }
      }

      return NextResponse.json({ machines: rows || [] });
    } finally {
      connection.release();
    }
  } catch (error: any) {
    console.error('Error fetching machine status:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV !== 'production' ? error?.message : undefined
    }, { status: 500 });
  }
}
