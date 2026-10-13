'use client';

import React from 'react';
import Link from 'next/link';
import { Printer, ArrowLeft } from 'lucide-react';

export default function PrintCardClient({ card }: { card: any }) {
  const handlePrint = () => {
    window.print();
  };

  const setupDate = card?.setup_date ? new Date(card.setup_date).toLocaleDateString('en-GB') : '';
  const cardDate = card?.date ? new Date(card.date).toLocaleDateString('en-GB') : '';

  // 5 sample rows helper
  const render5SampleRows = (items: any[]) => {
    const rows = [1, 2, 3, 4, 5];
    return rows.map((num) => {
      const data = items?.find((i: any) => i.sample_no === num) || {};
      return (
        <tr key={num} className="h-6 text-center border-b border-black">
          <td className="border-r border-black font-mono font-bold text-[10px]">{num}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.fl || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.od_id || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.nc || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.ends || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.helix || ''}</td>
          <td className="border-r border-black text-[10px]">{data.visual || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.sample_time || ''}</td>
          <td className="text-[10px]">{data.sign || ''}</td>
        </tr>
      );
    });
  };

  // Retro samples helper
  const renderRetroRows = (eventNo: number) => {
    const samples = card?.retro_verifications?.filter((r: any) => r.event_no === eventNo) || [];
    return [1, 2].map((num) => {
      const data = samples.find((s: any) => s.sample_no === num) || {};
      return (
        <tr key={num} className="h-6 text-center border-b border-black">
          <td className="border-r border-black font-mono font-bold text-[10px]">{num}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.fl || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.od_id || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.nc || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.ends || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.helix || ''}</td>
          <td className="border-r border-black text-[10px]">{data.visual || ''}</td>
          <td className="border-r border-black font-mono text-[10px]">{data.sample_time || ''}</td>
          <td className="text-[10px]">{data.sign || ''}</td>
        </tr>
      );
    });
  };

  return (
    <div className="bg-neutral-100 min-h-screen p-4 md:p-8 print:p-0 print:bg-white text-black font-sans">
      {/* Action Bar (hidden on print) */}
      <div className="max-w-[1000px] mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href={`/process-card/${card.card_no}`}
          className="flex items-center gap-2 text-xs font-bold text-neutral-700 bg-white px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Process Card
        </Link>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 px-5 py-2.5 rounded-lg shadow transition-colors"
        >
          <Printer size={16} /> Print 2-Page Process Card
        </button>
      </div>

      {/* ============================================================== */}
      {/* PAGE 1 / 2 (FRONT SIDE)                                        */}
      {/* ============================================================== */}
      <div className="max-w-[1000px] mx-auto bg-white p-6 border-2 border-black shadow-md print:shadow-none print:border-none print:p-0 mb-10 print:mb-0 print:break-after-page">
        {/* Header Block */}
        <div className="border-2 border-black mb-1">
          <div className="flex border-b-2 border-black">
            <div className="w-2/3 p-2 border-r-2 border-black flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs">CC</div>
              <div className="font-bold text-base tracking-wide uppercase font-serif">Coventry Coil-o-Matic (Haryana) Ltd.</div>
            </div>
            <div className="w-1/3 grid grid-cols-2 text-[10px] font-bold font-mono">
              <div className="border-r border-b border-black p-1">FORMAT NO.</div>
              <div className="border-b border-black p-1 text-center font-bold">F/PRD/22</div>
              <div className="border-r border-b border-black p-1">REV. NO.</div>
              <div className="border-b border-black p-1 text-center">03</div>
              <div className="border-r border-b border-black p-1">REV DATE</div>
              <div className="border-b border-black p-1 text-center">04-12-2024</div>
              <div className="border-r border-black p-1">PAGE (S)</div>
              <div className="p-1 text-center font-bold">1 / 2</div>
            </div>
          </div>
          <div className="text-center py-1 font-bold text-lg uppercase tracking-wider font-serif border-b-2 border-black">
            Process Card Coiling
          </div>
          <div className="p-2 flex justify-between text-xs font-bold">
            <div>Work Centre : <span className="font-mono">Coiling</span></div>
            <div>Machine No. : <span className="font-mono underline">{card.machine_no || 'S-02'}</span></div>
            <div>Date : <span className="font-mono underline">{cardDate || '..................'}</span></div>
            <div>Shift : <span className="font-mono underline">{card.shift || 'A'}</span></div>
          </div>
        </div>

        {/* Coiling Set-up Parameters Table */}
        <div className="border-2 border-black mb-3">
          <table className="w-full text-center border-collapse text-[10px]">
            <tbody>
              <tr className="border-b border-black font-bold bg-neutral-50">
                <td rowSpan={2} className="border-r border-black p-1 w-20 uppercase font-semibold">Coiling Set-up Parameters</td>
                <td className="border-r border-black p-1">Setup Change Part Name</td>
                <td colSpan={5} className="border-r border-black p-1">
                  Setup Card issue Date: <span className="font-mono font-normal">{setupDate || '/ /'}</span>
                </td>
                <td rowSpan={2} className="border-r border-black p-1">Operator Name</td>
                <td rowSpan={2} className="border-r border-black p-1">Time</td>
                <td colSpan={5} className="border-r border-black p-1 uppercase">Approved set-up parameter</td>
                <td rowSpan={2} className="border-r border-black p-1 w-12 font-bold">RESULT (OK / NOT OK)</td>
                <td rowSpan={2} className="border-r border-black p-1">Sup Name</td>
                <td rowSpan={2} className="border-r border-black p-1">Time</td>
                <td rowSpan={2} className="p-1">Sign</td>
              </tr>
              <tr className="border-b border-black font-bold text-[9px]">
                <td className="border-r border-black p-1 font-mono">{card.part_no || ''}</td>
                <td className="border-r border-black p-0.5">Helix</td>
                <td className="border-r border-black p-0.5">Lo</td>
                <td className="border-r border-black p-0.5">OD/ID</td>
                <td className="border-r border-black p-0.5">Nc</td>
                <td className="border-r border-black p-0.5">Ends</td>
                <td className="border-r border-black p-0.5">Helix</td>
                <td className="border-r border-black p-0.5">Lo</td>
                <td className="border-r border-black p-0.5">OD/ID</td>
                <td className="border-r border-black p-0.5">Nc</td>
                <td className="border-r border-black p-0.5">Ends</td>
              </tr>
              {/* Actual Values Row */}
              <tr className="h-7 text-xs font-mono font-bold">
                <td className="border-r border-black text-[9px] font-sans font-normal p-0.5">Parameters</td>
                <td className="border-r border-black text-[10px]">{card.part_no || ''}</td>
                <td className="border-r border-black text-[9px]">
                  {card.spec_helix ? `${card.spec_helix} / ${card.actual_helix || ''}` : (card.actual_helix || '')}
                </td>
                <td className="border-r border-black text-[9px]">{card.actual_lo || ''}</td>
                <td className="border-r border-black text-[9px]">{card.actual_od_id || ''}</td>
                <td className="border-r border-black text-[9px]">{card.actual_nc || ''}</td>
                <td className="border-r border-black text-[9px]">{card.actual_ends || ''}</td>
                <td className="border-r border-black text-[9px] font-sans">{card.operator_name || ''}</td>
                <td className="border-r border-black text-[9px]">{card.setup_time || ''}</td>
                <td className="border-r border-black text-[9px]">{card.actual_helix || ''}</td>
                <td className="border-r border-black text-[9px]">{card.actual_lo || ''}</td>
                <td className="border-r border-black text-[9px]">{card.actual_od_id || ''}</td>
                <td className="border-r border-black text-[9px]">{card.actual_nc || ''}</td>
                <td className="border-r border-black text-[9px]">{card.actual_ends || ''}</td>
                <td className="border-r border-black text-[9px] font-bold text-emerald-800">
                  {card.setup_approval_action === 'approved' ? 'OK' : card.status === 'draft' ? '' : 'PENDING'}
                </td>
                <td className="border-r border-black text-[9px] font-sans">{card.supervisor_name || ''}</td>
                <td className="border-r border-black text-[9px]">{card.setup_time || ''}</td>
                <td className="text-[9px]">{card.setup_approval_action === 'approved' ? '✓' : ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Combined Material Traceability & Observation Table */}
        <div className="border-2 border-black mb-2">
          <table className="w-full text-center border-collapse text-[10px]">
            <thead>
              <tr className="border-b-2 border-black font-bold bg-neutral-50 text-[9px]">
                <th rowSpan={2} className="border-r border-black p-1 w-10">Coil No.</th>
                <th rowSpan={2} className="border-r border-black p-1 w-16">Customer</th>
                <th rowSpan={2} className="border-r border-black p-1 w-14">Part No.</th>
                <th rowSpan={2} className="border-r border-black p-1 w-12">Wire Grade</th>
                <th rowSpan={2} className="border-r border-black p-1 w-10">Wire Dia.</th>
                <th rowSpan={2} className="border-r border-black p-1 w-12">UTS / Ra%</th>
                <th rowSpan={2} className="border-r border-black p-1 w-12">Heat No.</th>
                <th rowSpan={2} className="border-r border-black p-1 w-10">Coil Wt.</th>
                <th colSpan={12} className="border-r border-black p-0.5 uppercase">Observation</th>
                <th rowSpan={2} className="border-r border-black p-1 w-10">Qty</th>
                <th rowSpan={2} className="p-1 w-20">Signature</th>
              </tr>
              <tr className="border-b border-black font-bold text-[8px]">
                <th colSpan={4} className="border-r border-black p-0.5 bg-blue-50/50">Start</th>
                <th colSpan={4} className="border-r border-black p-0.5 bg-amber-50/50">Middle</th>
                <th colSpan={4} className="border-r border-black p-0.5 bg-emerald-50/50">End</th>
              </tr>
              <tr className="border-b border-black font-bold text-[8px] bg-neutral-100">
                <th colSpan={8} className="border-r border-black"></th>
                {['Lo', 'OD', 'Nc', 'Ends', 'Lo', 'OD', 'Nc', 'Ends', 'Lo', 'OD', 'Nc', 'Ends'].map((col, i) => (
                  <th key={i} className={`p-0.5 ${i % 4 === 3 ? 'border-r border-black' : 'border-r border-neutral-300'}`}>{col}</th>
                ))}
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black text-[9px] font-mono">
              {[1, 2, 3, 4, 5, 6].map((rowIdx) => {
                const obs = card?.observations?.[rowIdx - 1] || {};
                const mat = rowIdx === 1 ? card?.material || {} : {};
                return (
                  <tr key={rowIdx} className="h-6">
                    <td className="border-r border-black">{mat.coil_no || ''}</td>
                    <td className="border-r border-black font-sans">{rowIdx === 1 ? 'ABC Automotive' : ''}</td>
                    <td className="border-r border-black">{rowIdx === 1 ? card.part_no || '' : ''}</td>
                    <td className="border-r border-black">{mat.wire_grade || ''}</td>
                    <td className="border-r border-black">{mat.wire_dia || ''}</td>
                    <td className="border-r border-black">{mat.uts_rm_no || ''}</td>
                    <td className="border-r border-black">{mat.heat_no || ''}</td>
                    <td className="border-r border-black">{mat.coil_weight || ''}</td>
                    {/* Start */}
                    <td className="border-r border-neutral-300">{obs.start_lo || ''}</td>
                    <td className="border-r border-neutral-300">{obs.start_od || ''}</td>
                    <td className="border-r border-neutral-300">{obs.start_nc || ''}</td>
                    <td className="border-r border-black">{obs.start_ends || ''}</td>
                    {/* Mid */}
                    <td className="border-r border-neutral-300">{obs.mid_lo || ''}</td>
                    <td className="border-r border-neutral-300">{obs.mid_od || ''}</td>
                    <td className="border-r border-neutral-300">{obs.mid_nc || ''}</td>
                    <td className="border-r border-black">{obs.mid_ends || ''}</td>
                    {/* End */}
                    <td className="border-r border-neutral-300">{obs.end_lo || ''}</td>
                    <td className="border-r border-neutral-300">{obs.end_od || ''}</td>
                    <td className="border-r border-neutral-300">{obs.end_nc || ''}</td>
                    <td className="border-r border-black">{obs.end_ends || ''}</td>
                    {/* Qty */}
                    <td className="border-r border-black font-bold">{obs.qty || ''}</td>
                    <td className="font-sans text-[8px]">{obs.operator_sign || ''}</td>
                  </tr>
                );
              })}
              {/* Signature Block Tier 1 */}
              <tr className="h-5 bg-neutral-50 text-[9px] font-bold font-sans">
                <td colSpan={8} className="border-r border-black text-left px-2">OPERATOR ➔ {card.operator_name || ''}</td>
                <td colSpan={12} className="border-r border-black"></td>
                <td colSpan={2} className="text-center">OPERATOR SIGN</td>
              </tr>
              <tr className="h-5 bg-neutral-50 text-[9px] font-bold font-sans">
                <td colSpan={8} className="border-r border-black text-left px-2">SUPERVISOR ➔ {card.supervisor_name || ''}</td>
                <td colSpan={12} className="border-r border-black"></td>
                <td colSpan={2} className="text-center">SUPERVISOR SIGN</td>
              </tr>
              <tr className="h-5 bg-neutral-50 text-[9px] font-bold font-sans border-b-2 border-black">
                <td colSpan={8} className="border-r border-black text-left px-2">SECTION HEAD ➔ Mr. A.K. Sharma</td>
                <td colSpan={12} className="border-r border-black"></td>
                <td colSpan={2} className="text-center">SECTION HEAD SIGN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PAGE 2 / 2 (BACK SIDE)                                         */}
      {/* ============================================================== */}
      <div className="max-w-[1000px] mx-auto bg-white p-6 border-2 border-black shadow-md print:shadow-none print:border-none print:p-0">
        {/* Page 2 Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-2 text-xs font-bold font-serif">
          <div>Coventry Coil-o-Matic (Haryana) Ltd.</div>
          <div className="text-base tracking-wider uppercase">PROCESS CARD COILING (PAGE 2 / 2)</div>
          <div>FORMAT: F/PRD/22</div>
        </div>
        <div className="flex justify-between text-xs font-bold mb-3 border-b border-black pb-1">
          <div>Work Centre : <span className="font-mono">COILING</span></div>
          <div>Machine No : <span className="font-mono underline">{card.machine_no || 'S-02'}</span></div>
          <div>Part No. : <span className="font-mono underline">{card.part_no || ''}</span></div>
        </div>

        {/* Parallel Grid: First-Off on Left, Last-Off on Right */}
        <div className="grid grid-cols-2 border-2 border-black mb-3 divide-x-2 divide-black">
          {/* Left Column: First-off / Running */}
          <div>
            <div className="font-bold text-xs p-1 text-center border-b-2 border-black bg-neutral-50 uppercase">
              First-off / Running
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-neutral-100 text-[9px] font-bold border-b border-black">
                  <th className="border-r border-black p-1 w-8">S.No.</th>
                  <th className="border-r border-black p-1">F/L</th>
                  <th className="border-r border-black p-1">OD/ID</th>
                  <th className="border-r border-black p-1">NC</th>
                  <th className="border-r border-black p-1">ENDS</th>
                  <th className="border-r border-black p-1">HELIX</th>
                  <th className="border-r border-black p-1">VISUAL</th>
                  <th className="border-r border-black p-1">TIME</th>
                  <th className="p-1">SIGN</th>
                </tr>
              </thead>
              <tbody>{render5SampleRows(card.first_off)}</tbody>
            </table>

            {/* Unplanned Abnormality 1 */}
            <div className="border-t-2 border-black p-1 text-[10px] font-bold bg-neutral-50">
              UNPLANNED ABNORMALITY: <span className="font-normal font-mono">{card.abnormalities?.[0]?.description || '...........................................'}</span>
            </div>
            <table className="w-full border-collapse border-t border-black">
              <tbody>{render5SampleRows([]).slice(0, 2)}</tbody>
            </table>

            {/* Unplanned Abnormality 2 */}
            <div className="border-t-2 border-black p-1 text-[10px] font-bold bg-neutral-50">
              UNPLANNED ABNORMALITY: <span className="font-normal font-mono">{card.abnormalities?.[1]?.description || '...........................................'}</span>
            </div>
            <table className="w-full border-collapse border-t border-black">
              <tbody>{render5SampleRows([]).slice(0, 2)}</tbody>
            </table>
          </div>

          {/* Right Column: Last-off */}
          <div>
            <div className="font-bold text-xs p-1 text-center border-b-2 border-black bg-neutral-50 uppercase">
              Last-off
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-neutral-100 text-[9px] font-bold border-b border-black">
                  <th className="border-r border-black p-1 w-8">S.No.</th>
                  <th className="border-r border-black p-1">F/L</th>
                  <th className="border-r border-black p-1">OD/ID</th>
                  <th className="border-r border-black p-1">NC</th>
                  <th className="border-r border-black p-1">ENDS</th>
                  <th className="border-r border-black p-1">HELIX</th>
                  <th className="border-r border-black p-1">VISUAL</th>
                  <th className="border-r border-black p-1">TIME</th>
                  <th className="p-1">SIGN</th>
                </tr>
              </thead>
              <tbody>{render5SampleRows(card.last_off)}</tbody>
            </table>

            {/* Retroactive Verification 1 */}
            <div className="border-t-2 border-black flex items-center justify-between p-1 text-[9px] font-bold bg-neutral-50">
              <span>RETROACTIVE VERIFICATION</span>
              <span className="font-mono text-[8px]">PRESS.(120~160Kg) / TEMP(&lt;60°C) / VOLT(380-440)</span>
            </div>
            <table className="w-full border-collapse border-t border-black">
              <tbody>{renderRetroRows(1)}</tbody>
            </table>

            {/* Retroactive Verification 2 */}
            <div className="border-t-2 border-black flex items-center justify-between p-1 text-[9px] font-bold bg-neutral-50">
              <span>RETROACTIVE VERIFICATION</span>
              <span className="font-mono text-[8px]">PRESS.(120~160Kg) / TEMP(&lt;60°C) / VOLT(380-440)</span>
            </div>
            <table className="w-full border-collapse border-t border-black">
              <tbody>{renderRetroRows(2)}</tbody>
            </table>
          </div>
        </div>

        {/* Details of Rejection Table */}
        <div className="border-2 border-black mb-3">
          <div className="text-center font-bold text-[10px] p-1 border-b border-black uppercase tracking-wider bg-neutral-50">
            Details of Rejection
          </div>
          <table className="w-full text-center border-collapse text-[9px]">
            <thead>
              <tr className="border-b border-black font-bold">
                <th rowSpan={2} className="border-r border-black p-1 w-24">CCHL COIL NO.</th>
                <th rowSpan={2} className="border-r border-black p-1 w-20">PART NO.</th>
                <th colSpan={6} className="border-r border-black p-0.5 uppercase">Cause of Rejection</th>
                <th rowSpan={2} className="border-r border-black p-1 w-20">WIRE CUT (FIT)</th>
                <th rowSpan={2} className="p-1">REMARKS</th>
              </tr>
              <tr className="border-b border-black font-bold text-[8px] bg-neutral-100">
                <th className="border-r border-black p-0.5">JOB SETTING</th>
                <th className="border-r border-black p-0.5">ID/OD</th>
                <th className="border-r border-black p-0.5">N/C</th>
                <th className="border-r border-black p-0.5">WIRE BEND</th>
                <th className="border-r border-black p-0.5">POWER CUT</th>
                <th className="border-r border-black p-0.5 font-bold">TOTAL REJ.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black font-mono">
              {[1, 2, 3].map((idx) => {
                const rej = card?.rejections?.[idx - 1] || {};
                return (
                  <tr key={idx} className="h-6">
                    <td className="border-r border-black">{rej.cchl_coil_no || ''}</td>
                    <td className="border-r border-black">{rej.part_no || ''}</td>
                    <td className="border-r border-black">{rej.job_setting || ''}</td>
                    <td className="border-r border-black">{rej.id_od || ''}</td>
                    <td className="border-r border-black">{rej.nc || ''}</td>
                    <td className="border-r border-black">{rej.wire_bend || ''}</td>
                    <td className="border-r border-black">{rej.power_cut || ''}</td>
                    <td className="border-r border-black font-bold">{rej.total_rej || ''}</td>
                    <td className="border-r border-black">{rej.wire_cut_fit || ''}</td>
                    <td className="font-sans text-[8px]">{rej.remarks || ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer: Standard Abnormal Situation Record & Final Sign-Offs */}
        <div className="border border-black p-1.5 text-[8px] mb-6 leading-tight">
          <strong>Unplanned Changes / Abnormal situation Record:-</strong> Tool / Jig / Fixture / Instrument Breakage , Power Failure, Sudden Operator Sickness / Emergency , Machine Breakdown , Sudden Change in Work Environment , Abnormal Nature Climate.
        </div>

        <div className="flex justify-between items-end pt-4 px-8 text-xs font-bold uppercase">
          <div className="border-t-2 border-black pt-1 w-48 text-center">
            SUPERVISOR NAME
            <div className="text-[10px] font-normal font-mono mt-1">{card.supervisor_name || '................................'}</div>
          </div>
          <div className="border-t-2 border-black pt-1 w-48 text-center">
            SECTION HEAD
            <div className="text-[10px] font-normal font-mono mt-1">Mr. A.K. Sharma</div>
          </div>
        </div>
      </div>
    </div>
  );
}
