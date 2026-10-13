"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Save, CheckCircle2, Settings, LogOut, Printer } from 'lucide-react';
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
import SupervisorSetupApproval from '@/components/process-card/SupervisorSetupApproval';
import { logout } from '@/app/login/actions';

const STEPS = [
  "Basic Info", "Setup Change", "Material Trace", 
  "Production Obs.", "Quality Limits", "First-Off", 
  "Last-Off", "Abnormality", "Rejection", "Retro Verify", "Approval"
];

export default function Wizard({ user, processCard: initialProcessCard }: { user: any, processCard?: any }) {
  const [cardData, setCardData] = useState<any>(initialProcessCard || null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Keep cardData in sync if prop changes
  useEffect(() => {
    if (initialProcessCard) {
      setCardData(initialProcessCard);
    }
  }, [initialProcessCard]);

  // Determine the maximum step index the user can access
  let maxStep = STEPS.length - 1;
  if (user?.role === 'operator') maxStep = 9;
  else if (user?.role === 'supervisor') maxStep = 9;
  else if (user?.role === 'section_head') maxStep = 10;

  // Set initial step based on status if supervisor opens it
  useEffect(() => {
    if (cardData?.status === 'pending_supervisor' && user?.role !== 'operator' && currentStep === 0) {
      setCurrentStep(1);
    }
  }, [cardData?.status, user, currentStep]);

  // Scrape and persist current step draft
  const saveCurrentStepDraft = async (stepToSave = currentStep): Promise<boolean> => {
    if (!cardData?.card_no) return true;

    try {
      if (stepToSave === 1) {
        // Step 2: Setup Change
        const form = document.getElementById('setup-form') as HTMLFormElement;
        if (!form) return true;
        const formData = new FormData(form);
        const data: any = Object.fromEntries(formData.entries());
        data.card_no = cardData.card_no;

        const res = await fetch('/api/process-card/save-setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setCardData((prev: any) => ({ ...prev, ...data }));
          return true;
        }
      } else if (stepToSave === 2) {
        // Step 3: Material Traceability
        const form = document.getElementById('material-trace-form') as HTMLFormElement;
        if (!form) return true;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch('/api/process-card/save-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ card_no: cardData.card_no, type: 'material_trace', data })
        });
        if (res.ok) {
          setCardData((prev: any) => ({ ...prev, ...data }));
          return true;
        }
      } else if (stepToSave === 3) {
        // Step 4: Observations (Start/Middle/End)
        const form = document.getElementById('observations-form') as HTMLFormElement;
        if (!form) return true;
        const formData = new FormData(form);
        const obsRows: any[] = [];
        let r = 1;
        while (formData.has(`row_${r}_start_lo`)) {
          obsRows.push({
            row_no: r,
            start_lo: formData.get(`row_${r}_start_lo`) || '',
            start_od: formData.get(`row_${r}_start_od`) || '',
            start_nc: formData.get(`row_${r}_start_nc`) || '',
            start_ends: formData.get(`row_${r}_start_ends`) || '',
            mid_lo: formData.get(`row_${r}_mid_lo`) || '',
            mid_od: formData.get(`row_${r}_mid_od`) || '',
            mid_nc: formData.get(`row_${r}_mid_nc`) || '',
            mid_ends: formData.get(`row_${r}_mid_ends`) || '',
            end_lo: formData.get(`row_${r}_end_lo`) || '',
            end_od: formData.get(`row_${r}_end_od`) || '',
            end_nc: formData.get(`row_${r}_end_nc`) || '',
            end_ends: formData.get(`row_${r}_end_ends`) || '',
            qty: formData.get(`row_${r}_qty`) || 0,
            operator_sign: formData.get('operator_sign') || '',
            supervisor_sign: formData.get('supervisor_sign') || '',
            section_head_sign: formData.get('section_head_sign') || '',
          });
          r++;
        }

        const res = await fetch('/api/process-card/save-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ card_no: cardData.card_no, type: 'observations', data: obsRows })
        });
        if (res.ok) {
          setCardData((prev: any) => ({ ...prev, observations: obsRows }));
          return true;
        }
      } else if (stepToSave === 4) {
        // Step 5: Process Quality Limits
        const form = document.getElementById('quality-limits-form') as HTMLFormElement;
        if (!form) return true;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch('/api/process-card/save-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ card_no: cardData.card_no, type: 'quality_limits', data })
        });
        if (res.ok) {
          setCardData((prev: any) => ({ ...prev, ...data }));
          return true;
        }
      } else if (stepToSave === 5 || stepToSave === 6) {
        // Step 6: First-Off or Step 7: Last-Off
        const type = stepToSave === 5 ? 'first_off' : 'last_off';
        const formId = type === 'first_off' ? 'first-off-form' : 'last-off-form';
        const form = document.getElementById(formId) as HTMLFormElement;
        if (!form) return true;
        const formData = new FormData(form);
        const samples = [1, 2, 3, 4, 5].map((num) => ({
          sample_no: num,
          fl: formData.get(`sample_${num}_fl`) || '',
          od_id: formData.get(`sample_${num}_od_id`) || '',
          nc: formData.get(`sample_${num}_nc`) || '',
          ends: formData.get(`sample_${num}_ends`) || '',
          helix: formData.get(`sample_${num}_helix`) || '',
          visual: formData.get(`sample_${num}_visual`) || 'OK',
          sample_time: formData.get(`sample_${num}_sample_time`) || '',
          sign: formData.get(`sample_${num}_sign`) || ''
        }));

        const res = await fetch('/api/process-card/save-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ card_no: cardData.card_no, type, data: samples })
        });
        if (res.ok) {
          setCardData((prev: any) => ({ ...prev, [type]: samples }));
          return true;
        }
      } else if (stepToSave === 8) {
        // Step 9: Rejections
        const form = document.getElementById('rejections-form') as HTMLFormElement;
        if (!form) return true;
        const formData = new FormData(form);
        const rejRows: any[] = [];
        let r = 1;
        while (formData.has(`rej_${r}_cchl_coil_no`) || formData.has(`rej_${r}_part_no`)) {
          const job_setting = Number(formData.get(`rej_${r}_job_setting`)) || 0;
          const id_od = Number(formData.get(`rej_${r}_id_od`)) || 0;
          const nc = Number(formData.get(`rej_${r}_nc`)) || 0;
          const wire_bend = Number(formData.get(`rej_${r}_wire_bend`)) || 0;
          const power_cut = Number(formData.get(`rej_${r}_power_cut`)) || 0;
          const total_rej = job_setting + id_od + nc + wire_bend + power_cut;
          rejRows.push({
            cchl_coil_no: formData.get(`rej_${r}_cchl_coil_no`) || '',
            part_no: formData.get(`rej_${r}_part_no`) || '',
            job_setting,
            id_od,
            nc,
            wire_bend,
            power_cut,
            total_rej,
            wire_cut_fit: Number(formData.get(`rej_${r}_wire_cut_fit`)) || 0,
            remarks: formData.get(`rej_${r}_remarks`) || '',
          });
          r++;
        }

        const res = await fetch('/api/process-card/save-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ card_no: cardData.card_no, type: 'rejections', data: rejRows })
        });
        if (res.ok) {
          setCardData((prev: any) => ({ ...prev, rejections: rejRows }));
          return true;
        }
      }
    } catch (err) {
      console.error('Error auto-saving step:', err);
    }
    return true;
  };

  // Safe navigation function that guarantees draft saving before unmounting
  const goToStep = async (targetStep: number) => {
    if (targetStep === currentStep) return;
    if (cardData) {
      setIsSubmitting(true);
      await saveCurrentStepDraft(currentStep);
      setIsSubmitting(false);
    }
    setCurrentStep(targetStep);
  };

  const handleSaveDraft = async () => {
    if (!cardData && currentStep === 1) {
      // Create new draft card if not yet created
      const form = document.getElementById('setup-form') as HTMLFormElement;
      if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        setIsSubmitting(true);
        try {
          const res = await fetch('/api/process-card/create-setup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          if (res.ok) {
            const resData = await res.json();
            if (resData.card_no) {
              await fetch('/api/process-card/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ card_no: resData.card_no, status: 'draft' }),
              });
              window.location.href = `/process-card/${resData.card_no}`;
              return;
            }
          }
        } catch (e) {
          console.error(e);
        }
        setIsSubmitting(false);
      }
      return;
    }

    if (!cardData) {
      alert('Please initialize the process card first.');
      return;
    }

    setIsSubmitting(true);
    const ok = await saveCurrentStepDraft(currentStep);
    setIsSubmitting(false);
    if (ok) {
      alert('Draft saved successfully!');
    } else {
      alert('Failed to save draft.');
    }
  };

  const handleSubmit = async () => {
    // If operator is on Step 2 (Setup Change) and it's a new card or draft
    if (currentStep === 1 && user?.role === 'operator' && (!cardData || cardData?.status === 'draft')) {
      const form = document.getElementById('setup-form') as HTMLFormElement;
      if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        setIsSubmitting(true);
        try {
          if (!cardData) {
            // Create new card directly submitted for approval
            const res = await fetch('/api/process-card/create-setup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            if (res.ok) {
              const resData = await res.json();
              if (resData.card_no) {
                window.location.href = `/process-card/${resData.card_no}`;
              } else {
                window.location.href = '/';
              }
              return;
            } else {
              alert('Failed to create process card');
              setIsSubmitting(false);
              return;
            }
          } else {
            // Update existing setup parameters
            data.card_no = cardData.card_no;
            const res = await fetch('/api/process-card/save-setup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            if (!res.ok) {
              alert('Failed to save setup parameters');
              setIsSubmitting(false);
              return;
            }
          }
        } catch (e) {
          console.error(e);
          alert('Error saving setup');
          setIsSubmitting(false);
          return;
        }
      }
      
      if (cardData) {
        submitStatusUpdate('pending_supervisor');
      }
      return;
    }

    // New card creation on Step 0
    if (currentStep === 0 && !cardData) {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/process-card/create', { method: 'POST' });
        if (res.ok) {
          const resData = await res.json();
          if (resData.card_no) {
            window.location.href = `/process-card/${resData.card_no}`;
            return;
          }
        }
        alert('Failed to generate new card');
      } catch (e) {
        console.error(e);
        alert('Error generating new card');
      }
      setIsSubmitting(false);
      return;
    }

    // Auto-save active step before advancing to the next step
    if (cardData) {
      setIsSubmitting(true);
      await saveCurrentStepDraft(currentStep);
      setIsSubmitting(false);
    }

    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
      return;
    }

    if (!cardData) return;

    let newStatus = 'closed';
    if (user?.role === 'operator') {
      newStatus = 'pending_supervisor';
    } else if (user?.role === 'supervisor') {
      newStatus = 'pending_section_head';
    } else if (user?.role === 'section_head') {
      newStatus = 'approved';
    }
    
    submitStatusUpdate(newStatus);
  };

  const submitStatusUpdate = async (newStatus: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/process-card/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_no: cardData?.card_no, status: newStatus }),
      });

      if (response.ok) {
        if (currentStep === 1) {
          window.location.reload();
        } else {
          window.location.href = '/';
        }
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
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-secondary-400 bg-secondary-800/80 px-2.5 py-1 rounded border border-secondary-700">
            <span>FORMAT: <strong className="text-secondary-200">F/PRD/22</strong></span>
            <span>•</span>
            <span>REV: <strong className="text-secondary-200">03 (04-12-2024)</strong></span>
          </div>
          {cardData && (
            <Link
              href={`/process-card/${cardData.card_no}/print`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-secondary-800 hover:bg-secondary-700 border border-secondary-600 text-xs font-bold text-white transition-colors"
            >
              <Printer size={13} /> Print Card
            </Link>
          )}
          <div className="px-3 py-1 rounded bg-secondary-800 border border-secondary-700 text-xs font-bold text-secondary-300 uppercase tracking-wider flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${cardData?.status === 'approved' ? 'bg-emerald-500' : cardData?.status === 'pending_supervisor' ? 'bg-amber-500' : 'bg-primary-500'}`}></span>
            {cardData?.status ? cardData.status.toUpperCase().replace('_', ' ') : 'DRAFT'}
          </div>
          <div className="font-mono text-sm font-bold text-primary-300">
            {cardData ? cardData.card_no : 'NEW-CARD'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Steps */}
        <aside className="w-64 bg-white border-r border-secondary-200 overflow-y-auto shrink-0 flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-secondary-200 bg-secondary-50">
              <div className="text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-1">Active Run</div>
              <div className="text-sm font-bold text-secondary-900">{cardData?.machine_no ? `Machine ${cardData.machine_no}` : 'Machine S-02'}</div>
              <div className="text-xs text-secondary-600 mt-1">{cardData?.part_no ? `Part ${cardData.part_no}` : 'Part P-1024'} • {cardData?.shift || 'Shift A'}</div>
            </div>
            <nav className="p-3 space-y-1">
              {STEPS.map((step, idx) => {
                // Hide steps based on role
                if (user?.role === 'operator' && idx > 9) return null;
                if (user?.role === 'supervisor' && idx > 9) return null;
                
                const isActive = currentStep === idx;
                const isPast = currentStep > idx;
                
                return (
                  <button 
                    key={idx}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => goToStep(idx)}
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
                        <input type="text" readOnly value={cardData ? cardData.card_no : "NEW-CARD"} className="w-full px-4 py-2 bg-secondary-50 border border-secondary-200 rounded font-mono font-bold text-primary-600 focus:outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-secondary-700 uppercase tracking-wider">Date</label>
                        <input type="date" suppressHydrationWarning readOnly={!!cardData} defaultValue={cardData && cardData.date ? new Date(cardData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border border-secondary-300 rounded text-sm text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow" />
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

              {currentStep === 1 && (
                user?.role !== 'operator' && cardData?.status === 'pending_supervisor' ? (
                  <div className="pointer-events-auto opacity-100"><SupervisorSetupApproval processCard={cardData} /></div>
                ) : (
                  <div className={cardData?.status !== 'draft' ? "pointer-events-none relative" : ""}>
                    <Step2SetupChange processCard={cardData} />
                  </div>
                )
              )}

              {currentStep === 2 && <Step3MaterialTrace processCard={cardData} />}
              {currentStep === 3 && <Step5ProductionObs processCard={cardData} />}
              {currentStep === 4 && <Step6QualityLimits processCard={cardData} user={user} />}
              {currentStep === 5 && <Step4FirstOff processCard={cardData} user={user} />}
              {currentStep === 6 && <Step7LastOff processCard={cardData} user={user} />}
              {currentStep === 7 && <Step8Abnormality />}
              {currentStep === 8 && <Step8DetailsOfRejection processCard={cardData} />}
              {currentStep === 9 && <Step10RetroVerify user={user} />}
              {currentStep === 10 && <Step11Approval />}

            </div>
          </div>
          
          {/* Bottom Navigation Bar */}
          <div className="bg-white border-t border-secondary-200 p-4 px-6 flex items-center justify-between sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button 
              disabled={currentStep === 0 || isSubmitting}
              suppressHydrationWarning
              onClick={() => goToStep(Math.max(0, currentStep - 1))}
              className="px-5 py-2 rounded text-sm font-bold text-secondary-600 bg-white border border-secondary-300 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className="px-5 py-2 rounded text-sm font-bold text-primary-600 bg-white border border-primary-200 hover:border-primary-600 transition-colors flex items-center gap-2">
                <Save size={16} /> {isSubmitting ? 'Saving...' : 'Save Draft'}
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || (user?.role !== 'operator' && cardData?.status === 'pending_supervisor' && currentStep === 1)}
                className="px-6 py-2 rounded text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {currentStep === 1 && user?.role === 'operator' && (!cardData || cardData?.status === 'draft') ? (isSubmitting ? 'Submitting...' : 'Submit for Setup Approval') : currentStep === maxStep ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
