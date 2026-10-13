'use client';

import React, { useState } from 'react';

export default function Step5ProductionObs({ processCard }: { processCard?: any }) {
  const initialObs = processCard?.observations && processCard.observations.length > 0
    ? processCard.observations
    : [1, 2, 3, 4, 5].map(r => ({ row_no: r }));

  const [rows, setRows] = useState<any[]>(initialObs);

  const addRow = () => {
    setRows(prev => [...prev, { row_no: prev.length + 1 }]);
  };

  return (
    <form id="observations-form" onSubmit={(e) => e.preventDefault()} className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Observation (Start / Middle / End)</h2>
          <p className="text-sm text-secondary-500 mt-1">Log continuous production observations.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 4 of 11</span>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-secondary-100 border-b border-secondary-200">
              <th rowSpan={2} className="px-3 py-2 font-bold text-secondary-700 text-[10px] uppercase tracking-wider text-center border-r border-secondary-200 w-10">Row</th>
              <th colSpan={4} className="px-3 py-2 font-bold text-secondary-700 text-xs uppercase tracking-wider text-center border-r border-secondary-200 bg-blue-50">Start</th>
              <th colSpan={4} className="px-3 py-2 font-bold text-secondary-700 text-xs uppercase tracking-wider text-center border-r border-secondary-200 bg-amber-50">Middle</th>
              <th colSpan={4} className="px-3 py-2 font-bold text-secondary-700 text-xs uppercase tracking-wider text-center border-r border-secondary-200 bg-emerald-50">End</th>
              <th rowSpan={2} className="px-3 py-2 font-bold text-secondary-700 text-xs uppercase tracking-wider text-center">Qty</th>
            </tr>
            <tr className="bg-secondary-50 border-b border-secondary-200">
              {['Lo', 'OD', 'Nc', 'Ends', 'Lo', 'OD', 'Nc', 'Ends', 'Lo', 'OD', 'Nc', 'Ends'].map((col, i) => (
                <th key={i} className={`px-2 py-2 font-bold text-secondary-500 text-[10px] uppercase tracking-wider text-center ${i % 4 === 3 ? 'border-r border-secondary-200' : ''}`}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200">
            {rows.map((r, idx) => {
              const rowNum = idx + 1;
              return (
                <tr key={rowNum} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-2 py-2 text-center font-mono font-bold text-secondary-500 border-r border-secondary-200">{rowNum}</td>
                  {/* Start */}
                  <td className="px-1 py-1.5"><input type="text" name={`row_${rowNum}_start_lo`} defaultValue={r.start_lo || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  <td className="px-1 py-1.5"><input type="text" name={`row_${rowNum}_start_od`} defaultValue={r.start_od || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  <td className="px-1 py-1.5"><input type="text" name={`row_${rowNum}_start_nc`} defaultValue={r.start_nc || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  <td className="px-1 py-1.5 border-r border-secondary-200"><input type="text" name={`row_${rowNum}_start_ends`} defaultValue={r.start_ends || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  {/* Middle */}
                  <td className="px-1 py-1.5"><input type="text" name={`row_${rowNum}_mid_lo`} defaultValue={r.mid_lo || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  <td className="px-1 py-1.5"><input type="text" name={`row_${rowNum}_mid_od`} defaultValue={r.mid_od || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  <td className="px-1 py-1.5"><input type="text" name={`row_${rowNum}_mid_nc`} defaultValue={r.mid_nc || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  <td className="px-1 py-1.5 border-r border-secondary-200"><input type="text" name={`row_${rowNum}_mid_ends`} defaultValue={r.mid_ends || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  {/* End */}
                  <td className="px-1 py-1.5"><input type="text" name={`row_${rowNum}_end_lo`} defaultValue={r.end_lo || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  <td className="px-1 py-1.5"><input type="text" name={`row_${rowNum}_end_od`} defaultValue={r.end_od || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  <td className="px-1 py-1.5"><input type="text" name={`row_${rowNum}_end_nc`} defaultValue={r.end_nc || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  <td className="px-1 py-1.5 border-r border-secondary-200"><input type="text" name={`row_${rowNum}_end_ends`} defaultValue={r.end_ends || ''} className="w-12 px-1 py-1 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                  {/* Qty */}
                  <td className="px-2 py-1.5 text-center"><input type="number" name={`row_${rowNum}_qty`} defaultValue={r.qty ?? ''} className="w-16 px-1 py-1 border border-secondary-300 rounded font-mono text-xs font-bold text-center outline-none" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="p-4 flex gap-4 border-t border-secondary-200 bg-white">
            <button type="button" onClick={addRow} className="text-sm font-bold text-primary-600 px-3 py-1.5 border border-primary-200 rounded hover:bg-primary-50 active:bg-primary-100 transition-colors cursor-pointer">+ Add Row</button>
        </div>
      </div>
      
      <div className="p-6 bg-secondary-50 border-t border-secondary-200 flex flex-wrap gap-6 justify-between items-center">
        <div className="space-y-1 w-full md:w-auto">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block">Operator Signature</label>
            <input type="text" name="operator_sign" defaultValue={rows[0]?.operator_sign || ''} placeholder="Operator Name/Sign" className="w-full md:w-48 px-3 py-2 border border-secondary-300 rounded text-sm outline-none" />
        </div>
        <div className="space-y-1 w-full md:w-auto">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block">Supervisor Signature</label>
            <input type="text" name="supervisor_sign" defaultValue={rows[0]?.supervisor_sign || ''} placeholder="Supervisor Name/Sign" className="w-full md:w-48 px-3 py-2 border border-secondary-300 rounded text-sm outline-none" />
        </div>
        <div className="space-y-1 w-full md:w-auto">
            <label className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider block">Section Head Signature</label>
            <input type="text" name="section_head_sign" defaultValue={rows[0]?.section_head_sign || ''} placeholder="Section Head Name/Sign" className="w-full md:w-48 px-3 py-2 border border-secondary-300 rounded text-sm outline-none" />
        </div>
      </div>
    </form>
  );
}
