'use client';

import { useState } from 'react';
import { Settings, Shield, Clock, Search, Server, BookOpen, ToggleRight, ToggleLeft, Plus, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AuditLog = {
  log_id: string;
  action_type: string;
  target_entity: string;
  created_at: string;
  actor_id?: string | null;
  details?: any;
};

export default function SettingsClient({ auditLogs }: { auditLogs: AuditLog[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [driveWindowOpen, setDriveWindowOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [departments, setDepartments] = useState<string[]>([
    'Computer Science (CS)',
    'Information Tech (IT)',
    'Electronics (ECE)',
    'Mechanical'
  ]);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleRegistration = () => {
    const nextState = !registrationEnabled;
    setRegistrationEnabled(nextState);
    showToast(nextState ? 'Global student/recruiter registration enabled' : 'Global registration paused');
  };

  const handleToggleDriveWindow = () => {
    const nextState = !driveWindowOpen;
    setDriveWindowOpen(nextState);
    showToast(nextState ? 'Placement drive window active' : 'Placement drive applications paused');
  };

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;
    if (departments.includes(newDeptName.trim())) {
      showToast('Department already exists');
      return;
    }
    setDepartments([...departments, newDeptName.trim()]);
    showToast(`Added branch "${newDeptName.trim()}"`);
    setNewDeptName('');
    setShowAddDeptModal(false);
  };

  const filteredLogs = auditLogs.filter(log => 
    log.action_type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.target_entity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in">
      
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lifecycle Controls */}
        <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Server className="w-40 h-40" />
          </div>
          <div className="relative z-10">
            <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
              <Settings className="w-5 h-5 text-primary" /> Lifecycle Controls
            </h2>
            
            <div className="space-y-6">
              <div 
                onClick={handleToggleRegistration}
                className="flex justify-between items-center p-4 bg-surface-container/50 border border-outline-variant/50 rounded-2xl hover:border-primary/40 hover:bg-surface-container transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-on-surface flex items-center gap-2">
                    Global Registration Access
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${registrationEnabled ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {registrationEnabled ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <div className="text-sm text-on-surface-variant mt-0.5">Allow new students and recruiters to register</div>
                </div>
                {registrationEnabled ? (
                  <ToggleRight className="w-9 h-9 text-emerald-600 group-hover:scale-110 transition-transform" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-outline group-hover:scale-110 transition-transform" />
                )}
              </div>

              <div 
                onClick={handleToggleDriveWindow}
                className="flex justify-between items-center p-4 bg-surface-container/50 border border-outline-variant/50 rounded-2xl hover:border-primary/40 hover:bg-surface-container transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-on-surface flex items-center gap-2">
                    Campus Placement Drive Window
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${driveWindowOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {driveWindowOpen ? 'Open' : 'Paused'}
                    </span>
                  </div>
                  <div className="text-sm text-on-surface-variant mt-0.5">Globally control student applications intake</div>
                </div>
                {driveWindowOpen ? (
                  <ToggleRight className="w-9 h-9 text-emerald-600 group-hover:scale-110 transition-transform" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-outline group-hover:scale-110 transition-transform" />
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Platform Maintenance Message</label>
                <textarea 
                  placeholder="System is operating normally. All services functional."
                  defaultValue="System is operating normally. All placement systems functional."
                  className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant outline-none font-sans text-sm resize-none focus:border-primary transition-colors"
                  rows={2}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum Management */}
        <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <BookOpen className="w-40 h-40" />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl text-on-surface flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" /> Department Configurations
              </h2>
            </div>
            
            <div className="space-y-3 mb-6 max-h-[220px] overflow-y-auto pr-1">
              {departments.map((dept, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-surface-container/60 border border-outline-variant/40 rounded-xl hover:border-primary/30 transition-all">
                  <span className="font-semibold text-sm">{dept}</span>
                  <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Active</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setShowAddDeptModal(true)}
              className="w-full py-3.5 bg-surface border border-dashed border-primary/40 rounded-2xl text-sm font-bold text-primary hover:bg-primary/5 hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4" /> Register New Academic Branch
            </button>
          </div>
        </div>

      </div>

      {/* Add Department Modal */}
      <AnimatePresence>
        {showAddDeptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowAddDeptModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface relative z-10 w-full max-w-md rounded-3xl shadow-2xl border border-outline-variant p-6 space-y-5"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-display text-xl text-on-surface">Add Academic Branch</h3>
                <button onClick={() => setShowAddDeptModal(false)} className="p-2 hover:bg-surface-container rounded-full cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddDepartment} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant mb-2">Branch Title & Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Artificial Intelligence & DS (AI-DS)"
                    value={newDeptName}
                    onChange={(e) => setNewDeptName(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddDeptModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-outline-variant font-semibold text-sm hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Save Branch
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Immutable Audit Logs */}
      <div className="bg-surface glass-panel rounded-3xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-8 border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl"><Shield className="w-5 h-5 text-primary" /></div>
            <div>
              <h2 className="font-display text-2xl text-on-surface">Immutable Audit Logs</h2>
              <p className="text-sm text-on-surface-variant font-medium mt-1">Read-only security and compliance trail.</p>
            </div>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search action or entity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-surface rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-container/30 border-b border-outline-variant text-on-surface-variant font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">Timestamp</th>
                <th className="px-8 py-4">Action Event</th>
                <th className="px-8 py-4">Target Entity</th>
                <th className="px-8 py-4">Actor ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-on-surface-variant">
                    No matching audit logs found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.log_id} className="hover:bg-surface-container/10 transition-colors">
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono text-xs">{new Date(log.created_at).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md text-xs border border-primary/15">
                        {log.action_type}
                      </span>
                    </td>
                    <td className="px-8 py-4 font-semibold text-on-surface">{log.target_entity}</td>
                    <td className="px-8 py-4 font-mono text-xs text-on-surface-variant">{log.actor_id || 'SYSTEM_PROCESS'}</td>
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
