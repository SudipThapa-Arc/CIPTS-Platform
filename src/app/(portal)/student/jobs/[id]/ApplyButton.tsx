'use client';

import { useState } from 'react';
import { submitApplication } from '@/app/actions/applications';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ApplyButton({ 
  jobId, 
  studentId, 
  isEligible, 
  hasApplied 
}: { 
  jobId: string; 
  studentId: string; 
  isEligible: boolean;
  hasApplied: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    if (!isEligible || hasApplied || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const result = await submitApplication(jobId, studentId);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      setSuccess(true);
      setIsSubmitting(false);
    }
  };

  if (hasApplied || success) {
    return (
      <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-center gap-3 text-emerald-800 font-sans font-medium animate-in fade-in zoom-in duration-300">
        <CheckCircle className="w-5 h-5" />
        Application Submitted Successfully
      </div>
    );
  }

  if (!isEligible) {
    return (
      <div className="w-full bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-red-800 font-sans animate-in fade-in">
        <span className="font-semibold text-center">Eligibility Requirement Not Met</span>
        <span className="text-sm text-center">Your current GPA or Department does not meet the minimum requirements for this role.</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleApply}
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-primary text-white font-sans font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
      </motion.button>
      {error && (
        <p className="mt-3 text-sm text-red-600 text-center font-medium animate-in fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
