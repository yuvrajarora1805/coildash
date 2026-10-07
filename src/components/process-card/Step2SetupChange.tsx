import React from 'react';

export default function Step2SetupChange({ processCard }: { processCard?: any }) {
  const setupDate = processCard?.setup_date ? new Date(processCard.setup_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  const setupTime = processCard?.setup_time || '';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Coiling Setup Parameters</h2>
          <p className="text-sm text-secondary-500 mt-1">Enter actual setup parameters and change details.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 2 of 12</span>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Change Part Name</label>
            <select defaultValue={processCard?.part_no || ""} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow">
              <option value="">— Select Part —</option>
              <option value="P-1024">P-1024 · Spring A</option>
              <option value="P-2055">P-2055 · Spring B</option>
              <option value="P-3090">P-3090 · Coil C</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Setup Change Date</label>
            <input type="date" defaultValue={setupDate} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Setup Change Time</label>
            <input type="time" defaultValue={setupTime} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm font-mono text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow" />
          </div>
        </div>

        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-5">
          <div className="text-xs font-bold text-secondary-600 uppercase tracking-wider mb-4">Actual Setup Parameters (entered by Operator)</div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Helix</label>
              <input type="number" step="0.1" defaultValue={processCard?.actual_helix || ''} placeholder="e.g. 2.4" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">LO (Free Len.)</label>
              <input type="number" step="0.1" defaultValue={processCard?.actual_lo || ''} placeholder="e.g. 45.0" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">OD / ID</label>
              <input type="number" step="0.1" defaultValue={processCard?.actual_od_id || ''} placeholder="e.g. 18.5" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">NC (Coils)</label>
              <input type="number" step="0.1" defaultValue={processCard?.actual_nc || ''} placeholder="e.g. 5.5" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Ends</label>
              <input type="number" step="0.1" defaultValue={processCard?.actual_ends || ''} placeholder="e.g. 2.0" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
          </div>
          
          <div className="mt-6 md:w-1/2">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block mb-1">Operator Name (Performing Setup)</label>
            <input type="text" defaultValue={processCard?.operator_name || ''} placeholder="Name of operator" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}
