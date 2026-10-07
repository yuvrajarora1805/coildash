import React from 'react';

export default function Step4FirstOff() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">First-Off / Running Inspection</h2>
          <p className="text-sm text-secondary-500 mt-1">Log the first 5 samples produced.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 4 of 12</span>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-secondary-50 border-b border-secondary-200">
              <th className="px-4 py-3 font-bold text-secondary-700 text-xs uppercase tracking-wider text-center w-12">S.No</th>
              <th className="px-4 py-3 font-bold text-secondary-700 text-xs uppercase tracking-wider">F/L</th>
              <th className="px-4 py-3 font-bold text-secondary-700 text-xs uppercase tracking-wider">OD/ID</th>
              <th className="px-4 py-3 font-bold text-secondary-700 text-xs uppercase tracking-wider">NC</th>
              <th className="px-4 py-3 font-bold text-secondary-700 text-xs uppercase tracking-wider">Ends</th>
              <th className="px-4 py-3 font-bold text-secondary-700 text-xs uppercase tracking-wider">Helix</th>
              <th className="px-4 py-3 font-bold text-secondary-700 text-xs uppercase tracking-wider">Visual</th>
              <th className="px-4 py-3 font-bold text-secondary-700 text-xs uppercase tracking-wider">Time</th>
              <th className="px-4 py-3 font-bold text-secondary-700 text-xs uppercase tracking-wider">Sign</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200">
            {[1, 2, 3, 4, 5].map(row => (
              <tr key={row} className="hover:bg-secondary-50 transition-colors">
                <td className="px-4 py-2 text-center font-mono font-bold text-secondary-500">{row}</td>
                <td className="px-4 py-2"><input type="text" className="w-16 px-2 py-1.5 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" /></td>
                <td className="px-4 py-2"><input type="text" className="w-16 px-2 py-1.5 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" /></td>
                <td className="px-4 py-2"><input type="text" className="w-16 px-2 py-1.5 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" /></td>
                <td className="px-4 py-2"><input type="text" className="w-16 px-2 py-1.5 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" /></td>
                <td className="px-4 py-2"><input type="text" className="w-16 px-2 py-1.5 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" /></td>
                <td className="px-4 py-2"><input type="text" className="w-20 px-2 py-1.5 border border-secondary-300 rounded text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" /></td>
                <td className="px-4 py-2"><input type="time" className="w-24 px-2 py-1.5 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" /></td>
                <td className="px-4 py-2"><input type="text" placeholder="Initials" className="w-16 px-2 py-1.5 border border-secondary-300 rounded text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-secondary-50 border-t border-secondary-200">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors">
          Supervisor Sign-Off (First-Off OK)
        </button>
      </div>
    </div>
  );
}
