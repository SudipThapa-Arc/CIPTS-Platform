'use client';

import { useState } from 'react';
import { Download, Printer, Filter, Settings2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

type Student = {
  roll_number: string;
  full_name: string;
  department: string;
  gpa: number;
  graduation_year: number;
  placement_status: string | null;
};

export default function ReportsClient({ students }: { students: Student[] }) {
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [cohortFilter, setCohortFilter] = useState('ALL');
  const [minGpa, setMinGpa] = useState<number>(0);

  // Extract unique filter options
  const departments = ['ALL', ...Array.from(new Set(students.map(s => s.department)))];
  const cohorts = ['ALL', ...Array.from(new Set(students.map(s => s.graduation_year.toString())))];
  
  // Apply filters
  const filteredData = students.filter(s => {
    const dMatch = deptFilter === 'ALL' || s.department === deptFilter;
    const sMatch = statusFilter === 'ALL' || (s.placement_status || 'UNPLACED') === statusFilter;
    const cMatch = cohortFilter === 'ALL' || s.graduation_year.toString() === cohortFilter;
    const gMatch = s.gpa >= minGpa;
    return dMatch && sMatch && cMatch && gMatch;
  });

  const exportCSV = () => {
    if (filteredData.length === 0) return;
    
    const headers = ['Roll Number', 'Full Name', 'Department', 'GPA', 'Cohort', 'Placement Status'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(s => [
        s.roll_number,
        `"${s.full_name}"`, // Quote for potential commas in name
        s.department,
        s.gpa.toFixed(2),
        s.graduation_year,
        s.placement_status || 'UNPLACED'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CIPTS_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Query Builder */}
      <div className="bg-surface glass-panel p-8 rounded-3xl border border-outline-variant shadow-sm print:hidden">
        <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/50 pb-4">
          <Settings2 className="w-5 h-5 text-primary" />
          <h2 className="font-display text-2xl text-on-surface">Custom Report Query Builder</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Academic Cohort</label>
            <select 
              value={cohortFilter}
              onChange={e => setCohortFilter(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container/50 rounded-xl border border-outline-variant outline-none font-sans text-sm focus:border-primary"
            >
              {cohorts.map(c => <option key={c} value={c}>{c === 'ALL' ? 'All Cohorts' : `Class of ${c}`}</option>)}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Department</label>
            <select 
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container/50 rounded-xl border border-outline-variant outline-none font-sans text-sm focus:border-primary"
            >
              {departments.map(d => <option key={d} value={d}>{d === 'ALL' ? 'All Departments' : d}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Placement Status</label>
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container/50 rounded-xl border border-outline-variant outline-none font-sans text-sm focus:border-primary"
            >
              <option value="ALL">All Statuses</option>
              <option value="PLACED">Placed Only</option>
              <option value="UNPLACED">Unplaced Only</option>
              <option value="INTERVIEWING">In Pipeline (Interviewing)</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Minimum GPA</label>
              <span className="font-mono text-primary font-bold">{minGpa.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="0" max="4" step="0.1" 
              value={minGpa}
              onChange={e => setMinGpa(parseFloat(e.target.value))}
              className="w-full accent-primary mt-2"
            />
          </div>
        </div>
      </div>

      {/* Export Command Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-surface-container/30 p-4 rounded-2xl border border-outline-variant print:hidden gap-4">
        <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Query returned <span className="font-bold text-on-surface font-mono">{filteredData.length}</span> records
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={exportCSV}
            disabled={filteredData.length === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-surface border border-outline-variant rounded-xl font-semibold text-sm hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
            onClick={handlePrint}
            disabled={filteredData.length === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
          >
            <Printer className="w-4 h-4" /> Generate PDF Report
          </button>
        </div>
      </div>

      {/* Report Data Preview Grid (And Printable Area) */}
      <div className="bg-surface rounded-3xl border border-outline-variant shadow-sm overflow-hidden print:border-none print:shadow-none">
        
        {/* Print Header (Only visible when printing) */}
        <div className="hidden print:block p-8 border-b-2 border-black mb-4">
          <h1 className="font-display text-4xl text-black mb-2">Institutional Placement Report</h1>
          <p className="text-sm text-gray-600 font-sans">
            Generated on {new Date().toLocaleDateString()} | 
            Filters: Cohort={cohortFilter}, Dept={deptFilter}, Status={statusFilter}, MinGPA={minGpa.toFixed(2)}
          </p>
        </div>

        <div className="p-6 bg-surface-container/20 border-b border-outline-variant flex items-center gap-3 print:hidden">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-display text-xl text-on-surface">Data Preview</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm print:text-xs">
            <thead className="bg-surface-container/30 border-b border-outline-variant text-on-surface-variant font-semibold text-xs uppercase tracking-wider print:bg-white print:border-black print:text-black">
              <tr>
                <th className="px-6 py-4">Roll No.</th>
                <th className="px-6 py-4">Candidate Name</th>
                <th className="px-6 py-4">Dept.</th>
                <th className="px-6 py-4">Cohort</th>
                <th className="px-6 py-4">GPA</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 print:divide-black/20">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant print:hidden">
                    No data to display. Adjust your query filters.
                  </td>
                </tr>
              ) : (
                filteredData.map((s, i) => (
                  <tr key={i} className="hover:bg-surface-container/10 transition-colors">
                    <td className="px-6 py-3 font-mono text-on-surface-variant print:text-black">{s.roll_number}</td>
                    <td className="px-6 py-3 font-semibold text-on-surface print:text-black">{s.full_name}</td>
                    <td className="px-6 py-3 text-on-surface-variant print:text-black">{s.department}</td>
                    <td className="px-6 py-3 font-mono text-on-surface-variant print:text-black">{s.graduation_year}</td>
                    <td className="px-6 py-3 font-mono font-semibold text-on-surface print:text-black">{s.gpa.toFixed(2)}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider print:border print:border-black print:text-black print:bg-white ${
                        s.placement_status === 'PLACED' ? 'bg-emerald-50 text-emerald-700' :
                        s.placement_status === 'INTERVIEWING' ? 'bg-amber-50 text-amber-700' :
                        'bg-surface-container text-on-surface-variant'
                      }`}>
                        {s.placement_status || 'UNPLACED'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
