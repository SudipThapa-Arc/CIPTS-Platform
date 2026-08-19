"use client";

import { motion } from "framer-motion";

export default function RecruiterDashboardPage() {
  const staggerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  return (
    <main className="flex-grow flex flex-col items-center px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
      {/* Header Section */}
      <motion.section 
        className="w-full max-w-container-max mb-section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        variants={staggerVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-stack-lg">
          <div>
            <h1 className="font-display text-5xl md:text-6xl text-primary mb-stack-sm">Recruitment command center</h1>
            <p className="font-sans text-lg text-on-surface-variant max-w-2xl">
              Manage your active pipeline, review incoming candidates, and orchestrate interview schedules across all ongoing drives.
            </p>
          </div>
          <div className="flex gap-stack-md">
            <button className="bg-surface/20 backdrop-blur-md border border-primary text-primary hover:bg-surface/40 hover:scale-[0.98] transition-all rounded-full px-6 py-3 font-sans text-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>add</span>
              New Posting
            </button>
          </div>
        </div>
      </motion.section>

      {/* Metrics Grid */}
      <section className="w-full max-w-container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-section-gap">
        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col gap-stack-sm"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-sans text-sm font-semibold uppercase tracking-wider">Active Postings</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
          </div>
          <span className="font-display text-5xl text-on-background">12</span>
          <div className="flex items-center gap-2 text-primary font-sans text-xs font-bold">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+2 this week</span>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col gap-stack-sm"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-sans text-sm font-semibold uppercase tracking-wider">Candidates Received</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
          </div>
          <span className="font-display text-5xl text-on-background">487</span>
          <div className="flex items-center gap-2 text-primary font-sans text-xs font-bold">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+45 today</span>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col gap-stack-sm"
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-sans text-sm font-semibold uppercase tracking-wider">Interview Pipeline</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
          </div>
          <span className="font-display text-5xl text-on-background">64</span>
          <div className="flex items-center gap-2 text-on-surface-variant font-sans text-xs font-bold">
            <span>18 scheduled this week</span>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col gap-stack-sm"
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-sans text-sm font-semibold uppercase tracking-wider">Confirmed Selections</span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
          </div>
          <span className="font-display text-5xl text-on-background">24</span>
          <div className="flex items-center gap-2 text-on-surface-variant font-sans text-xs font-bold">
            <span>Across 3 active drives</span>
          </div>
        </motion.div>
      </section>

      {/* Main Content Area: Bento Layout */}
      <section className="w-full max-w-container-max grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-section-gap">
        {/* Active Recruitment Drives */}
        <motion.div 
          className="lg:col-span-2 glass-panel rounded-xl p-8 flex flex-col gap-stack-md"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <div className="flex justify-between items-center mb-stack-sm border-b border-outline-variant/30 pb-4">
            <h2 className="font-display text-[32px] text-primary leading-tight">Active Recruitment Drives</h2>
            <button className="font-sans text-sm font-semibold text-primary hover:underline">View All</button>
          </div>
          <div className="flex flex-col gap-stack-md">
            
            {/* Drive Item 1 */}
            <div className="flex flex-col md:flex-row gap-gutter justify-between items-start md:items-center p-4 hover:bg-surface-variant/20 rounded-lg transition-colors border border-transparent hover:border-outline-variant/20">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">business_center</span>
                </div>
                <div>
                  <h3 className="font-sans text-[22px] font-semibold text-on-background leading-tight">Software Engineering Cohort 2024</h3>
                  <p className="font-sans text-base text-on-surface-variant">Tech &amp; Product Division</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="bg-secondary-container text-on-secondary-container rounded-full px-3 py-1 inline-flex items-center gap-1 font-sans text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">radio_button_checked</span> Active
                </span>
                <div className="text-right">
                  <p className="font-sans text-sm font-semibold text-on-background">145 Candidates</p>
                  <p className="font-sans text-xs font-bold text-on-surface-variant">Phase: Technical Screening</p>
                </div>
                <button className="material-symbols-outlined text-primary hover:text-primary-fixed-variant transition-colors">chevron_right</button>
              </div>
            </div>

            {/* Drive Item 2 */}
            <div className="flex flex-col md:flex-row gap-gutter justify-between items-start md:items-center p-4 hover:bg-surface-variant/20 rounded-lg transition-colors border border-transparent hover:border-outline-variant/20">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <h3 className="font-sans text-[22px] font-semibold text-on-background leading-tight">Data Analytics Summer Internship</h3>
                  <p className="font-sans text-base text-on-surface-variant">Analytics Division</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed rounded-full px-3 py-1 inline-flex items-center gap-1 font-sans text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">pending_actions</span> Sourcing
                </span>
                <div className="text-right">
                  <p className="font-sans text-sm font-semibold text-on-background">82 Candidates</p>
                  <p className="font-sans text-xs font-bold text-on-surface-variant">Phase: Initial Review</p>
                </div>
                <button className="material-symbols-outlined text-primary hover:text-primary-fixed-variant transition-colors">chevron_right</button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Deadline Alerts */}
        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col gap-stack-md bg-surface-bright/90"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerVariants}
        >
          <div className="flex justify-between items-center mb-stack-sm border-b border-outline-variant/30 pb-4">
            <h2 className="font-sans text-[22px] font-semibold text-error flex items-center gap-2 leading-tight">
              <span className="material-symbols-outlined">warning</span> Action Required
            </h2>
          </div>
          <div className="flex flex-col gap-stack-sm overflow-y-auto max-h-[400px] pr-2">
            
            {/* Alert 1 */}
            <div className="p-4 rounded-lg bg-error-container/20 border border-error/20 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-sans text-xs font-bold text-error uppercase tracking-wider">Due Today</span>
                <span className="material-symbols-outlined text-error text-sm">timer</span>
              </div>
              <h4 className="font-sans text-sm font-semibold text-on-background">Finalize Interview Panel</h4>
              <p className="font-sans text-xs text-on-surface-variant">Software Eng Cohort 2024</p>
              <button className="font-sans text-xs font-bold text-primary text-left mt-2 hover:underline">Review Panelists</button>
            </div>

            {/* Alert 2 */}
            <div className="p-4 rounded-lg bg-surface-variant/30 border border-outline-variant/30 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tomorrow</span>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">event</span>
              </div>
              <h4 className="font-sans text-sm font-semibold text-on-background">Approve Offer Letters</h4>
              <p className="font-sans text-xs text-on-surface-variant">Marketing Associate Program (3 pending)</p>
              <button className="font-sans text-xs font-bold text-primary text-left mt-2 hover:underline">Review Offers</button>
            </div>

          </div>
        </motion.div>
      </section>
    </main>
  );
}
