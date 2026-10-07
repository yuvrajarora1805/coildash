import React from 'react';

export default function Step7LastOff() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Last-Off Inspection</h2>
          <p className="text-sm text-secondary-500 mt-1">Record the final inspection parameters at the end of the run.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 7 of 11</span>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Time</label>
            <input type="time" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Qty Checked</label>
            <input type="number" placeholder="0" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Free Length (LO)</label>
            <input type="number" step="0.1" placeholder="45.0" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">OD / ID</label>
            <input type="number" step="0.1" placeholder="18.5" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Remarks / Visual Check</label>
          <textarea rows={3} placeholder="Enter any visual observations..." className="w-full px-4 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none"></textarea>
        </div>
      </div>
    </div>
  );
}
