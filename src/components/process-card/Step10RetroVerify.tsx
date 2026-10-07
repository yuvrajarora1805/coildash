import React from 'react';

export default function Step10RetroVerify() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Retroactive Verification</h2>
          <p className="text-sm text-secondary-500 mt-1">Supervisor verification of parameters post-abnormality or setup change.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 10 of 11</span>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <p className="text-sm text-amber-800 font-medium">This section must be completed by a Supervisor after any logged abnormality.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Verified Time</label>
            <input type="time" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Parameters Check</label>
            <select className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none">
              <option value="pass">Pass - Within Spec</option>
              <option value="fail">Fail - Out of Bounds</option>
            </select>
          </div>
          <div className="col-span-2 space-y-1">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Supervisor Name</label>
            <input type="text" placeholder="Name" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Supervisor Remarks</label>
          <textarea rows={3} placeholder="Enter verification notes..." className="w-full px-4 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none"></textarea>
        </div>
      </div>
    </div>
  );
}
