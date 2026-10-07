import Link from 'next/link';
import { FilePlus, FileText, BarChart3, Settings, LogOut } from 'lucide-react';
import { logout } from '@/app/login/actions';
import { getSession } from '@/lib/auth';
import LiveMachineStatus from '@/components/LiveMachineStatus';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const session = await getSession();
  const user = session?.user || { name: 'Guest', role: 'unknown' };

  let activeRuns = 0;
  let shiftProduction = 0;
  let abnormalities = 0;
  let recentCards: any[] = [];

  try {
    const connection = await pool.getConnection();
    try {
      const [runsResult]: any = await connection.query("SELECT COUNT(*) as count FROM process_cards WHERE status IN ('pending_supervisor', 'approved')");
      activeRuns = runsResult[0]?.count || 0;

      const [prodResult]: any = await connection.query("SELECT SUM(live_count) as total FROM machines");
      shiftProduction = prodResult[0]?.total || 0;

      const [faultsResult]: any = await connection.query("SELECT COUNT(*) as count FROM machines WHERE sensor_status != 'ok'");
      abnormalities = faultsResult[0]?.count || 0;

      let cardsQuery = `
        SELECT pc.card_no, pc.status, m.machine_no, p.part_no, u.name as operator_name 
        FROM process_cards pc 
        LEFT JOIN machines m ON pc.machine_id = m.id 
        LEFT JOIN parts p ON pc.part_id = p.id 
        LEFT JOIN users u ON pc.operator_id = u.id 
      `;
      
      let queryParams: any[] = [];
      
      if (user.role === 'operator') {
        cardsQuery += ' WHERE pc.operator_id = ? ';
        queryParams.push(user.id);
      } else if (user.role === 'supervisor') {
        cardsQuery += " WHERE pc.status = 'pending_supervisor' ";
      } else if (user.role === 'section_head') {
        cardsQuery += " WHERE pc.status IN ('pending_section_head', 'approved', 'closed') ";
      }
      
      cardsQuery += ' ORDER BY pc.created_at DESC LIMIT 5 ';

      const [cardsResult]: any = await connection.query(cardsQuery, queryParams);
      recentCards = cardsResult;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Dashboard DB error:", error);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#eef2fb]">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary-900 border-r border-secondary-800 flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-4 border-b border-secondary-800">
          <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center font-display font-bold text-white text-sm shrink-0">
            CC
          </div>
          <div className="ml-3">
            <div className="font-display font-bold text-secondary-100 text-sm leading-tight">Coventry Coil-o-Matic</div>
            <div className="text-[10px] text-secondary-500 tracking-wider font-bold uppercase">Control System</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded bg-white/10 text-white font-medium text-sm transition-colors">
            <BarChart3 size={18} /> Dashboard
          </Link>
          {user.role === 'operator' && (
            <Link href="/process-card" className="flex items-center gap-3 px-3 py-2 rounded text-secondary-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
              <FilePlus size={18} /> New Process Card
            </Link>
          )}
          {user.role !== 'operator' && (
            <Link href="/records" className="flex items-center gap-3 px-3 py-2 rounded text-secondary-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
              <FileText size={18} /> Production Records
            </Link>
          )}
          {user.role === 'section_head' && (
            <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded text-secondary-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
              <Settings size={18} /> Settings
            </Link>
          )}
        </nav>
        
        <div className="p-4 border-t border-secondary-800">
          <div className="text-xs text-secondary-500 mb-1">Logged in as</div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-white">{user.name}</div>
            <span className="text-[10px] font-bold bg-primary-700 text-primary-100 px-2 py-0.5 rounded uppercase tracking-wider">{user.role.replace('_', ' ')}</span>
          </div>
          <form action={logout}>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded bg-secondary-800 text-secondary-400 hover:text-white hover:bg-secondary-700 text-xs font-bold transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-secondary-200 flex items-center px-6 sticky top-0 z-10">
          <h1 className="font-display font-bold text-lg text-secondary-900">Shop Floor Dashboard</h1>
        </header>
        
        <div className="p-6 max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-secondary-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs text-secondary-500 font-bold uppercase tracking-wider mb-1">Active Runs</div>
                <div className="font-mono text-3xl font-bold text-secondary-900">{activeRuns}</div>
              </div>
              <div className="text-sm text-primary-600 font-medium mt-4">View active process cards →</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-secondary-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs text-secondary-500 font-bold uppercase tracking-wider mb-1">Total Production</div>
                <div className="font-mono text-3xl font-bold text-secondary-900">{shiftProduction.toLocaleString()}</div>
              </div>
              <div className="text-sm text-emerald-600 font-medium mt-4">Live sensor count</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-secondary-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs text-secondary-500 font-bold uppercase tracking-wider mb-1">Sensor Faults</div>
                <div className="font-mono text-3xl font-bold text-rose-600">{abnormalities}</div>
              </div>
              <div className="text-sm text-rose-600 font-medium mt-4">Require attention</div>
            </div>
          </div>
          
          <LiveMachineStatus />
          
          <div className="bg-white rounded-xl border border-secondary-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-secondary-200 flex justify-between items-center bg-secondary-50">
              <h2 className="font-bold text-secondary-900">Recent Process Cards</h2>
              {user.role === 'operator' && (
                <Link href="/process-card" className="bg-primary-600 hover:bg-primary-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <FilePlus size={14} /> NEW PROCESS CARD
                </Link>
              )}
            </div>
            <div className="divide-y divide-secondary-200">
              {recentCards.length === 0 ? (
                <div className="p-6 text-center text-secondary-500 text-sm">No recent process cards found.</div>
              ) : (
                recentCards.map((card, idx) => (
                  <Link href={`/process-card/${card.card_no}`} key={idx} className="p-4 px-6 flex items-center justify-between hover:bg-secondary-50 transition-colors cursor-pointer block">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          card.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-secondary-100 text-secondary-600'
                        }`}>
                          <FileText size={18} />
                        </div>
                        <div>
                          <div className={`font-mono font-bold text-sm ${
                            card.status === 'approved' ? 'text-secondary-900' : 'text-primary-600'
                          }`}>{card.card_no}</div>
                          <div className="text-xs text-secondary-500 font-medium mt-0.5">Machine {card.machine_no || 'N/A'} • Part {card.part_no || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="text-xs font-bold text-secondary-900">Operator</div>
                          <div className="text-xs text-secondary-500">{card.operator_name || 'N/A'}</div>
                        </div>
                        <div className="w-24">
                          <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            card.status === 'approved' 
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                              : card.status === 'pending_supervisor'
                                ? 'bg-amber-100 text-amber-800 border-amber-200'
                                : card.status === 'pending_section_head'
                                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                                  : 'bg-secondary-100 text-secondary-800 border-secondary-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              card.status === 'approved' ? 'bg-emerald-600' : card.status === 'pending_supervisor' ? 'bg-amber-600' : card.status === 'pending_section_head' ? 'bg-blue-600' : 'bg-secondary-600'
                            }`}></span> {card.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
