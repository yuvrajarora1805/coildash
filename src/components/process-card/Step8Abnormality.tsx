import React from 'react';

export default function Step8Abnormality() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Abnormality Report</h2>
          <p className="text-sm text-secondary-500 mt-1">Log any issues, equipment failure, or safety incidents.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 8 of 11</span>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Type of Abnormality</label>
            <select className="w-full px-4 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none">
              <option value="">— Select Type —</option>
              <option value="equipment">Equipment Breakdown</option>
              <option value="quality">Quality Deviation</option>
              <option value="material">Material Issue</option>
              <option value="safety">Safety Incident</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Downtime (Minutes)</label>
            <input type="number" placeholder="0" className="w-full px-4 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Description & Action Taken</label>
          <textarea rows={4} placeholder="Describe the issue and what was done to fix it..." className="w-full px-4 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none"></textarea>
        </div>
      </div>
    </div>
  );
}
