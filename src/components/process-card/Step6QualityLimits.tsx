'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, PackageCheck, ShieldCheck, Clock, Check } from 'lucide-react';

export default function Step6QualityLimits({ processCard, user }: { processCard?: any, user?: any }) {
  const [pressVal, setPressVal] = useState<string>(processCard?.press_reading || '');
  const [tempVal, setTempVal] = useState<string>(processCard?.temp_reading || '');
  const [voltVal, setVoltVal] = useState<string>(processCard?.volt_reading || '');
  const [verifiedBy, setVerifiedBy] = useState<string>(processCard?.quality_verified_by || '');
  const [isVerifying, setIsVerifying] = useState(false);

  // Verified OK is active ONLY when approved by supervisor
  const isSupervisorVerified = Boolean(
    verifiedBy ||
    processCard?.quality_verified_by ||
    (processCard?.status === 'approved' && processCard?.supervisor_id)
  );

  const getPressStatus = () => {
    if (!pressVal) return { label: 'Pending Entry', color: 'bg-secondary-100 text-secondary-600 border-secondary-200' };
    const num = parseFloat(pressVal);
    if (isNaN(num) || num < 120 || num > 160) {
      return { label: 'Out of Spec', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    }
    if (isSupervisorVerified) {
      return { label: 'Verified OK', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
    return { label: 'In Spec (Pending Supervisor Approval)', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  };

  const getTempStatus = () => {
    if (!tempVal) return { label: 'Pending Entry', color: 'bg-secondary-100 text-secondary-600 border-secondary-200' };
    const num = parseFloat(tempVal);
    if (isNaN(num) || num >= 60) {
      return { label: 'Exceeds 60°C', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    }
    if (isSupervisorVerified) {
      return { label: 'Verified OK', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
    return { label: 'In Spec (Pending Supervisor Approval)', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  };

  const getVoltStatus = () => {
    if (!voltVal) return { label: 'Pending Entry', color: 'bg-secondary-100 text-secondary-600 border-secondary-200' };
    const num = parseFloat(voltVal);
    if (isNaN(num) || num < 380 || num > 440) {
      return { label: 'Out of Spec', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    }
    if (isSupervisorVerified) {
      return { label: 'Verified OK', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
    return { label: 'In Spec (Pending Supervisor Approval)', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  };

  const pressStatus = getPressStatus();
  const tempStatus = getTempStatus();
  const voltStatus = getVoltStatus();

  const handleSupervisorVerify = async () => {
    if (!processCard) return;
    setIsVerifying(true);
    try {
      const approverName = user?.name || 'Supervisor';
      const res = await fetch('/api/process-card/save-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card_no: processCard.card_no,
          type: 'quality_limits',
          data: {
            press_reading: pressVal,
            temp_reading: tempVal,
            volt_reading: voltVal,
            quality_verified_by: approverName
          }
        })
      });
      if (res.ok) {
        setVerifiedBy(approverName);
        if (processCard) {
          processCard.quality_verified_by = approverName;
        }
      } else {
        alert('Failed to sign off verification.');
      }
    } catch (e) {
      console.error(e);
      alert('Error verifying quality limits.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      {/* Header */}
      <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-secondary-900">Process Quality Parameters</h2>
          <p className="text-sm text-secondary-500 mt-1">Verify machine process limits against quality specifications for this product.</p>
        </div>
        <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 5 of 11</span>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Product & Material Information Context Card */}
        <div className="bg-gradient-to-r from-blue-50/60 to-indigo-50/40 border border-blue-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-blue-200/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <PackageCheck className="text-blue-700" size={18} />
              <h3 className="font-bold text-xs uppercase tracking-wider text-blue-900">Active Product & Material Details</h3>
            </div>
            <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-300">
              {processCard?.card_no || 'NEW-CARD'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-secondary-500 block">Part Number / Name</span>
              <span className="font-mono font-bold text-secondary-900 text-sm">
                {processCard?.part_no || 'P-1024'}
              </span>
              <span className="text-secondary-600 block text-[11px] truncate">
                {processCard?.part_name || 'Spring A'}
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-secondary-500 block">Coil Number</span>
              <span className="font-mono font-bold text-primary-700 text-sm">
                {processCard?.coil_no || '—'}
              </span>
              <span className="text-secondary-500 block text-[11px]">
                Customer: {processCard?.customer || 'ABC Automotive'}
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-secondary-500 block">Wire Grade & Dia.</span>
              <span className="font-mono font-bold text-secondary-900 text-sm">
                {processCard?.wire_grade || '—'} {processCard?.wire_dia ? `• Ø ${processCard.wire_dia} mm` : ''}
              </span>
              <span className="text-secondary-500 block text-[11px]">
                Coil Wt: {processCard?.coil_weight ? `${processCard.coil_weight} kg` : '—'}
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-blue-100 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-secondary-500 block">Heat No. / UTS</span>
              <span className="font-mono font-bold text-secondary-900 text-sm truncate block" title={processCard?.heat_no || ''}>
                {processCard?.heat_no || '—'}
              </span>
              <span className="text-secondary-600 block text-[11px] truncate" title={processCard?.uts_rm_no || ''}>
                {processCard?.uts_rm_no || '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Process Quality Parameters Guidance */}
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-amber-900 font-medium leading-relaxed">
            Standard shop-floor operating limits: Coiling Hydraulic Press must remain between <strong>120 ~ 160 kg</strong>, Oil Temp strictly <strong>below 60°C</strong>, and Supply Voltage between <strong>380 ~ 440 V</strong>.
          </p>
        </div>

        {/* Parameter Inputs Form */}
        <form id="quality-limits-form">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PRESS */}
            <div className="p-5 border border-secondary-200 rounded-xl bg-secondary-50/60 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-secondary-900 text-sm">PRESS (Hydraulic)</h3>
                  <p className="text-[11px] font-mono text-secondary-500 mt-0.5">Rule: 120 - 160 Kg</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border text-center ${pressStatus.color}`}>
                  {pressStatus.label}
                </span>
              </div>
              <input 
                name="press_reading"
                type="number"
                step="0.1"
                value={pressVal}
                onChange={(e) => setPressVal(e.target.value)}
                placeholder="Enter Actual Kg" 
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow bg-white font-bold" 
              />
            </div>

            {/* TEMP */}
            <div className="p-5 border border-secondary-200 rounded-xl bg-secondary-50/60 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-secondary-900 text-sm">TEMPERATURE</h3>
                  <p className="text-[11px] font-mono text-secondary-500 mt-0.5">Rule: Below 60°C</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border text-center ${tempStatus.color}`}>
                  {tempStatus.label}
                </span>
              </div>
              <input 
                name="temp_reading"
                type="number"
                step="0.1"
                value={tempVal}
                onChange={(e) => setTempVal(e.target.value)}
                placeholder="Enter Actual °C" 
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow bg-white font-bold" 
              />
            </div>

            {/* VOLT */}
            <div className="p-5 border border-secondary-200 rounded-xl bg-secondary-50/60 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-secondary-900 text-sm">LINE VOLTAGE</h3>
                  <p className="text-[11px] font-mono text-secondary-500 mt-0.5">Rule: 380 - 440 V</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border text-center ${voltStatus.color}`}>
                  {voltStatus.label}
                </span>
              </div>
              <input 
                name="volt_reading"
                type="number"
                step="0.1"
                value={voltVal}
                onChange={(e) => setVoltVal(e.target.value)}
                placeholder="Enter Actual Voltage" 
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-shadow bg-white font-bold" 
              />
            </div>
          </div>
        </form>

        {/* Verification Status Banner */}
        {isSupervisorVerified ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Quality Limits Verified by Supervisor</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Sign-off by <strong>{verifiedBy || processCard?.quality_verified_by || processCard?.approved_by_name || 'Supervisor'}</strong> • All process parameters verified OK.
                </p>
              </div>
            </div>
            <span className="bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-xs">
              Verified OK
            </span>
          </div>
        ) : (
          <div className="p-4 bg-secondary-50 border border-secondary-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                <Clock size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-secondary-800 uppercase tracking-wider">Awaiting Supervisor Verification</h4>
                <p className="text-xs text-secondary-600 mt-0.5">
                  Parameters entered by operator will only show official <strong>"Verified OK"</strong> status upon supervisor review and sign-off.
                </p>
              </div>
            </div>

            {/* Supervisor verification action */}
            {(user?.role === 'supervisor' || user?.role === 'section_head') && (
              <button
                type="button"
                onClick={handleSupervisorVerify}
                disabled={isVerifying || !pressVal || !tempVal || !voltVal}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <ShieldCheck size={16} />
                {isVerifying ? 'Verifying...' : `Verify OK as ${user?.name || 'Supervisor'}`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
