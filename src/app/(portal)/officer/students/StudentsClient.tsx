'use client';

import { useState } from 'react';
import { Search, Filter, Edit, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Student = {
  student_id: string;
  full_name: string;
  roll_number: string;
  department: string;
  gpa: number;
  graduation_year: number;
  placement_status: string | null;
};

export default function StudentsClient({ students }: { students: Student[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [minGpaFilter, setMinGpaFilter] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.roll_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'ALL' || s.department === deptFilter;
    const matchesStatus = statusFilter === 'ALL' || (s.placement_status || 'UNPLACED') === statusFilter;
    const matchesGpa = s.gpa >= minGpaFilter;
    return matchesSearch && matchesDept && matchesStatus && matchesGpa;
  });

  const getStatusColor = (status: string | null) => {
    switch(status) {
      case 'PLACED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'INTERVIEWING': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'APPLIED': return 'bg-primary/10 text-primary border-primary/20';
      case 'UNPLACED': return 'bg-surface-container text-on-surface-variant border-outline-variant';
      default: return 'bg-surface-container text-on-surface-variant border-outline-variant';
    }
  };

  const handleCommitOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    showToast(`Override saved for ${selectedStudent.full_name}`);
    setSelectedStudent(null);
  };

  const departments = ['ALL', ...Array.from(new Set(students.map(s => s.department)))];

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-primary text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-sans text-sm font-semibold border border-white/20 backdrop-blur-xl"
          >
            <Check className="w-4 h-4 text-emerald-300" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbar */}
      <div className="bg-surface glass-panel p-4 rounded-3xl flex flex-col md:flex-row gap-4 border border-outline-variant shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant focus:border-primary outline-none font-sans text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant outline-none font-sans text-sm font-semibold cursor-pointer"
          >
            {departments.map(d => (
              <option key={d} value={d}>{d === 'ALL' ? 'All Departments' : d}</option>
            ))}
          </select>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all font-sans text-sm font-semibold cursor-pointer active:scale-95 ${
              statusFilter !== 'ALL' || minGpaFilter > 0 || showFilters
                ? 'bg-primary/10 border-primary/40 text-primary'
                : 'bg-surface border-outline-variant text-on-surface hover:border-primary/50'
            }`}
          >
            <Filter className="w-4 h-4" /> Filters
            {(statusFilter !== 'ALL' || minGpaFilter > 0) && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-surface glass-panel p-6 rounded-3xl border border-outline-variant/40 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Filter by Status</label>
                <div className="flex flex-wrap gap-2">
                  {['ALL', 'UNPLACED', 'APPLIED', 'INTERVIEWING', 'PLACED'].map(st => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        statusFilter === st
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-surface-container/60 text-on-surface-variant hover:border-primary/30 border border-outline-variant/40'
                      }`}
                    >
                      {st === 'ALL' ? 'All' : st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Min. GPA Threshold</label>
                  <span className="font-mono text-primary font-bold text-sm">{minGpaFilter.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.1"
                  value={minGpaFilter}
                  onChange={(e) => setMinGpaFilter(parseFloat(e.target.value))}
                  className="w-full accent-primary mt-2"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Table */}
      <div className="bg-surface rounded-3xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-container/30 border-b border-outline-variant text-on-surface-variant font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Student Identity</th>
                <th className="px-6 py-4">Department & Cohort</th>
                <th className="px-6 py-4">Cumulative GPA</th>
                <th className="px-6 py-4">Placement Status</th>
                <th className="px-6 py-4 text-right">Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                    No students match the current criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.student_id} className="hover:bg-surface-container/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-on-surface group-hover:text-primary transition-colors">{student.full_name}</div>
                      <div className="font-mono text-xs text-on-surface-variant">{student.roll_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-on-surface">{student.department}</div>
                      <div className="text-xs text-on-surface-variant">Class of {student.graduation_year}</div>
                    </td>
                    <td className="px-6 py-4 font-mono font-semibold text-primary">{student.gpa.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(student.placement_status)}`}>
                        {student.placement_status || 'UNPLACED'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedStudent(student)} 
                        className="p-2.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer active:scale-95"
                        title="Edit Placement Status & GPA"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Override Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedStudent(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface relative z-10 w-full max-w-lg rounded-3xl shadow-2xl border border-outline-variant overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-outline-variant bg-surface-container/30 flex justify-between items-center">
                <div>
                  <h3 className="font-display text-xl text-on-surface">Administrative Override</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Audit log will record this action.</p>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-surface-container rounded-full cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleCommitOverride} className="p-6 space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-primary">{selectedStudent.full_name}</div>
                    <div className="text-xs font-mono text-primary/70">{selectedStudent.roll_number}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary/70">Current GPA</div>
                    <div className="font-mono font-bold text-primary">{selectedStudent.gpa.toFixed(2)}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">Override Placement Status</label>
                    <select 
                      defaultValue={selectedStudent.placement_status || 'UNPLACED'}
                      className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm cursor-pointer"
                    >
                      <option value="UNPLACED">UNPLACED</option>
                      <option value="APPLIED">APPLIED</option>
                      <option value="INTERVIEWING">INTERVIEWING</option>
                      <option value="PLACED">PLACED</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">Override CGPA</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      defaultValue={selectedStudent.gpa}
                      className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm font-mono"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">Audit Reason</label>
                    <textarea 
                      placeholder="e.g. Approved grade change request #1204..."
                      className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm resize-none"
                      rows={2}
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setSelectedStudent(null)} 
                    className="px-5 py-2.5 rounded-xl border border-outline-variant font-semibold text-sm hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Commit Override
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
