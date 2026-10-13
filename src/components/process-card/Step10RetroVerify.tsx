'use client';

import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, AlertCircle, Clock } from 'lucide-react';

export default function Step10RetroVerify({ user }: { user?: any }) {
  const isSupervisorOrAbove = user?.role === 'supervisor' || user?.role === 'section_head';
  const [isVerified, setIsVerified] = useState(false);
  const [supervisorName, setSupervisorName] = useState(user?.role !== 'operator' ? user?.name || '' : '');
  const [verificationRemarks, setVerificationRemarks] = useState('');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      {/* Header */}
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Retroactive Verification</h2>
          <p className="text-sm text-secondary-500 mt-1">
            Operator records sample measurements & process parameters after abnormality; Supervisor conducts sign-off verification.
          </p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 10 of 11</span>
      </div>

      <div className="p-6 space-y-8">
        {/* Banner */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-blue-900 leading-relaxed">
            <span className="font-bold">IATF Shop-Floor Rule:</span> Samples and process parameters (Press, Temp, Voltage) are filled by the <span className="font-semibold underline">Operator</span> following any unplanned stoppage or tooling adjustment. Final verification is signed off by the <span className="font-semibold underline">Supervisor</span>.
          </div>
        </div>

        {/* RETROACTIVE VERIFICATION 1 */}
        <div className="border border-secondary-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="bg-secondary-50 px-4 py-3 border-b border-secondary-200 flex flex-wrap items-center justify-between gap-3">
            <div className="font-bold text-xs uppercase tracking-wider text-secondary-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Retroactive Verification · Event #1
            </div>

            {/* Process Quality Parameters (Press, Temp, Volt) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-secondary-200 text-xs">
                <span className="text-[10px] font-bold text-secondary-500 uppercase">Press (120~160 Kg):</span>
                <input type="text" placeholder="e.g. 140" className="w-16 px-1.5 py-0.5 border border-secondary-300 rounded text-xs font-mono text-center outline-none focus:border-primary-500" />
              </div>
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-secondary-200 text-xs">
                <span className="text-[10px] font-bold text-secondary-500 uppercase">Temp (&lt;60°C):</span>
                <input type="text" placeholder="e.g. 48°C" className="w-16 px-1.5 py-0.5 border border-secondary-300 rounded text-xs font-mono text-center outline-none focus:border-primary-500" />
              </div>
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-secondary-200 text-xs">
                <span className="text-[10px] font-bold text-secondary-500 uppercase">Volt (380~440):</span>
                <input type="text" placeholder="e.g. 415V" className="w-16 px-1.5 py-0.5 border border-secondary-300 rounded text-xs font-mono text-center outline-none focus:border-primary-500" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-secondary-100/60 border-b border-secondary-200">
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider text-center w-12 border-r border-secondary-200">S.No.</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">F/L</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">OD/ID</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">NC</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Ends</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Helix</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Visual</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Time</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200">
                {[1, 2].map((sno) => (
                  <tr key={sno} className="hover:bg-secondary-50 transition-colors">
                    <td className="px-3 py-2 text-center font-mono font-bold text-secondary-600 border-r border-secondary-200">{sno}</td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="F/L" className="w-16 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="OD/ID" className="w-16 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="NC" className="w-14 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="Ends" className="w-14 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="Helix" className="w-14 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="OK/Visual" className="w-18 px-2 py-1 border border-secondary-300 rounded text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="time" className="w-24 px-1.5 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="Initials" className="w-16 px-2 py-1 border border-secondary-300 rounded text-xs outline-none focus:border-primary-500" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RETROACTIVE VERIFICATION 2 */}
        <div className="border border-secondary-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="bg-secondary-50 px-4 py-3 border-b border-secondary-200 flex flex-wrap items-center justify-between gap-3">
            <div className="font-bold text-xs uppercase tracking-wider text-secondary-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Retroactive Verification · Event #2
            </div>

            {/* Process Quality Parameters (Press, Temp, Volt) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-secondary-200 text-xs">
                <span className="text-[10px] font-bold text-secondary-500 uppercase">Press (120~160 Kg):</span>
                <input type="text" placeholder="e.g. 140" className="w-16 px-1.5 py-0.5 border border-secondary-300 rounded text-xs font-mono text-center outline-none focus:border-primary-500" />
              </div>
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-secondary-200 text-xs">
                <span className="text-[10px] font-bold text-secondary-500 uppercase">Temp (&lt;60°C):</span>
                <input type="text" placeholder="e.g. 48°C" className="w-16 px-1.5 py-0.5 border border-secondary-300 rounded text-xs font-mono text-center outline-none focus:border-primary-500" />
              </div>
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-secondary-200 text-xs">
                <span className="text-[10px] font-bold text-secondary-500 uppercase">Volt (380~440):</span>
                <input type="text" placeholder="e.g. 415V" className="w-16 px-1.5 py-0.5 border border-secondary-300 rounded text-xs font-mono text-center outline-none focus:border-primary-500" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-secondary-100/60 border-b border-secondary-200">
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider text-center w-12 border-r border-secondary-200">S.No.</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">F/L</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">OD/ID</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">NC</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Ends</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Helix</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Visual</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Time</th>
                  <th className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200">
                {[1, 2].map((sno) => (
                  <tr key={sno} className="hover:bg-secondary-50 transition-colors">
                    <td className="px-3 py-2 text-center font-mono font-bold text-secondary-600 border-r border-secondary-200">{sno}</td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="F/L" className="w-16 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="OD/ID" className="w-16 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="NC" className="w-14 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="Ends" className="w-14 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="Helix" className="w-14 px-2 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="OK/Visual" className="w-18 px-2 py-1 border border-secondary-300 rounded text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="time" className="w-24 px-1.5 py-1 border border-secondary-300 rounded font-mono text-xs outline-none focus:border-primary-500" /></td>
                    <td className="px-2 py-1.5"><input type="text" placeholder="Initials" className="w-16 px-2 py-1 border border-secondary-300 rounded text-xs outline-none focus:border-primary-500" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SUPERVISOR VERIFICATION SIGN-OFF SECTION */}
        <div className="bg-secondary-50 border border-secondary-300 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-secondary-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary-600" size={20} />
              <h3 className="font-bold text-xs uppercase tracking-wider text-secondary-800">
                Supervisor Verification &amp; Sign-Off
              </h3>
            </div>
            {isVerified ? (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified by Supervisor
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                <Clock size={12} /> Awaiting Supervisor Sign-Off
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-600 uppercase tracking-wider">Supervisor Name</label>
              <input
                type="text"
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                readOnly={!isSupervisorOrAbove}
                placeholder="Supervisor Name"
                className={`w-full px-3 py-2 border border-secondary-300 rounded text-xs outline-none ${
                  !isSupervisorOrAbove ? 'bg-secondary-100 text-secondary-600 cursor-not-allowed' : 'bg-white focus:border-primary-500'
                }`}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-600 uppercase tracking-wider">Parameters Verification</label>
              <select
                disabled={!isSupervisorOrAbove}
                className={`w-full px-3 py-2 border border-secondary-300 rounded text-xs outline-none ${
                  !isSupervisorOrAbove ? 'bg-secondary-100 text-secondary-600 cursor-not-allowed' : 'bg-white focus:border-primary-500'
                }`}
              >
                <option value="verified_ok">Verified OK · All Samples in Tolerance</option>
                <option value="requires_rework">Reject / Requires Additional Sorting</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary-600 uppercase tracking-wider">Verification Time</label>
              <input
                type="time"
                readOnly={!isSupervisorOrAbove}
                defaultValue="14:15"
                className={`w-full px-3 py-2 border border-secondary-300 rounded font-mono text-xs outline-none ${
                  !isSupervisorOrAbove ? 'bg-secondary-100 text-secondary-600 cursor-not-allowed' : 'bg-white focus:border-primary-500'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1 mb-4">
            <label className="text-[10px] font-bold text-secondary-600 uppercase tracking-wider">Supervisor Notes / Remarks</label>
            <input
              type="text"
              value={verificationRemarks}
              onChange={(e) => setVerificationRemarks(e.target.value)}
              readOnly={!isSupervisorOrAbove}
              placeholder={isSupervisorOrAbove ? "Add supervisor verification remarks..." : "No remarks entered yet"}
              className={`w-full px-3 py-2 border border-secondary-300 rounded text-xs outline-none ${
                !isSupervisorOrAbove ? 'bg-secondary-100 text-secondary-600 cursor-not-allowed' : 'bg-white focus:border-primary-500'
              }`}
            />
          </div>

          {isSupervisorOrAbove && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsVerified(!isVerified)}
                className={`px-4 py-2 rounded text-xs font-bold text-white transition-colors flex items-center gap-1.5 ${
                  isVerified ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                <CheckCircle2 size={14} />
                {isVerified ? 'Verification Confirmed' : 'Sign-Off & Approve Retroactive Samples'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
