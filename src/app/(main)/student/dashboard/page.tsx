"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function StudentDashboardPage() {
  const scrollVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1, 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1] as const
      }
    })
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-section-gap pb-section-gap flex-grow w-full">
      {/* Header Section */}
      <motion.header 
        className="mb-section-gap flex justify-between items-end"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        variants={scrollVariants}
      >
        <div>
          <h1 className="font-display text-5xl text-on-background mb-4">Good morning, Alex.</h1>
          <p className="font-sans text-lg text-on-surface-variant">Your placement journey at a glance.</p>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-surface-container-lowest shadow-sm">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXbfY62LZQLEulSFeFsooUPmYrSEvojmtj1osEV9dXx5aXyvzooPTDico_1edlsFfNw31_am8UtDCBOpKOPE9OEbqHiLH4BIM7PoBeRUR1oQ5zrSLX5fAjQBE1mjDTAz2bhaARZgvjTzc-uIbaVvwTPId8XWueTL6Ir9kYufvTeLnVj-x7PzBCmwDs6GHKyJfttRQMRf5zcwC9lSHP_8sHvMwyHa-AS0TbNHZBr7Rjc1gdZDHrXHjH2w"
            alt="Student Portrait"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
      </motion.header>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-section-gap">
        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col justify-between"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
        >
          <span className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-2">GPA</span>
          <span className="font-display text-5xl text-primary">3.85</span>
        </motion.div>
        
        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col justify-between"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
        >
          <span className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Placement Status</span>
          <div className="mt-2 w-fit bg-secondary-container/50 px-4 py-2 rounded-full border border-primary/10">
            <span className="font-sans text-[22px] font-semibold text-on-secondary-container">Interviewing</span>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col justify-between"
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
        >
          <span className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Profile Completion</span>
          <div className="flex items-end gap-4 mt-2">
            <span className="font-display text-5xl text-primary">85%</span>
            <div className="h-2 flex-grow bg-surface-variant rounded-full mb-3 overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pipeline and Interviews Bento */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-section-gap">
        {/* Pipeline */}
        <motion.div 
          className="lg:col-span-2 glass-panel rounded-xl p-10"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
        >
          <h2 className="font-display text-3xl text-on-background mb-8">Application Pipeline</h2>
          <div className="relative flex justify-between items-center mt-12 mb-8 before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:right-0 before:h-[2px] before:bg-outline-variant/30 before:-z-10">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center bg-surface-container-lowest px-4">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary-container mb-3 border border-primary/10">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <span className="font-sans text-sm font-semibold text-on-surface-variant">Applied</span>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center bg-surface-container-lowest px-4">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary-container mb-3 border border-primary/10">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <span className="font-sans text-sm font-semibold text-on-surface-variant">Shortlisted</span>
            </div>

            {/* Step 3 Active */}
            <div className="flex flex-col items-center bg-surface-container-lowest px-4">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary mb-3 shadow-[0_0_20px_rgba(79,70,229,0.3)] scale-110">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
              </div>
              <span className="font-sans text-sm font-semibold text-primary-container font-bold">Interviewing</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center bg-surface-container-lowest px-4">
              <div className="w-10 h-10 rounded-full bg-surface/50 border border-outline-variant flex items-center justify-center text-outline mb-3">
                <span className="material-symbols-outlined">handshake</span>
              </div>
              <span className="font-sans text-sm font-semibold text-outline">Offer</span>
            </div>

          </div>
        </motion.div>

        {/* Upcoming Interviews */}
        <motion.div 
          className="lg:col-span-1 glass-panel rounded-xl p-10 flex flex-col"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
        >
          <h2 className="font-display text-3xl text-on-background mb-8">Upcoming</h2>
          <div className="flex flex-col gap-4 flex-grow">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-lg bg-surface/50 border border-outline-variant/30 flex gap-4 items-start hover:bg-surface transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded bg-[#F7F0DE] flex items-center justify-center text-primary shrink-0">
                <span className="font-sans text-[22px] font-semibold">T</span>
              </div>
              <div>
                <h3 className="font-sans text-[22px] font-semibold text-on-background mb-1">TechFlow Corp</h3>
                <p className="font-sans text-base text-on-surface-variant">Final Round • Tomorrow, 10 AM</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
