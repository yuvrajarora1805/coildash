'use client';

import { useActionState } from 'react';
import { login } from './actions';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2fb]">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-secondary-200">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center font-display font-bold text-white text-xl mx-auto mb-4 shadow-md">
            CC
          </div>
          <h2 className="font-display font-bold text-2xl text-secondary-900">Coventry Coil-o-Matic</h2>
          <p className="text-sm text-secondary-500 mt-1 uppercase tracking-wider font-bold">Process Control System</p>
        </div>

        <form action={formAction} className="space-y-5">
          {state?.error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg text-center font-medium">
              {state.error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-secondary-700 uppercase tracking-wider mb-2" htmlFor="username">
              Username
            </label>
            <select
              id="username"
              name="username" 
              required
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-secondary-50"
            >
              <option value="">— Select User —</option>
              <option value="Raj Kumar">Raj Kumar (Operator)</option>
              <option value="Mohan Lal">Mohan Lal (Supervisor)</option>
              <option value="Mr. A.K. Sharma">Mr. A.K. Sharma (Section Head)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary-700 uppercase tracking-wider mb-2" htmlFor="password">
              Password
            </label>
            <input 
              id="password"
              name="password" 
              type="password"
              required
              placeholder="Enter password (123456)"
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-secondary-50"
            />
          </div>

          <button 
            type="submit" 
            disabled={pending}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {pending ? 'Authenticating...' : 'Sign In to System'}
          </button>

          <div className="mt-6 text-center border-t border-secondary-100 pt-6">
            <p className="text-xs text-secondary-500 mb-3">Available Test Users (Password: 123456):</p>
            <div className="flex flex-col gap-2">
              <span className="px-2 py-1.5 bg-secondary-100 text-secondary-700 text-xs rounded-md font-mono flex justify-between">
                <strong>Raj Kumar</strong> <span>(operator)</span>
              </span>
              <span className="px-2 py-1.5 bg-secondary-100 text-secondary-700 text-xs rounded-md font-mono flex justify-between">
                <strong>Mohan Lal</strong> <span>(supervisor)</span>
              </span>
              <span className="px-2 py-1.5 bg-secondary-100 text-secondary-700 text-xs rounded-md font-mono flex justify-between">
                <strong>Mr. A.K. Sharma</strong> <span>(section_head)</span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
