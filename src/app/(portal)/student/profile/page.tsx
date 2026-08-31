import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { User, Hash, BookOpen, GraduationCap, TrendingUp, ShieldCheck } from 'lucide-react';
import ProfileEditor from './ProfileEditor';

export default async function StudentProfilePage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect('/auth/login');
  }

  // Fetch the student profile
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('user_id', authData.user.id)
    .single();

  if (!student) {
    return <div>Error loading student profile.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl text-on-surface mb-2">Career Portfolio</h1>
          <p className="text-on-surface-variant font-sans text-lg">
            Manage your academic records, resume, and skills.
          </p>
        </div>
      </div>

      {/* Verified Academic Records */}
      <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ShieldCheck className="w-40 h-40" />
        </div>
        
        <div className="relative z-10 flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl text-on-surface flex items-center gap-3">
            Verified Academic Records
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-sans font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Institution Verified
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <div className="bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm"><User className="w-5 h-5 text-primary" /></div>
            <div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Legal Name</div>
              <div className="font-sans font-medium text-lg">{student.full_name}</div>
            </div>
          </div>
          
          <div className="bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm"><Hash className="w-5 h-5 text-primary" /></div>
            <div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Roll Number</div>
              <div className="font-mono font-medium text-lg">{student.roll_number}</div>
            </div>
          </div>

          <div className="bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm"><BookOpen className="w-5 h-5 text-primary" /></div>
            <div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Department</div>
              <div className="font-sans font-medium text-lg">{student.department}</div>
            </div>
          </div>

          <div className="bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm"><TrendingUp className="w-5 h-5 text-emerald-600" /></div>
            <div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Cumulative GPA</div>
              <div className="font-mono font-medium text-lg text-emerald-700">{(student.gpa ?? 0).toFixed(2)}</div>
            </div>
          </div>

          <div className="bg-surface-container/50 p-5 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm"><GraduationCap className="w-5 h-5 text-primary" /></div>
            <div>
              <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Graduation Class</div>
              <div className="font-mono font-medium text-lg">{student.graduation_year}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Sections (Client Component) */}
      <ProfileEditor 
        studentId={student.student_id} 
        initialSkills={student.skills || []} 
        initialResume={student.resume_url} 
      />

    </div>
  );
}
