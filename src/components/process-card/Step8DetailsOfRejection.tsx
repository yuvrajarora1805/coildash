'use client';
import React, { useState } from 'react';

export default function Step8DetailsOfRejection() {
  const [rows, setRows] = useState([1, 2, 3]);

  const addRow = () => {
    setRows(prev => [...prev, prev.length + 1]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Details of Rejection</h2>
          <p className="text-sm text-secondary-500 mt-1">Log defect breakdown and calculate total rejection.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 8 of 12</span>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-secondary-50 border-b border-secondary-200">
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">CCHL Coil No.</th>
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Part No.</th>
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Job Setting</th>
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">ID/OD</th>
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">N/C</th>
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Wire Bend</th>
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Power Cut</th>
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider bg-rose-50 text-rose-700">Total Rej.</th>
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Wire Cut (FTI)</th>
              <th className="px-3 py-3 font-bold text-secondary-700 text-[10px] uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200">
            {rows.map(row => (
              <tr key={row} className="hover:bg-secondary-50 transition-colors">
                <td className="px-2 py-2"><input type="text" className="w-20 px-2 py-1.5 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                <td className="px-2 py-2"><input type="text" className="w-20 px-2 py-1.5 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                <td className="px-2 py-2"><input type="number" className="w-14 px-2 py-1.5 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                <td className="px-2 py-2"><input type="number" className="w-14 px-2 py-1.5 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                <td className="px-2 py-2"><input type="number" className="w-14 px-2 py-1.5 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                <td className="px-2 py-2"><input type="number" className="w-16 px-2 py-1.5 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                <td className="px-2 py-2"><input type="number" className="w-16 px-2 py-1.5 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                <td className="px-2 py-2 bg-rose-50 text-center font-bold text-rose-700 text-xs">0</td>
                <td className="px-2 py-2"><input type="number" className="w-16 px-2 py-1.5 border border-secondary-300 rounded font-mono text-[10px] outline-none" /></td>
                <td className="px-2 py-2"><input type="text" className="w-24 px-2 py-1.5 border border-secondary-300 rounded text-[10px] outline-none" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 flex gap-4 border-t border-secondary-200 bg-white">
            <button 
              onClick={addRow}
              className="text-sm font-bold text-primary-600 px-3 py-1.5 border border-primary-200 rounded hover:bg-primary-50 transition-colors"
            >
              + Add Rejection Row
            </button>
        </div>
      </div>
    </div>
  );
}
