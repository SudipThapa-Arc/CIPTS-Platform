"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ActivityLogPage() {
  const timelineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex-grow w-full">
      {/* Header Section */}
      <motion.div 
        className="mb-16 md:w-2/3"
        initial="hidden"
        animate="visible"
        variants={timelineVariants}
      >
        <h1 className="font-display text-5xl md:text-6xl text-primary mb-4">Activity Log</h1>
        <p className="font-sans text-lg text-on-surface-variant">
          A chronological record of your placement journey, application milestones, and professional updates.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Timeline Container */}
        <div className="lg:col-span-8 space-y-8 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-primary/20">
          
          {/* Event 1 */}
          <motion.div 
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={timelineVariants}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full glass-panel border-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(79,70,229,0.2)] z-10 bg-white">
              <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                event_available
              </span>
            </div>
            {/* Content Card */}
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] glass-panel rounded-2xl p-6 hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-xs font-bold text-primary uppercase tracking-wider">Today, 2:30 PM</span>
                <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed font-sans text-xs font-bold rounded-full">Interview</span>
              </div>
              <h3 className="font-sans text-[22px] font-semibold mb-2 text-on-surface leading-tight">Interview Scheduled</h3>
              <p className="font-sans text-base text-on-surface-variant">
                Your first-round technical interview with Global Data Inc. has been confirmed. Check your email for meeting details.
              </p>
            </div>
          </motion.div>

          {/* Event 2 */}
          <motion.div 
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={timelineVariants}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full glass-panel shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 bg-white">
              <span className="material-symbols-outlined text-secondary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                verified_user
              </span>
            </div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] glass-panel rounded-2xl p-6 hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">Yesterday, 10:15 AM</span>
                <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-sans text-xs font-bold rounded-full">Profile</span>
              </div>
              <h3 className="font-sans text-[22px] font-semibold mb-2 text-on-surface leading-tight">Profile Verified</h3>
              <p className="font-sans text-base text-on-surface-variant">
                The Placement Office has reviewed and verified your academic credentials and standard profile information.
              </p>
            </div>
          </motion.div>

          {/* Event 3 */}
          <motion.div 
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={timelineVariants}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full glass-panel shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 bg-white">
              <span className="material-symbols-outlined text-secondary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                description
              </span>
            </div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] glass-panel rounded-2xl p-6 hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">Oct 24, 4:00 PM</span>
                <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-sans text-xs font-bold rounded-full">Document</span>
              </div>
              <h3 className="font-sans text-[22px] font-semibold mb-2 text-on-surface leading-tight">Updated Resume</h3>
              <p className="font-sans text-base text-on-surface-variant">
                You uploaded a new version of your resume: 'J_Doe_Resume_V3_Tech.pdf'.
              </p>
            </div>
          </motion.div>

          {/* Event 4 */}
          <motion.div 
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={timelineVariants}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full glass-panel shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 bg-white">
              <span className="material-symbols-outlined text-secondary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                send
              </span>
            </div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] glass-panel rounded-2xl p-6 hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">Oct 20, 9:00 AM</span>
                <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-sans text-xs font-bold rounded-full">Application</span>
              </div>
              <h3 className="font-sans text-[22px] font-semibold mb-2 text-on-surface leading-tight">Applied to TechFlow</h3>
              <p className="font-sans text-base text-on-surface-variant">
                Successfully submitted application for the Software Intern role at TechFlow.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Sidebar / Callout */}
        <motion.div 
          className="lg:col-span-4 mt-16 lg:mt-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={timelineVariants}
        >
          <div className="glass-panel rounded-3xl p-8 sticky top-32">
            <h4 className="font-display text-3xl text-primary mb-6">Career Insights</h4>
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 relative group">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6l66hf7k9q6nURQr5-ptUt77ddoFgBzBQTMmHr94E3qB8mAEy39-ywXMMINzuvz03WsiZUgz6BkGUyNgBj_2BcceJ1OazRYsQwbaoiPQ4QgRAIM7kReMn-QZI52layzNgk9klXoMams75_ryfgfm07HjmGpUVFiCxFU3MNcR2n9nXjQRioKKr03CxnlrIXbTvtU1LkPW8r1PiSLz16aXG9ncBXTBCWxaBbD1Lve0Bj7YV9hPzkoJx6Q"
                alt="Students collaborating"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <p className="font-sans text-base text-on-surface-variant mb-6">
              Students who actively update their profiles and apply early see a 40% increase in interview requests. Keep the momentum going.
            </p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white/20 border border-primary/20 text-primary font-sans text-sm font-semibold rounded-full hover:bg-white/40 transition-colors"
            >
              Browse New Opportunities
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
