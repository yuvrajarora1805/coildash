'use client';

import React, { useState } from 'react';
import { AlertTriangle, Wrench, ShieldAlert, CheckCircle2, RefreshCw, Box } from 'lucide-react';

export default function Step8Abnormality() {
  const [stage, setStage] = useState<'first_off' | 'last_off'>('first_off');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      {/* Header */}
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Abnormality Report</h2>
          <p className="text-sm text-secondary-500 mt-1">
            Log stage-specific abnormalities, containment actions, and corrective steps.
          </p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 8 of 11</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Stage Selector Tabs */}
        <div>
          <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider block mb-2">
            Select Inspection Stage
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-lg">
            <button
              type="button"
              onClick={() => setStage('first_off')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-bold transition-all ${
                stage === 'first_off'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-secondary-50 text-secondary-700 border-secondary-200 hover:bg-secondary-100'
              }`}
            >
              <Wrench size={16} />
              First-Off Abnormality
            </button>
            <button
              type="button"
              onClick={() => setStage('last_off')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-bold transition-all ${
                stage === 'last_off'
                  ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                  : 'bg-secondary-50 text-secondary-700 border-secondary-200 hover:bg-secondary-100'
              }`}
            >
              <ShieldAlert size={16} />
              Last-Off Abnormality
            </button>
          </div>
        </div>

        {/* Dynamic Section: First-Off Specific Fields */}
        {stage === 'first_off' ? (
          <div className="space-y-6 bg-amber-50/50 border border-amber-200 p-5 rounded-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-amber-200 text-amber-900">
              <Wrench size={18} className="text-amber-600" />
              <h3 className="font-bold text-sm uppercase tracking-wider">First-Off Setup & Initial Trial Abnormality</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Initial Setup Defect Type</label>
                <select className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm focus:border-amber-500 outline-none">
                  <option value="">— Select Setup Defect —</option>
                  <option value="pitch_drift">Pitch / Free Length (LO) Out of Tolerance</option>
                  <option value="cam_misalignment">Tooling / Cam Misalignment</option>
                  <option value="tension_deviation">Straightener / Feed Tension Deviation</option>
                  <option value="od_id_drift">Outer / Inner Diameter (OD/ID) Deviation</option>
                  <option value="end_squareness">End Coil Squareness / Gap Error</option>
                  <option value="wire_bend">Wire Snag / Bend in Feed Guide</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Trial Coils Scrapped</label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm font-mono focus:border-amber-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Downtime (Minutes)</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm font-mono focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Tooling Adjustments Performed</label>
                <input
                  type="text"
                  placeholder="e.g. Adjusted pitch finger +0.15mm, re-clamped arbor guide"
                  className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm focus:border-amber-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Corrected Parameter Reading</label>
                <input
                  type="text"
                  placeholder="e.g. LO adjusted from 46.2mm to 45.0mm (In Spec)"
                  className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-amber-100/70 border border-amber-300 rounded-lg flex items-start gap-3">
              <RefreshCw className="text-amber-700 shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-amber-900">
                <span className="font-bold">Supervisor Setup Re-Approval Required:</span> Any tooling modification during First-Off requires the supervisor to re-verify the first 5 good samples before regular production runs.
              </div>
            </div>
          </div>
        ) : (
          /* Dynamic Section: Last-Off Specific Fields */
          <div className="space-y-6 bg-rose-50/50 border border-rose-200 p-5 rounded-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-rose-200 text-rose-900">
              <ShieldAlert size={18} className="text-rose-600" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Last-Off End-of-Run & Containment Abnormality</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">End-of-Run Defect Type</label>
                <select className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm focus:border-rose-500 outline-none">
                  <option value="">— Select Defect Type —</option>
                  <option value="tool_wear">Tool Wear / Arbor Groove Degradation</option>
                  <option value="cutter_chipped">Cutter Blade Chipped / Burrs on Cut End</option>
                  <option value="cumulative_drift">Cumulative Thermal / Dimension Drift</option>
                  <option value="wire_damage">Wire Surface Scratches / Coating Damage</option>
                  <option value="press_drop">Hydraulic / Coiling Press Pressure Drop</option>
                  <option value="counter_mismatch">Sensor Count vs Physical Count Mismatch</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Suspect Lot Qty (Containment)</label>
                <input
                  type="number"
                  placeholder="e.g. 50 pcs"
                  className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm font-mono focus:border-rose-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Downtime (Minutes)</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm font-mono focus:border-rose-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Quarantine Bin / Red Tag No.</label>
                <input
                  type="text"
                  placeholder="e.g. Q-BIN-04 / TAG-8821"
                  className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm font-mono focus:border-rose-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Time Window of Suspect Production</label>
                <input
                  type="text"
                  placeholder="e.g. Last 45 mins (13:15 - 14:00)"
                  className="w-full px-3 py-2 bg-white border border-secondary-300 rounded text-sm focus:border-rose-500 outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-rose-100/70 border border-rose-300 rounded-lg flex items-start gap-3">
              <Box className="text-rose-700 shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-rose-900">
                <span className="font-bold">Retroactive Verification Trigger:</span> A Last-Off abnormality immediately triggers mandatory retroactive sorting of the preceding batch in Step 10 before final sign-off.
              </div>
            </div>
          </div>
        )}

        {/* Sample Verification Measurement Table (matching physical card Page 2) */}
        <div className="border border-secondary-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-secondary-50 px-4 py-2.5 border-b border-secondary-200 flex items-center justify-between">
            <span className="text-xs font-bold text-secondary-800 uppercase tracking-wider">
              Post-Abnormality Verification Samples (2 Samples Check)
            </span>
            <span className="text-[10px] text-secondary-500 font-medium">As specified in physical card</span>
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
                {[1, 2].map(sno => (
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

        {/* Standard Factory Abnormal Situation Categories (from physical card footer) */}
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
          <div className="text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-2">
            Standard Abnormal Situation Checklist (Shop-Floor Guideline)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-secondary-600">
            <label className="flex items-center gap-2 p-1.5 bg-white border border-secondary-200 rounded cursor-pointer hover:bg-secondary-50">
              <input type="checkbox" className="rounded text-primary-600 focus:ring-0" />
              <span>Tool / Jig / Fixture Breakage</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 bg-white border border-secondary-200 rounded cursor-pointer hover:bg-secondary-50">
              <input type="checkbox" className="rounded text-primary-600 focus:ring-0" />
              <span>Power Failure</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 bg-white border border-secondary-200 rounded cursor-pointer hover:bg-secondary-50">
              <input type="checkbox" className="rounded text-primary-600 focus:ring-0" />
              <span>Sudden Operator Sickness / Emergency</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 bg-white border border-secondary-200 rounded cursor-pointer hover:bg-secondary-50">
              <input type="checkbox" className="rounded text-primary-600 focus:ring-0" />
              <span>Machine Breakdown</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 bg-white border border-secondary-200 rounded cursor-pointer hover:bg-secondary-50">
              <input type="checkbox" className="rounded text-primary-600 focus:ring-0" />
              <span>Work Environment Sudden Change</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 bg-white border border-secondary-200 rounded cursor-pointer hover:bg-secondary-50">
              <input type="checkbox" className="rounded text-primary-600 focus:ring-0" />
              <span>Abnormal Climate / Nature</span>
            </label>
          </div>
        </div>

        {/* Signatures / Logging */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Reported By (Operator)</label>
            <input
              type="text"
              placeholder="Operator Name"
              className="w-full px-3 py-2 border border-secondary-300 rounded text-sm outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Severity Level</label>
            <select className="w-full px-3 py-2 border border-secondary-300 rounded text-sm outline-none">
              <option value="minor">Minor (Quick adjustment, &lt; 5 pcs scrap)</option>
              <option value="moderate">Moderate (Tooling tweak, 5-25 pcs scrap)</option>
              <option value="critical">Critical (Tool damage, &gt; 25 pcs scrap / stoppage)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
