'use client';

import { useState } from 'react';
import { updateStudentSkills, updateResumeUrl } from '@/app/actions/studentProfile';
import { FileText, Link as LinkIcon, Plus, X, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileEditor({
  studentId,
  initialSkills = [],
  initialResume = ''
}: {
  studentId: string;
  initialSkills: string[];
  initialResume: string | null;
}) {
  const [skills, setSkills] = useState<string[]>(initialSkills || []);
  const [newSkill, setNewSkill] = useState('');
  const [resumeUrl, setResumeUrl] = useState(initialResume || '');
  const [isSavingResume, setIsSavingResume] = useState(false);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    
    const updatedSkills = [...skills, newSkill.trim()];
    setSkills(updatedSkills);
    setNewSkill('');
    
    await updateStudentSkills(studentId, updatedSkills);
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    const updatedSkills = skills.filter(s => s !== skillToRemove);
    setSkills(updatedSkills);
    await updateStudentSkills(studentId, updatedSkills);
  };

  const handleSaveResume = async () => {
    setIsSavingResume(true);
    await updateResumeUrl(studentId, resumeUrl);
    setIsSavingResume(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Resume Section */}
      <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <FileText className="w-32 h-32" />
        </div>
        <h2 className="font-display text-2xl text-on-surface mb-6 relative z-10">Resume & Documents</h2>
        <div className="space-y-4 relative z-10">
          <label className="block text-sm font-semibold text-on-surface-variant">Cloud Resume URL (PDF)</label>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type="url" 
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://drive.google.com/..." 
                className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-lg border border-outline-variant focus:border-primary outline-none font-sans text-sm"
              />
            </div>
            <button 
              onClick={handleSaveResume}
              disabled={isSavingResume}
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              {isSavingResume ? 'Saving...' : <Upload className="w-4 h-4" />}
            </button>
          </div>
          {resumeUrl && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
              <FileText className="w-6 h-6 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Resume Linked Successfully</p>
                <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:underline">Verify Document</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm">
        <h2 className="font-display text-2xl text-on-surface mb-6">Technical Skill Matrix</h2>
        
        <form onSubmit={handleAddSkill} className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="E.g. React, Python, AWS..." 
            className="flex-grow px-4 py-2 bg-surface-container rounded-lg border border-outline-variant focus:border-primary outline-none font-sans text-sm"
          />
          <button type="submit" className="px-4 py-2 bg-surface border border-outline-variant rounded-lg font-semibold text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {skills.length === 0 ? (
            <div className="text-sm text-on-surface-variant w-full text-center py-4">No skills added yet.</div>
          ) : (
            skills.map(skill => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key={skill} 
                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-mono font-medium"
              >
                {skill}
                <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
