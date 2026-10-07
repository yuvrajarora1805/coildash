import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Step6QualityLimits() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Process Quality Parameters</h2>
          <p className="text-sm text-secondary-500 mt-1">Verify process limits against hardcoded rules.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 6 of 12</span>
      </div>
      
      <div className="p-6">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="text-blue-500 shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-800 font-medium">As per physical form: Press must be 120-160 kg, Temp below 60°C, and Volt 380-440V.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 border border-secondary-200 rounded-lg bg-secondary-50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-secondary-900">PRESS</h3>
                <p className="text-[10px] font-mono text-secondary-500 mt-0.5">120 - 160 Kg</p>
              </div>
              <span className="bg-secondary-200 text-secondary-600 px-2 py-1 rounded text-[10px] font-bold uppercase">Pending</span>
            </div>
            <input type="number" placeholder="Enter Actual Kg" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
          </div>

          <div className="p-5 border border-secondary-200 rounded-lg bg-secondary-50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-secondary-900">TEMP</h3>
                <p className="text-[10px] font-mono text-secondary-500 mt-0.5">Below 60°C</p>
              </div>
              <span className="bg-secondary-200 text-secondary-600 px-2 py-1 rounded text-[10px] font-bold uppercase">Pending</span>
            </div>
            <input type="number" placeholder="Enter Actual °C" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
          </div>

          <div className="p-5 border border-secondary-200 rounded-lg bg-secondary-50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-secondary-900">VOLT</h3>
                <p className="text-[10px] font-mono text-secondary-500 mt-0.5">380 - 440 V</p>
              </div>
              <span className="bg-secondary-200 text-secondary-600 px-2 py-1 rounded text-[10px] font-bold uppercase">Pending</span>
            </div>
            <input type="number" placeholder="Enter Actual Voltage" className="w-full px-3 py-2 border border-secondary-300 rounded text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}
