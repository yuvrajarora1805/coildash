import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UserPlus, Users, ShieldAlert } from 'lucide-react';
import pool from '@/lib/db';
import { createUser } from './actions';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getSession();
  const user = session?.user;

  // RBAC: Only allow section_head to access Settings
  if (user?.role !== 'section_head') {
    redirect('/');
  }

  // Fetch users
  let allUsers: any[] = [];
  try {
    const connection = await pool.getConnection();
    try {
      const [rows]: any = await connection.query('SELECT id, name, role, created_at FROM users ORDER BY created_at DESC');
      allUsers = rows;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }

  return (
    <div className="min-h-screen bg-[#eef2fb]">
      {/* Header */}
      <header className="h-16 bg-secondary-900 border-b border-secondary-800 flex items-center px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-secondary-400 hover:text-white transition-colors flex items-center text-sm font-medium gap-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="h-5 w-px bg-secondary-700"></div>
          <h1 className="font-display font-bold text-lg text-white">System Settings</h1>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto space-y-6">
        
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
          <ShieldAlert className="text-amber-600 shrink-0" size={20} />
          <div>
            <h3 className="font-bold text-amber-800">Administrator Access</h3>
            <p className="text-sm text-amber-700 mt-1">You are viewing this page because you have the <strong>Section Head</strong> role. Changes made here affect the entire system.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create User Form */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-secondary-200 bg-secondary-50">
                <h2 className="font-bold text-secondary-900 flex items-center gap-2">
                  <UserPlus size={18} className="text-primary-600" />
                  Create New User
                </h2>
              </div>
              {/* @ts-ignore */}
              <form action={createUser} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Full Name</label>
                  <input name="name" type="text" required placeholder="e.g. John Doe" className="w-full px-4 py-2 border border-secondary-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Role</label>
                  <select name="role" required className="w-full px-4 py-2 border border-secondary-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                    <option value="operator">Operator</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="section_head">Section Head</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Temporary Password</label>
                  <input name="password" type="password" required placeholder="••••••••" className="w-full px-4 py-2 border border-secondary-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
                </div>
                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition-colors mt-2">
                  Create User
                </button>
              </form>
            </div>
          </div>

          {/* User List */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden h-full">
              <div className="px-6 py-4 border-b border-secondary-200 bg-secondary-50">
                <h2 className="font-bold text-secondary-900 flex items-center gap-2">
                  <Users size={18} className="text-primary-600" />
                  System Users
                </h2>
              </div>
              <div className="divide-y divide-secondary-200 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                {allUsers.length === 0 ? (
                  <div className="p-6 text-center text-secondary-500">No users found.</div>
                ) : (
                  allUsers.map((u) => (
                    <div key={u.id} className="p-4 px-6 flex items-center justify-between hover:bg-secondary-50 transition-colors">
                      <div>
                        <div className="font-bold text-sm text-secondary-900">{u.name}</div>
                        <div className="text-xs text-secondary-500 mt-0.5">Joined: {new Date(u.created_at).toLocaleDateString()}</div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        u.role === 'section_head' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                        u.role === 'supervisor' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        'bg-blue-100 text-blue-800 border-blue-200'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
