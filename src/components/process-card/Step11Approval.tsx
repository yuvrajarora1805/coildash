import React from 'react';

export default function Step11Approval() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Final Approval</h2>
          <p className="text-sm text-secondary-500 mt-1">Review all data and sign off to close the process card.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 11 of 11</span>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold text-emerald-800">Ready for Approval</h3>
            <p className="text-sm text-emerald-700 mt-1">All mandatory fields have been completed.</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-emerald-600 font-bold uppercase">Total Yield</div>
            <div className="text-2xl font-bold text-emerald-700">98.5%</div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-secondary-200">
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Digital Signature / PIN</label>
            <input type="password" placeholder="Enter your 4-digit PIN" className="w-full md:w-1/2 px-4 py-2 border border-secondary-300 rounded text-sm focus:border-primary-500 outline-none font-mono" />
          </div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="certify" className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500" />
            <label htmlFor="certify" className="text-sm text-secondary-700">
              I certify that I have reviewed the parameters and approve this batch.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
