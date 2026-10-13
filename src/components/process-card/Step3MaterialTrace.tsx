import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function Step3MaterialTrace({ processCard }: { processCard?: any }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Material & Part Traceability</h2>
          <p className="text-sm text-secondary-500 mt-1">Record material details for traceability.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 3 of 11</span>
      </div>
      
      <div className="p-6">
        <form id="material-trace-form">
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <Lightbulb className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-amber-800 font-medium">Select Customer & Part No. first — Wire Grade and Dia. will auto-fill from master data once connected to the backend.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Coil No.</label>
              <input name="coil_no" defaultValue={processCard?.coil_no || ''} type="text" placeholder="e.g. C-2026-1052" className="w-full px-4 py-2 border border-secondary-300 rounded font-mono text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Customer</label>
              <select name="customer" defaultValue={processCard?.customer || ''} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow">
                <option value="">— Select Customer —</option>
                <option value="CA">ABC Automotive Ltd.</option>
                <option value="CB">XYZ Springs Pvt. Ltd.</option>
                <option value="CC">Delta Engineering</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Part No.</label>
              <select name="part_no" defaultValue={processCard?.part_no || 'P-1024'} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow">
                <option value="">— Select Part No. —</option>
                <option value="P-1024">P-1024</option>
                <option value="P-2055">P-2055</option>
                <option value="P-3090">P-3090</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Wire Grade</label>
              <input name="wire_grade" defaultValue={processCard?.wire_grade || ''} type="text" placeholder="e.g. SH / SL / SW" className="w-full px-4 py-2 border border-secondary-300 rounded font-mono text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Wire Dia. (mm)</label>
              <input name="wire_dia" defaultValue={processCard?.wire_dia || ''} type="number" step="0.01" placeholder="e.g. 3.50" className="w-full px-4 py-2 border border-secondary-300 rounded font-mono text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Heat No.</label>
              <input name="heat_no" defaultValue={processCard?.heat_no || ''} type="text" placeholder="e.g. HT-2026-0441" className="w-full px-4 py-2 border border-secondary-300 rounded font-mono text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">UTS / Ra%</label>
              <input name="uts_rm_no" defaultValue={processCard?.uts_rm_no || ''} type="text" placeholder="e.g. 1850 MPa / Ra 0.8%" className="w-full px-4 py-2 border border-secondary-300 rounded font-mono text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Coil Weight (kg)</label>
              <input name="coil_weight" defaultValue={processCard?.coil_weight || ''} type="number" step="0.1" placeholder="e.g. 120.5" className="w-full px-4 py-2 border border-secondary-300 rounded font-mono text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
