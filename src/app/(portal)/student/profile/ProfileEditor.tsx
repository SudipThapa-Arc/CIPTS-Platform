'use client';

import { useState, useRef } from 'react';
import { updateStudentSkills, updateAcademicInfo, uploadResumeFile } from '@/app/actions/studentProfile';
import { FileText, Link as LinkIcon, Plus, X, Upload, Save, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileEditor({
  studentId,
  initialSkills = [],
  initialResume = '',
  initialGpa = 0,
  initialRollNumber = ''
}: {
  studentId: string;
  initialSkills: string[];
  initialResume: string | null;
  initialGpa?: number | null;
  initialRollNumber?: string;
}) {
  const [skills, setSkills] = useState<string[]>(initialSkills || []);
  const [newSkill, setNewSkill] = useState('');
  
  const [resumeUrl, setResumeUrl] = useState(initialResume || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [gpa, setGpa] = useState(initialGpa?.toString() || '0');
  const [rollNumber, setRollNumber] = useState(initialRollNumber || '');
  const [isSavingAcademic, setIsSavingAcademic] = useState(false);
  const [academicSaved, setAcademicSaved] = useState(false);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert("Please upload a PDF file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('resume', file);
    
    const result = await uploadResumeFile(studentId, formData);
    
    if (result?.error) {
      alert(result.error);
    } else {
      setResumeUrl(result.url || "Uploaded Successfully");
    }
    
    setIsUploading(false);
  };

  const handleSaveAcademic = async () => {
    setIsSavingAcademic(true);
    await updateAcademicInfo(studentId, parseFloat(gpa), rollNumber);
    setIsSavingAcademic(false);
    setAcademicSaved(true);
    setTimeout(() => setAcademicSaved(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      
      {/* Academic Info Editor */}
      <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm relative col-span-1 md:col-span-2 lg:col-span-1">
        <h2 className="font-display text-2xl text-on-surface mb-6 relative z-10">Academic Information</h2>
        <div className="space-y-4 relative z-10">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-1">Cumulative GPA</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                max="4.0"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="w-full px-4 py-2 bg-surface-container rounded-lg border border-outline-variant focus:border-primary outline-none font-sans text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface-variant mb-1">Roll Number</label>
              <input 
                type="text" 
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-4 py-2 bg-surface-container rounded-lg border border-outline-variant focus:border-primary outline-none font-sans text-sm uppercase"
              />
            </div>
            <button 
              onClick={handleSaveAcademic}
              disabled={isSavingAcademic}
              className="mt-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {isSavingAcademic ? 'Saving...' : academicSaved ? <><CheckCircle2 className="w-4 h-4"/> Saved</> : <><Save className="w-4 h-4" /> Save Academic Info</>}
            </button>
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <FileText className="w-32 h-32" />
        </div>
        <h2 className="font-display text-2xl text-on-surface mb-6 relative z-10">Resume & Documents</h2>
        <div className="space-y-4 relative z-10">
          <label className="block text-sm font-semibold text-on-surface-variant">Upload Resume (PDF)</label>
          <div className="flex gap-2">
            <input 
              type="file"
              accept=".pdf,application/pdf"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full px-4 py-3 border-2 border-dashed border-outline-variant rounded-xl hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-on-surface-variant"
            >
              <Upload className="w-6 h-6 text-primary" />
              {isUploading ? <span className="text-sm font-medium">Uploading...</span> : <span className="text-sm font-medium">Click to browse or drag PDF here</span>}
            </button>
          </div>
          {resumeUrl && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
              <FileText className="w-6 h-6 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Resume Uploaded Successfully</p>
                <a href={resumeUrl.startsWith('http') ? resumeUrl : '#'} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:underline">Verify Document</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm col-span-1 md:col-span-2 lg:col-span-1">
        <h2 className="font-display text-2xl text-on-surface mb-6">Technical Skill Matrix</h2>
        
        <form onSubmit={handleAddSkill} className="flex gap-2 mb-6 max-w-md">
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
            <div className="text-sm text-on-surface-variant w-full py-4">No skills added yet.</div>
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
