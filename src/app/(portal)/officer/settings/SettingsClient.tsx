'use client';

import { useState } from 'react';
import { Settings, Shield, Clock, Search, Server, BookOpen, ToggleRight } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const filteredLogs = auditLogs.filter(log => 
    log.action_type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.target_entity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in">
      
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
              <div className="flex justify-between items-center p-4 bg-surface-container/50 border border-outline-variant/50 rounded-xl">
                <div>
                  <div className="font-semibold text-on-surface">Global Registration Access</div>
                  <div className="text-sm text-on-surface-variant">Allow new students and recruiters to register</div>
                </div>
                <ToggleRight className="w-8 h-8 text-emerald-600 cursor-pointer" />
              </div>

              <div className="flex justify-between items-center p-4 bg-surface-container/50 border border-outline-variant/50 rounded-xl">
                <div>
                  <div className="font-semibold text-on-surface">Campus Placement Drive Window</div>
                  <div className="text-sm text-on-surface-variant">Globally pause all new applications</div>
                </div>
                <ToggleRight className="w-8 h-8 text-emerald-600 cursor-pointer" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Platform Maintenance Message</label>
                <textarea 
                  disabled
                  placeholder="System is operating normally."
                  className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant outline-none font-sans text-sm resize-none opacity-50 cursor-not-allowed"
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
            <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary" /> Department Configurations
            </h2>
            
            <div className="space-y-4 mb-6">
              {['Computer Science (CS)', 'Information Tech (IT)', 'Electronics (ECE)', 'Mechanical'].map((dept, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-surface-container border border-outline-variant/50 rounded-lg">
                  <span className="font-semibold text-sm">{dept}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-bold uppercase">Active</span>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 bg-surface border border-dashed border-outline-variant rounded-xl text-sm font-semibold text-on-surface hover:border-primary hover:text-primary transition-colors">
              + Register New Academic Branch
            </button>
          </div>
        </div>

      </div>

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
              className="w-full pl-9 pr-4 py-2 bg-surface rounded-lg border border-outline-variant focus:border-primary outline-none font-sans text-sm"
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
                      <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded text-xs">
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
