"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function OfficerDashboardPage() {
  const staggerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1, 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    })
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { family: "'Manrope', sans-serif", size: 12, weight: 'bold' as const }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1a1c1f',
        bodyColor: '#464555',
        borderColor: 'rgba(23, 25, 28, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        titleFont: { family: "'Manrope', sans-serif", size: 14, weight: 'bold' as const },
        bodyFont: { family: "'Manrope', sans-serif", size: 13 }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: { color: 'rgba(70, 69, 85, 0.05)' },
        ticks: { maxTicksLimit: 6 }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    }
  };

  const chartData = {
    labels: ['Computer Science', 'Business', 'Engineering', 'Arts & Humanities', 'Sciences'],
    datasets: [
      {
        label: 'Placed Students',
        data: [420, 380, 310, 180, 162],
        backgroundColor: 'rgba(79, 70, 229, 0.8)', // Primary color approximation
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      },
      {
        label: 'Unplaced Students',
        data: [30, 45, 40, 55, 28],
        backgroundColor: '#e2e2e6', // surface-variant
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      }
    ]
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg mt-stack-lg relative">
      
      {/* Background Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(circle at 15% 50%, rgba(216, 238, 244, 0.4), transparent 40%), radial-gradient(circle at 85% 30%, rgba(255, 248, 233, 0.5), transparent 50%)" }}></div>

      {/* Header Section */}
      <motion.section 
        className="mb-section-gap flex flex-col md:flex-row justify-between items-end gap-stack-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        variants={staggerVariants}
      >
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-6xl text-primary tracking-tight mb-4 leading-tight">Institutional placement overview</h1>
          <p className="font-sans text-lg text-on-surface-variant max-w-xl">
            A comprehensive, real-time view of student success, corporate partnerships, and department-level performance metrics for the current academic year.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="glass-panel text-primary font-sans text-sm font-semibold py-3 px-6 rounded-full hover:bg-white/90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Report
          </button>
        </div>
      </motion.section>

      {/* KPI Bento Grid */}
      <section className="mb-section-gap grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Overall Placement Card */}
        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={staggerVariants}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container rounded-bl-full opacity-20 -z-10 transition-transform group-hover:scale-110"></div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary">trending_up</span>
              <h3 className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Overall Placement</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl text-primary">88%</span>
              <span className="font-sans text-xs font-bold text-secondary bg-secondary-container/30 px-2 py-1 rounded-full">+4% YoY</span>
            </div>
          </div>
          <div className="mt-8">
            <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[88%] relative">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Placed vs Unplaced Card */}
        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={staggerVariants}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary">group</span>
              <h3 className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Student Status</h3>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div>
                <div className="font-sans text-[22px] font-semibold text-on-background">1,452</div>
                <div className="font-sans text-xs font-bold text-outline">Placed</div>
              </div>
              <div className="h-8 w-[1px] bg-outline-variant"></div>
              <div>
                <div className="font-sans text-[22px] font-semibold text-on-surface-variant">198</div>
                <div className="font-sans text-xs font-bold text-outline">Unplaced</div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <div className="flex-grow flex gap-1 h-3">
              <div className="bg-primary w-[88%] rounded-l-full"></div>
              <div className="bg-surface-variant w-[12%] rounded-r-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Active Partners Card */}
        <motion.div 
          className="glass-panel rounded-xl p-8 flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={staggerVariants}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary">handshake</span>
              <h3 className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Active Partners</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl text-primary">500+</span>
            </div>
            <p className="font-sans text-base text-on-surface-variant mt-2">
              Corporate entities actively recruiting this semester.
            </p>
          </div>
          <div className="mt-6 flex -space-x-4 relative">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJlnFVZKAe0Zy6Bd3f28JksCOd05VqxJ4xy6EtqIpwLtdkxRH2em8g57eTQ6ZuHt0XzWlmZ8JAsoXdt6V0HdQ2tfcdOQPTMsAC-lQOd9Dk8glVgQ-YwVZIP1NmBaNpdyHEF_xtjCTjNIG9mQWYICZ-2lmsPI_leL5LuQpcA2MlJWY91QBV_wp152Es_x9_hNPXTbQVxuS-nSfuVtRBsfO9hQ-N3xa1WPz09aeaPhBDpBB2EvDzBlfRLQ" 
              alt="Partner 1" width={40} height={40} className="rounded-full border-2 border-white object-cover shadow-sm relative z-30" 
            />
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATOb4coeY_CbIUhs4pZRx1c2qeXGFHj-3TpYOkbn4AmF2I9gmGTl1nJPayYpaEmPURrY-dOpS4Gs7VUHUIa8AnlSH1RRbKFZxBZRClt3AsyqiQFh-hr0boZGy7yelJ-V4WFRGfXwt5n0U4S2PXxa34_IZNeCpfCP9c_VA8toWDdNAfO00PiaZ4Dcl6eplfGX_r2WWRlCsQblbwSmWLz4sLdLdPdue7o-fT5f-4jbQfmQrjR0oq5rnL1A" 
              alt="Partner 2" width={40} height={40} className="rounded-full border-2 border-white object-cover shadow-sm relative z-20" 
            />
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmK668nWmhnlPm7Zy2eCVaw4VT0E851BtbQlejC6SJx-n26VyJJKNBtRHKnnyFHW8kFYYeqNJLVJ-YR4h_WL9KR7NVWEffCtvyyUWIi8Ag3ZtgcrSzyQWsH_dx4p8V_c7M295cAXDnaw9DzlgB9pAdHDJzcOvlmciQxgbJ1x_SAG7dzXgHolTGcF0ScSgfdSHTyPNzqYwhhGp2TTjbRPgPcCL6JBld6rfJmznEx4thYWwGbkUO761IbQ" 
              alt="Partner 3" width={40} height={40} className="rounded-full border-2 border-white object-cover shadow-sm relative z-10" 
            />
            <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container-low flex items-center justify-center font-sans text-xs font-bold text-secondary z-0 shadow-sm">+</div>
          </div>
        </motion.div>
      </section>

      {/* Charts Section: Asymmetric Layout */}
      <section className="mb-section-gap grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Department Comparison Chart */}
        <motion.div 
          className="lg:col-span-8 glass-panel rounded-xl p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={staggerVariants}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-sans text-[22px] font-semibold text-on-background">Department Placement Comparison</h2>
              <p className="font-sans text-base text-on-surface-variant">Breakdown of offers across major faculties.</p>
            </div>
            <button className="text-primary hover:bg-surface-variant/50 p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="relative h-80 w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div 
          className="lg:col-span-4 glass-panel rounded-xl p-8 flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={staggerVariants}
        >
          <div className="mb-8">
            <h2 className="font-sans text-[22px] font-semibold text-on-background">Conversion Funnel</h2>
            <p className="font-sans text-base text-on-surface-variant">Application to Offer progression.</p>
          </div>
          <div className="flex-grow flex flex-col justify-center gap-6 relative">
            
            {/* Applied */}
            <motion.div whileHover={{ scale: 1.02 }} className="relative z-10 group cursor-pointer">
              <div className="w-full bg-surface-variant rounded-lg p-4 transition-all hover:shadow-md border border-white/40 flex justify-between items-center">
                <span className="font-sans text-sm font-semibold text-on-background">Applied</span>
                <span className="font-sans text-[22px] font-semibold text-primary">3,200</span>
              </div>
            </motion.div>
            
            {/* Interviewing */}
            <motion.div whileHover={{ scale: 1.02 }} className="relative z-10 w-[85%] mx-auto group cursor-pointer">
              <div className="absolute -top-6 left-1/2 w-[1px] h-6 bg-outline-variant"></div>
              <div className="w-full bg-secondary-container/50 rounded-lg p-4 transition-all hover:shadow-md border border-white/40 flex justify-between items-center">
                <span className="font-sans text-sm font-semibold text-on-background">Interviewing</span>
                <span className="font-sans text-[22px] font-semibold text-secondary">2,150</span>
              </div>
            </motion.div>

            {/* Offers */}
            <motion.div whileHover={{ scale: 1.02 }} className="relative z-10 w-[70%] mx-auto group cursor-pointer">
              <div className="absolute -top-6 left-1/2 w-[1px] h-6 bg-outline-variant"></div>
              <div className="w-full bg-primary-fixed-dim/50 rounded-lg p-4 transition-all hover:shadow-md border border-white/40 flex justify-between items-center">
                <span className="font-sans text-sm font-semibold text-on-background">Offers Extended</span>
                <span className="font-sans text-[22px] font-semibold text-primary-container">1,600</span>
              </div>
            </motion.div>

            {/* Accepted */}
            <motion.div whileHover={{ scale: 1.02 }} className="relative z-10 w-[55%] mx-auto group cursor-pointer">
              <div className="absolute -top-6 left-1/2 w-[1px] h-6 bg-outline-variant"></div>
              <div className="w-full bg-primary text-on-primary rounded-lg p-4 transition-all hover:shadow-lg shadow-[0_10px_20px_rgba(79,70,229,0.2)] flex justify-between items-center">
                <span className="font-sans text-sm font-semibold">Accepted</span>
                <span className="font-sans text-[22px] font-semibold">1,452</span>
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      </section>
    </main>
  );
}
