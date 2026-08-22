'use client';

import { useState } from 'react';
import { createJob } from '@/app/actions/recruiterJobs';
import { Loader2, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ALL_DEPARTMENTS = ['CS', 'IT', 'ECE', 'EE', 'Mechanical', 'Civil', 'Chemical', 'Business'];

export default function JobCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedDepts, setSelectedDepts] = useState<string[]>(['CS', 'IT']);
  const [gpa, setGpa] = useState<number>(3.0);

  const toggleDept = (dept: string) => {
    if (selectedDepts.includes(dept)) {
      setSelectedDepts(selectedDepts.filter(d => d !== dept));
    } else {
      setSelectedDepts([...selectedDepts, dept]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDepts.length === 0) {
      setError('Please select at least one eligible department.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append('eligible_departments', selectedDepts.join(','));
    
    const result = await createJob(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
    // Note: Success redirects, so we don't need to unset isSubmitting on success
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 font-sans text-sm font-medium">
          {error}
        </div>
      )}

      {/* Core Details */}
      <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm space-y-6">
        <h2 className="font-display text-2xl text-on-surface mb-2">Role Specifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="role_title" className="block text-sm font-semibold text-on-surface-variant">Role Title</label>
            <input 
              required
              type="text" 
              name="role_title" 
              id="role_title" 
              placeholder="e.g. Software Engineering Intern"
              className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="vacancies" className="block text-sm font-semibold text-on-surface-variant">Number of Vacancies</label>
            <input 
              required
              type="number" 
              name="vacancies" 
              id="vacancies" 
              min="1"
              defaultValue="1"
              className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="salary_package" className="block text-sm font-semibold text-on-surface-variant">Compensation Package</label>
            <input 
              required
              type="text" 
              name="salary_package" 
              id="salary_package" 
              placeholder="e.g. $15,000/yr or 12 LPA"
              className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="application_deadline" className="block text-sm font-semibold text-on-surface-variant">Application Deadline</label>
            <input 
              required
              type="date" 
              name="application_deadline" 
              id="application_deadline" 
              className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <label htmlFor="job_description" className="block text-sm font-semibold text-on-surface-variant">Detailed Job Description</label>
          <textarea 
            required
            name="job_description" 
            id="job_description" 
            rows={6}
            placeholder="Describe the role, responsibilities, and ideal candidate profile..."
            className="w-full px-4 py-3 bg-surface-container rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm transition-colors resize-y"
          ></textarea>
        </div>
      </div>

      {/* Eligibility Automation */}
      <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm space-y-6">
        <h2 className="font-display text-2xl text-on-surface mb-2">Automated Eligibility Ruleset</h2>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="min_gpa_req" className="block text-sm font-semibold text-on-surface-variant">Minimum Cumulative GPA</label>
              <span className="font-mono font-bold text-lg text-primary">{gpa.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              name="min_gpa_req" 
              id="min_gpa_req" 
              min="0" 
              max="4.0" 
              step="0.1" 
              value={gpa}
              onChange={(e) => setGpa(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-xs text-on-surface-variant">Students with a GPA below this threshold will be automatically prevented from applying.</p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-on-surface-variant">Eligible Academic Departments</label>
            <div className="flex flex-wrap gap-3">
              {ALL_DEPARTMENTS.map(dept => {
                const isSelected = selectedDepts.includes(dept);
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => toggleDept(dept)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      isSelected 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-surface-container text-on-surface-variant border border-outline-variant hover:border-primary/50'
                    }`}
                  >
                    {dept} {isSelected ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          {isSubmitting ? 'Publishing...' : 'Publish Recruitment Drive'}
        </motion.button>
      </div>

    </form>
  );
}
