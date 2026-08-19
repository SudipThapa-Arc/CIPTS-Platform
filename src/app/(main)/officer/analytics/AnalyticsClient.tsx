'use client';

import { useState } from 'react';
import { Filter, Building, GraduationCap, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

type AnalyticsData = {
  departments: string[];
  departmentStats: Record<string, { total: number, placed: number }>;
  recruiterLeaderboard: { company_name: string, hires: number, avgGpa: number }[];
  salaryTiers: { tier1: number, tier2: number, tier3: number }; // High, Mid, Entry
};

export default function AnalyticsClient({ data }: { data: AnalyticsData }) {
  const [activeDept, setActiveDept] = useState<string>('ALL');

  // Simple mock data for charts since we don't have a charting library installed by default
  // We'll build elegant CSS-based bar charts

  const totalStudents = activeDept === 'ALL' 
    ? Object.values(data.departmentStats).reduce((acc, curr) => acc + curr.total, 0)
    : data.departmentStats[activeDept]?.total || 0;

  const totalPlaced = activeDept === 'ALL'
    ? Object.values(data.departmentStats).reduce((acc, curr) => acc + curr.placed, 0)
    : data.departmentStats[activeDept]?.placed || 0;

  const placementRate = totalStudents > 0 ? Math.round((totalPlaced / totalStudents) * 100) : 0;

  const maxTotal = Math.max(...Object.values(data.departmentStats).map(d => d.total));

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Filter Bar */}
      <div className="bg-surface glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 border border-outline-variant shadow-sm items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-primary" />
          <span className="font-semibold text-on-surface">Department Filter:</span>
          <select 
            value={activeDept}
            onChange={(e) => setActiveDept(e.target.value)}
            className="px-4 py-2 bg-surface-container/50 rounded-xl border border-outline-variant outline-none font-sans text-sm font-medium focus:border-primary"
          >
            <option value="ALL">All Departments (Institutional)</option>
            {data.departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Selected Cohort</div>
            <div className="font-mono text-lg font-bold text-on-surface">{totalStudents}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Placement Rate</div>
            <div className="font-mono text-lg font-bold text-emerald-600">{placementRate}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Department Placement Breakdown */}
        <div className="bg-surface glass-panel p-8 rounded-3xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl"><GraduationCap className="w-5 h-5 text-primary" /></div>
            <h2 className="font-display text-2xl text-on-surface">Department Conversion</h2>
          </div>
          
          <div className="space-y-6">
            {Object.entries(data.departmentStats).map(([dept, stats]) => {
              const rate = stats.total > 0 ? Math.round((stats.placed / stats.total) * 100) : 0;
              const widthPercentage = (stats.total / (maxTotal || 1)) * 100;
              
              return (
                <div key={dept} className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-on-surface">{dept}</span>
                    <span className="text-on-surface-variant">{rate}% Placed ({stats.placed}/{stats.total})</span>
                  </div>
                  <div className="h-3 bg-surface-container rounded-full overflow-hidden flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.placed / (stats.total || 1)) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full relative z-10"
                    />
                    <div className="h-full bg-primary/20 absolute rounded-full" style={{ width: `${widthPercentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compensation Tiers */}
        <div className="bg-surface glass-panel p-8 rounded-3xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-50 rounded-xl"><DollarSign className="w-5 h-5 text-emerald-600" /></div>
            <h2 className="font-display text-2xl text-on-surface">Compensation Tiers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-surface-container/50 p-6 rounded-2xl border border-outline-variant/50 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Entry Level</div>
              <div className="font-display text-4xl text-on-surface">{data.salaryTiers.tier3}</div>
              <div className="text-xs text-on-surface-variant mt-2">{'< $50k / 6 LPA'}</div>
            </div>
            <div className="bg-surface-container/50 p-6 rounded-2xl border border-outline-variant/50 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Mid Range</div>
              <div className="font-display text-4xl text-primary">{data.salaryTiers.tier2}</div>
              <div className="text-xs text-on-surface-variant mt-2">{'$50k - $100k'}</div>
            </div>
            <div className="bg-surface-container/50 p-6 rounded-2xl border border-outline-variant/50 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">High Package</div>
              <div className="font-display text-4xl text-emerald-600">{data.salaryTiers.tier1}</div>
              <div className="text-xs text-on-surface-variant mt-2">{'> $100k / 15 LPA'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Leaderboard */}
      <div className="bg-surface glass-panel rounded-3xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-8 border-b border-outline-variant flex items-center gap-3 bg-surface-container/20">
          <div className="p-3 bg-primary/10 rounded-xl"><Building className="w-5 h-5 text-primary" /></div>
          <h2 className="font-display text-2xl text-on-surface">Recruiter Performance Leaderboard</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-container/30 border-b border-outline-variant text-on-surface-variant font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-5">Rank</th>
                <th className="px-8 py-5">Corporate Partner</th>
                <th className="px-8 py-5">Total Selections</th>
                <th className="px-8 py-5 text-right">Avg Candidate GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {data.recruiterLeaderboard.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-on-surface-variant">
                    No recruiter data available yet.
                  </td>
                </tr>
              ) : (
                data.recruiterLeaderboard.map((recruiter, idx) => (
                  <tr key={idx} className="hover:bg-surface-container/20 transition-colors">
                    <td className="px-8 py-5">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx < 3 ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                        #{idx + 1}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-semibold text-on-surface">{recruiter.company_name}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="font-mono font-bold">{recruiter.hires}</span> Offers
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right font-mono font-semibold text-primary">
                      {recruiter.avgGpa > 0 ? recruiter.avgGpa.toFixed(2) : 'N/A'}
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
