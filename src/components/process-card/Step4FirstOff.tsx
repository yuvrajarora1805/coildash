'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Ruler, Clock, Sparkles } from 'lucide-react';

export default function Step4FirstOff({ processCard, user }: { processCard?: any, user?: any }) {
  const initialSamples = [1, 2, 3, 4, 5].map((num) => {
    const existing = (processCard?.first_off || []).find((s: any) => Number(s.sample_no) === num) || {};
    return {
      sample_no: num,
      fl: existing.fl || '',
      od_id: existing.od_id || '',
      nc: existing.nc || '',
      ends: existing.ends || '',
      helix: existing.helix || '',
      visual: existing.visual || 'OK',
      sample_time: existing.sample_time || '',
      sign: existing.sign || (user?.name || '')
    };
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      {/* Header */}
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">First-Off / Running Inspection</h2>
          <p className="text-sm text-secondary-500 mt-1">Log the first 5 consecutive samples produced to verify setup stability.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 6 of 11</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Approved Reference Target Parameters */}
        <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-secondary-700 uppercase tracking-wider">
            <Ruler size={16} className="text-primary-600" />
            Approved Target Specs:
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="bg-white px-2.5 py-1 rounded border border-secondary-200">
              <strong className="text-secondary-500 font-sans">F/L:</strong> {processCard?.actual_lo || '—'}
            </span>
            <span className="bg-white px-2.5 py-1 rounded border border-secondary-200">
              <strong className="text-secondary-500 font-sans">OD/ID:</strong> {processCard?.actual_od_id || '—'}
            </span>
            <span className="bg-white px-2.5 py-1 rounded border border-secondary-200">
              <strong className="text-secondary-500 font-sans">NC:</strong> {processCard?.actual_nc || '—'}
            </span>
            <span className="bg-white px-2.5 py-1 rounded border border-secondary-200">
              <strong className="text-secondary-500 font-sans">Ends:</strong> {processCard?.actual_ends || '—'}
            </span>
            <span className="bg-white px-2.5 py-1 rounded border border-secondary-200">
              <strong className="text-secondary-500 font-sans">Helix:</strong> {processCard?.actual_helix || '—'}
            </span>
          </div>
        </div>

        {/* 5 Samples Form */}
        <form id="first-off-form">
          <div className="overflow-x-auto border border-secondary-200 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-secondary-100/70 border-b border-secondary-200 text-secondary-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="px-3 py-2.5 text-center w-12 border-r border-secondary-200">S.No</th>
                  <th className="px-3 py-2.5 border-r border-secondary-200">F/L (Free Len)</th>
                  <th className="px-3 py-2.5 border-r border-secondary-200">OD / ID</th>
                  <th className="px-3 py-2.5 border-r border-secondary-200">NC (Coils)</th>
                  <th className="px-3 py-2.5 border-r border-secondary-200">Ends</th>
                  <th className="px-3 py-2.5 border-r border-secondary-200">Helix</th>
                  <th className="px-3 py-2.5 border-r border-secondary-200 w-24">Visual</th>
                  <th className="px-3 py-2.5 border-r border-secondary-200 w-28">Time</th>
                  <th className="px-3 py-2.5 w-24">Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200 font-mono">
                {initialSamples.map((sample) => (
                  <tr key={sample.sample_no} className="hover:bg-secondary-50/60 transition-colors">
                    <td className="px-3 py-2 text-center font-bold text-secondary-500 border-r border-secondary-200 bg-secondary-50/40">
                      #{sample.sample_no}
                    </td>
                    <td className="px-2 py-1.5 border-r border-secondary-200">
                      <input 
                        name={`sample_${sample.sample_no}_fl`}
                        defaultValue={sample.fl}
                        placeholder={processCard?.actual_lo ? String(processCard.actual_lo) : '0.0'}
                        type="text" 
                        className="w-full px-2 py-1 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white text-center font-bold" 
                      />
                    </td>
                    <td className="px-2 py-1.5 border-r border-secondary-200">
                      <input 
                        name={`sample_${sample.sample_no}_od_id`}
                        defaultValue={sample.od_id}
                        placeholder={processCard?.actual_od_id ? String(processCard.actual_od_id) : '0.0'}
                        type="text" 
                        className="w-full px-2 py-1 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white text-center font-bold" 
                      />
                    </td>
                    <td className="px-2 py-1.5 border-r border-secondary-200">
                      <input 
                        name={`sample_${sample.sample_no}_nc`}
                        defaultValue={sample.nc}
                        placeholder={processCard?.actual_nc ? String(processCard.actual_nc) : '0.0'}
                        type="text" 
                        className="w-full px-2 py-1 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white text-center font-bold" 
                      />
                    </td>
                    <td className="px-2 py-1.5 border-r border-secondary-200">
                      <input 
                        name={`sample_${sample.sample_no}_ends`}
                        defaultValue={sample.ends}
                        placeholder={processCard?.actual_ends ? String(processCard.actual_ends) : '0.0'}
                        type="text" 
                        className="w-full px-2 py-1 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white text-center font-bold" 
                      />
                    </td>
                    <td className="px-2 py-1.5 border-r border-secondary-200">
                      <input 
                        name={`sample_${sample.sample_no}_helix`}
                        defaultValue={sample.helix}
                        placeholder={processCard?.actual_helix ? String(processCard.actual_helix) : '0.0'}
                        type="text" 
                        className="w-full px-2 py-1 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white text-center font-bold" 
                      />
                    </td>
                    <td className="px-2 py-1.5 border-r border-secondary-200">
                      <select
                        name={`sample_${sample.sample_no}_visual`}
                        defaultValue={sample.visual}
                        className="w-full px-1.5 py-1 border border-secondary-300 rounded font-sans text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white font-bold"
                      >
                        <option value="OK">OK</option>
                        <option value="NOT_OK">NOT OK</option>
                      </select>
                    </td>
                    <td className="px-2 py-1.5 border-r border-secondary-200">
                      <input 
                        name={`sample_${sample.sample_no}_sample_time`}
                        defaultValue={sample.sample_time}
                        type="time" 
                        className="w-full px-1.5 py-1 border border-secondary-300 rounded font-mono text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white" 
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input 
                        name={`sample_${sample.sample_no}_sign`}
                        defaultValue={sample.sign}
                        placeholder="Sign" 
                        type="text" 
                        className="w-full px-2 py-1 border border-secondary-300 rounded font-sans text-xs focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white text-center" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-bold">
            <CheckCircle2 size={16} className="text-emerald-600" />
            First-Off inspection data saves automatically when clicking Next or Save Draft.
          </div>
          <span className="text-emerald-700 font-mono font-bold bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded text-[11px]">
            5 Samples Required
          </span>
        </div>
      </div>
    </div>
  );
}
