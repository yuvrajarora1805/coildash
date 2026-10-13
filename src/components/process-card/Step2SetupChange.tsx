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
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 2 of 11</span>
      </div>
      
      <div className="p-6">
        <form id="setup-form">
        {processCard?.status === 'approved' && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start justify-between">
            <div className="flex gap-3">
              <div className="text-emerald-600 mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-emerald-900">Setup Parameters Approved by Supervisor</h3>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">RESULT: OK</span>
                </div>
                <p className="text-xs text-emerald-700 mt-1">
                  <strong>Approved By:</strong> {processCard.approved_by_name || 'Supervisor'} 
                  {processCard.approval_remarks ? <span> • <strong>Remarks:</strong> {processCard.approval_remarks}</span> : null}
                </p>
                <p className="text-[11px] text-emerald-600 mt-1">These approved parameters govern production. All measurements below are verified.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full whitespace-nowrap">
              Production Authorized
            </span>
          </div>
        )}

        {processCard?.status === 'pending_supervisor' && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start justify-between">
            <div className="flex gap-3">
              <div className="text-amber-600 mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-900">Submitted to Supervisor for Approval</h3>
                <p className="text-xs text-amber-700 mt-1">Your setup parameters below have been sent and are awaiting supervisor sign-off before production can start.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full whitespace-nowrap">
              Pending Approval
            </span>
          </div>
        )}

        {processCard?.status === 'draft' && processCard?.rejection_remarks && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex gap-3 items-start">
            <div className="text-rose-600 mt-0.5 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-800">Setup Rejected by Supervisor</h3>
              <p className="text-sm text-rose-700 mt-1"><strong>Remarks:</strong> {processCard.rejection_remarks}</p>
              <p className="text-xs text-rose-600 mt-2">Please correct the setup parameters below and resubmit for approval.</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Change Part Name</label>
            <select name="part_no" defaultValue={processCard?.part_no || ""} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow">
              <option value="">— Select Part —</option>
              <option value="P-1024">P-1024 · Spring A</option>
              <option value="P-2055">P-2055 · Spring B</option>
              <option value="P-3090">P-3090 · Coil C</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Setup Card Issue Date</label>
            <input name="setup_date" type="date" defaultValue={setupDate} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Setup Change Time</label>
            <input name="setup_time" type="time" defaultValue={setupTime} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm font-mono text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow" />
          </div>
        </div>

        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-5">
          <div className="text-xs font-bold text-secondary-600 uppercase tracking-wider mb-4">Setup Parameters</div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2 bg-white p-3 border border-secondary-200 rounded-lg shadow-sm">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block text-center border-b border-secondary-100 pb-2">Helix</label>
              <div className="flex gap-2">
                <input name="spec_helix" type="number" step="0.01" defaultValue={processCard?.spec_helix || ''} placeholder="Spec" className="w-1/2 px-2 py-1.5 border border-secondary-300 rounded text-xs font-mono text-center focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
                <input name="actual_helix" type="number" step="0.01" defaultValue={processCard?.actual_helix || ''} placeholder="Act" className="w-1/2 px-2 py-1.5 border border-primary-300 bg-primary-50 text-primary-900 rounded text-xs font-mono text-center font-bold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
              </div>
            </div>
            
            <div className="space-y-2 bg-white p-3 border border-secondary-200 rounded-lg shadow-sm">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block text-center border-b border-secondary-100 pb-2">LO (Free Len.)</label>
              <input name="actual_lo" type="number" step="0.01" defaultValue={processCard?.actual_lo || ''} placeholder="e.g. 45.0" className="w-full px-2 py-1.5 border border-primary-300 bg-primary-50 text-primary-900 rounded text-xs font-mono text-center font-bold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
            
            <div className="space-y-2 bg-white p-3 border border-secondary-200 rounded-lg shadow-sm">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block text-center border-b border-secondary-100 pb-2">OD / ID</label>
              <input name="actual_od_id" type="number" step="0.01" defaultValue={processCard?.actual_od_id || ''} placeholder="e.g. 18.5" className="w-full px-2 py-1.5 border border-primary-300 bg-primary-50 text-primary-900 rounded text-xs font-mono text-center font-bold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
            
            <div className="space-y-2 bg-white p-3 border border-secondary-200 rounded-lg shadow-sm">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block text-center border-b border-secondary-100 pb-2">NC (Coils)</label>
              <input name="actual_nc" type="number" step="0.01" defaultValue={processCard?.actual_nc || ''} placeholder="e.g. 5.5" className="w-full px-2 py-1.5 border border-primary-300 bg-primary-50 text-primary-900 rounded text-xs font-mono text-center font-bold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
            
            <div className="space-y-2 bg-white p-3 border border-secondary-200 rounded-lg shadow-sm">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block text-center border-b border-secondary-100 pb-2">Ends</label>
              <input name="actual_ends" type="number" step="0.01" defaultValue={processCard?.actual_ends || ''} placeholder="e.g. 2.0" className="w-full px-2 py-1.5 border border-primary-300 bg-primary-50 text-primary-900 rounded text-xs font-mono text-center font-bold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
          </div>
          
          <div className="mt-6 md:w-1/2">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block mb-1">Operator Name (Performing Setup)</label>
            <input name="operator_name" type="text" defaultValue={processCard?.operator_name || ''} placeholder="Name of operator" className="w-full px-4 py-2 border border-secondary-300 rounded-lg text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow bg-white shadow-sm" />
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
