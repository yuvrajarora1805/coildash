'use client';
import { useEffect, useState } from 'react';
import { Activity, AlertTriangle } from 'lucide-react';

type Machine = {
  machine_no: string;
  status: string;
  live_count: number;
  sensor_status: string;
};

export default function LiveMachineStatus() {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch('/api/sensor/status');
        if (res.ok) {
          const data = await res.json();
          setMachines(data.machines);
        }
      } catch (err) {
        console.error('Error fetching machines:', err);
      }
    };

    fetchMachines();
    const interval = setInterval(fetchMachines, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-secondary-200 shadow-sm overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-secondary-200 flex justify-between items-center bg-secondary-50">
        <h2 className="font-bold text-secondary-900 flex items-center gap-2">
          <Activity size={18} className="text-primary-600" />
          Live Machine Status
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {machines.map((m) => (
          <div key={m.machine_no} className="border border-secondary-200 rounded-lg p-4 relative">
            {m.sensor_status !== 'ok' && (
              <div className="absolute -top-3 -right-3 bg-rose-100 border border-rose-200 text-rose-700 p-1.5 rounded-full shadow-sm" title={`Sensor Error: ${m.sensor_status}`}>
                <AlertTriangle size={16} />
              </div>
            )}
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-secondary-900">{m.machine_no}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                m.status === 'running' ? 'bg-emerald-100 text-emerald-800' :
                m.status === 'breakdown' ? 'bg-rose-100 text-rose-800' : 'bg-secondary-100 text-secondary-800'
              }`}>
                {m.status}
              </span>
            </div>
            <div className="text-xs text-secondary-500 font-bold uppercase tracking-wider mb-1">Live Count</div>
            <div className="font-mono text-3xl font-bold text-primary-600">{m.live_count}</div>
            
            {m.sensor_status !== 'ok' && (
              <div className="mt-3 text-xs font-medium text-rose-600 flex items-center gap-1.5 bg-rose-50 p-2 rounded">
                <AlertTriangle size={14} />
                Sensor Fault: {m.sensor_status}
              </div>
            )}
          </div>
        ))}
        {machines.length === 0 && (
          <div className="col-span-3 text-center text-sm text-secondary-500 py-4">
            Loading live machine data...
          </div>
        )}
      </div>
    </div>
  );
}
