import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function RecordsPage() {
  const session = await getSession();
  const user = session?.user;

  // RBAC: Block operators from accessing production records directly
  if (user?.role === 'operator') {
    redirect('/');
  }

  let records: any[] = [];
  try {
    const connection = await pool.getConnection();
    try {
      const [rows]: any = await connection.query(`
        SELECT pc.card_no, pc.status, pc.created_at, m.machine_no, p.part_no, u.name as operator_name 
        FROM process_cards pc 
        LEFT JOIN machines m ON pc.machine_id = m.id 
        LEFT JOIN parts p ON pc.part_id = p.id 
        LEFT JOIN users u ON pc.operator_id = u.id 
        ORDER BY pc.created_at DESC
      `);
      records = rows;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching records:', error);
  }

  return (
    <div className="min-h-screen bg-[#eef2fb]">
      <header className="h-16 bg-secondary-900 border-b border-secondary-800 flex items-center px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-secondary-400 hover:text-white transition-colors flex items-center text-sm font-medium gap-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="h-5 w-px bg-secondary-700"></div>
          <h1 className="font-display font-bold text-lg text-white">Production Records</h1>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-secondary-200 bg-secondary-50">
            <h2 className="font-bold text-secondary-900 flex items-center gap-2">
              <FileText size={18} className="text-primary-600" />
              Historical Process Cards
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-secondary-50 border-b border-secondary-200 text-secondary-600">
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Date</th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Card No</th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Machine</th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Part No</th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Operator</th>
                  <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-secondary-500">No records found.</td>
                  </tr>
                ) : (
                  records.map((r, idx) => (
                    <tr key={idx} className="hover:bg-secondary-50 transition-colors">
                      <td className="px-6 py-3 text-secondary-600">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-3 font-mono font-bold text-secondary-900">{r.card_no}</td>
                      <td className="px-6 py-3 text-secondary-700">{r.machine_no}</td>
                      <td className="px-6 py-3 text-secondary-700">{r.part_no}</td>
                      <td className="px-6 py-3 text-secondary-700">{r.operator_name}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          r.status === 'approved' 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                            : r.status === 'pending_supervisor'
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : r.status === 'pending_section_head'
                                ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : r.status === 'closed'
                                ? 'bg-primary-100 text-primary-800 border-primary-200'
                                : 'bg-secondary-100 text-secondary-800 border-secondary-200'
                        }`}>
                          {r.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
