"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Save, CheckCircle2, Settings, LogOut } from 'lucide-react';
import Step2SetupChange from '@/components/process-card/Step2SetupChange';
import Step3MaterialTrace from '@/components/process-card/Step3MaterialTrace';
import Step4FirstOff from '@/components/process-card/Step4FirstOff';
import Step5ProductionObs from '@/components/process-card/Step5ProductionObs';
import Step6QualityLimits from '@/components/process-card/Step6QualityLimits';
import Step7LastOff from '@/components/process-card/Step7LastOff';
import Step8Abnormality from '@/components/process-card/Step8Abnormality';
import Step8DetailsOfRejection from '@/components/process-card/Step8DetailsOfRejection';
import Step10RetroVerify from '@/components/process-card/Step10RetroVerify';
import Step11Approval from '@/components/process-card/Step11Approval';
import { logout } from '@/app/login/actions';

const STEPS = [
  "Basic Info", "Setup Change", "Material Trace", "First-Off", 
  "Production Obs.", "Quality Limits", "Last-Off", "Abnormality", 
  "Rejection", "Retro Verify", "Approval"
];

export default function Wizard({ user, processCard }: { user: any, processCard?: any }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Determine the maximum step index the user can access
  let maxStep = STEPS.length - 1;
  if (user?.role === 'operator') maxStep = 8;
  else if (user?.role === 'supervisor') maxStep = 9;
  else if (user?.role === 'section_head') maxStep = 10;

  const handleSubmit = async () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
      return;
    }

    if (!processCard) return; // For now, only handle existing cards

    setIsSubmitting(true);
    try {
      let newStatus = 'closed';
      if (user?.role === 'operator') {
        newStatus = 'pending_supervisor';
      } else if (user?.role === 'supervisor') {
        newStatus = 'pending_section_head';
      } else if (user?.role === 'section_head') {
        newStatus = 'approved';
      }
      
      const response = await fetch('/api/process-card/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_no: processCard.card_no, status: newStatus }),
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        alert('Failed to submit process card');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#eef2fb]">
      {/* Header */}
      <header className="h-14 bg-secondary-900 border-b border-secondary-800 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-secondary-400 hover:text-white transition-colors flex items-center text-sm font-medium gap-1">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <div className="h-5 w-px bg-secondary-700"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center font-display font-bold text-white text-[10px]">CC</div>
            <span className="font-display font-bold text-secondary-100 text-sm">Process Card Coiling</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded bg-secondary-800 border border-secondary-700 text-xs font-bold text-secondary-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span> DRAFT
          </div>
          <div className="font-mono text-sm font-bold text-primary-300">
            {processCard ? processCard.card_no : 'NEW-CARD'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Steps */}
        <aside className="w-64 bg-white border-r border-secondary-200 overflow-y-auto shrink-0 flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-secondary-200 bg-secondary-50">
              <div className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-1">Active Run</div>
              <div className="text-sm font-bold text-secondary-900">Machine S-02</div>
              <div className="text-xs text-secondary-600 mt-1">Part P-1024 • Shift A</div>
            </div>
            <nav className="p-3 space-y-1">
              {STEPS.map((step, idx) => {
                // Hide steps based on role
                if (user?.role === 'operator' && idx > 8) return null;
                if (user?.role === 'supervisor' && idx > 9) return null;
                
                const isActive = currentStep === idx;
                const isPast = currentStep > idx;
                return (
                  <button 
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded flex items-center gap-3 transition-colors ${
                      isActive 
                        ? 'bg-primary-50 border border-primary-100' 
                        : 'hover:bg-secondary-50 border border-transparent'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                      isActive ? 'bg-primary-600 text-white' : 
                      isPast ? 'bg-emerald-100 text-emerald-700' : 
                      'bg-secondary-100 text-secondary-500'
                    }`}>
                      {isPast ? <CheckCircle2 size={14} /> : idx + 1}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-primary-700 font-bold' : isPast ? 'text-secondary-700' : 'text-secondary-500'}`}>
                      {step}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-4 border-t border-secondary-200 bg-secondary-50">
            <div className="text-xs text-secondary-500 mb-1">Logged in as</div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-secondary-900">{user?.name}</div>
              <span className="text-[10px] font-bold bg-primary-100 text-primary-700 px-2 py-0.5 rounded uppercase tracking-wider border border-primary-200">{user?.role?.replace('_', ' ')}</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              
              {currentStep === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
                  <div className="border-b-2 border-primary-100 p-6 flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-xl font-bold text-secondary-900">Basic Information</h2>
                      <p className="text-sm text-secondary-500 mt-1">Select the machine and operator to initiate the process card.</p>
                    </div>
                    <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Step 1 of {maxStep + 1}</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Process Card No. (Auto)</label>
                        <input type="text" readOnly value={processCard ? processCard.card_no : "NEW-CARD"} className="w-full px-4 py-2 bg-secondary-50 border border-secondary-200 rounded font-mono font-bold text-primary-600 focus:outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Date</label>
                        <input type="date" readOnly={!!processCard} defaultValue={processCard && processCard.date ? new Date(processCard.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Shift</label>
                        <select className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow">
                          <option>Shift A (06:00 - 14:00)</option>
                          <option>Shift B (14:00 - 22:00)</option>
                          <option>Shift C (22:00 - 06:00)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Machine Number</label>
                        <select className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow">
                          <option>S-01</option>
                          <option>S-02</option>
                          <option>S-03</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep > 0 && currentStep <= 8 && (
                <div className={user?.role !== 'operator' ? "pointer-events-none opacity-90 relative" : ""}>
                  {user?.role !== 'operator' && (
                    <div className="absolute top-2 right-2 z-10 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider border border-amber-200 shadow-sm">
                      Read Only - Operator Data
                    </div>
                  )}
                  {currentStep === 1 && <Step2SetupChange processCard={processCard} />}
                  {currentStep === 2 && <Step3MaterialTrace />}
                  {currentStep === 3 && <Step4FirstOff />}
                  {currentStep === 4 && <Step5ProductionObs />}
                  {currentStep === 5 && <Step6QualityLimits />}
                  {currentStep === 6 && <Step7LastOff />}
                  {currentStep === 7 && <Step8Abnormality />}
                  {currentStep === 8 && <Step8DetailsOfRejection />}
                </div>
              )}
              {currentStep === 9 && <Step10RetroVerify />}
              {currentStep === 10 && <Step11Approval />}

            </div>
          </div>
          
          {/* Bottom Navigation Bar */}
          <div className="bg-white border-t border-secondary-200 p-4 px-6 flex items-center justify-between sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button 
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="px-5 py-2 rounded text-sm font-bold text-secondary-600 bg-white border border-secondary-300 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 rounded text-sm font-bold text-primary-600 bg-white border border-primary-200 hover:border-primary-600 transition-colors flex items-center gap-2">
                <Save size={16} /> Save Draft
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 rounded text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {currentStep === maxStep ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
