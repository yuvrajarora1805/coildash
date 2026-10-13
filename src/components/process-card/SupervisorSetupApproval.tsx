"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function SupervisorSetupApproval({ processCard, onApproved, onRejected }: { processCard: any, onApproved?: () => void, onRejected?: () => void }) {
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/process-card/approve-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_no: processCard.card_no, remarks })
      });
      if (response.ok) {
        if (onApproved) onApproved();
        else window.location.reload();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to approve setup');
      }
    } catch (err) {
      setError('An error occurred while approving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (remarks.trim().length < 5) {
      setError('Remarks (min 5 characters) are required for rejection.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/process-card/reject-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_no: processCard.card_no, remarks })
      });
      if (response.ok) {
        if (onRejected) onRejected();
        else window.location.reload();
      } else {
         const data = await response.json();
         setError(data.error || 'Failed to reject setup');
      }
    } catch (err) {
      setError('An error occurred while rejecting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-amber-400 bg-amber-50 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-amber-900">Supervisor Setup Verification Required</h2>
          <p className="text-sm text-amber-700 mt-1">Review the setup parameters entered by the operator before production can proceed.</p>
        </div>
        <AlertCircle className="text-amber-500" size={32} />
      </div>

      <div className="p-6">
        <div className="mb-6 bg-secondary-50 border border-secondary-200 rounded-lg p-5">
          <div className="text-xs font-bold text-secondary-600 uppercase tracking-wider mb-4">Operator's Setup Parameters</div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Helix</label>
              <div className="font-mono text-sm font-bold text-secondary-900">
                {processCard.spec_helix ? (
                  <span className="text-xs">Spec: {processCard.spec_helix} · Act: {processCard.actual_helix || 'N/A'}</span>
                ) : (
                  processCard.actual_helix || 'N/A'
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">LO (Free Len.)</label>
              <div className="font-mono text-sm font-bold text-secondary-900">{processCard.actual_lo || 'N/A'}</div>
            </div>
             <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">OD / ID</label>
               <div className="font-mono text-sm font-bold text-secondary-900">{processCard.actual_od_id || 'N/A'}</div>
            </div>
             <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">NC (Coils)</label>
              <div className="font-mono text-sm font-bold text-secondary-900">{processCard.actual_nc || 'N/A'}</div>
            </div>
             <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Ends</label>
              <div className="font-mono text-sm font-bold text-secondary-900">{processCard.actual_ends || 'N/A'}</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <div className="space-y-3 mb-6">
          <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider block">Verification Remarks</label>
          <textarea 
            rows={3} 
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Add comments on the setup verification (Required if rejecting)..." 
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow"
          />
        </div>

        <div className="flex gap-4 pt-4 border-t border-secondary-200">
           <button 
             onClick={handleReject}
             disabled={isSubmitting}
             className="flex-1 px-6 py-3 rounded-lg text-sm font-bold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
           >
             <XCircle size={18} /> Reject & Return to Operator
           </button>
           <button 
             onClick={handleApprove}
             disabled={isSubmitting}
             className="flex-1 px-6 py-3 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 border border-emerald-700 disabled:opacity-50 transition-colors flex justify-center items-center gap-2 shadow-sm"
           >
             <CheckCircle2 size={18} /> Approve Setup
           </button>
        </div>
      </div>
    </div>
  );
}
