"use client";

import Image from "next/image";
import Link from "next/link";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function OfficerDashboardClient() {
  const staggerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
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
          font: { family: "Manrope, sans-serif", size: 12, weight: 'bold' as const },
        },
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
        titleFont: { family: "Manrope, sans-serif", size: 14, weight: 'bold' as const },
        bodyFont: { family: "Manrope, sans-serif", size: 13 },
      },
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: { color: 'rgba(70, 69, 85, 0.05)' },
        ticks: { maxTicksLimit: 6 },
      },
    },
    interaction: { mode: 'index' as const, intersect: false },
  };

  const chartData = {
    labels: ['Computer Science', 'Business', 'Engineering', 'Arts & Humanities', 'Sciences'],
    datasets: [
      {
        label: 'Placed Students',
        data: [420, 380, 310, 180, 162],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
      {
        label: 'Unplaced Students',
        data: [30, 45, 40, 55, 28],
        backgroundColor: '#e2e2e6',
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };

  const funnelSteps = [
    { label: 'Applied', value: '3,200', width: '100%', bg: 'bg-surface-variant', text: 'text-primary' },
    { label: 'Interviewing', value: '2,150', width: '85%', bg: 'bg-secondary-container/50', text: 'text-secondary' },
    { label: 'Offers Extended', value: '1,600', width: '70%', bg: 'bg-primary-container/20', text: 'text-primary' },
    { label: 'Accepted', value: '1,452', width: '55%', bg: 'bg-primary', text: 'text-on-primary', accent: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(circle at 15% 50%, rgba(216, 238, 244, 0.4), transparent 40%), radial-gradient(circle at 85% 30%, rgba(255, 248, 233, 0.5), transparent 50%)" }} />

      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
        initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={staggerVariants}
      >
        <div className="max-w-2xl">
          <p className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Command Center</p>
          <h1 className="font-display text-4xl md:text-5xl text-on-surface leading-tight mb-2">Institutional Overview</h1>
          <p className="font-sans text-lg text-on-surface-variant">
            Real-time placement metrics, department analytics, and compliance data.
          </p>
        </div>
        <Link
          href="/officer/reports"
          className="flex items-center gap-2 bg-primary text-on-primary font-sans text-sm font-semibold px-5 py-3 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export Report
        </Link>
      </motion.div>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Overall Placement', value: '88%', sub: '+4% YoY', icon: 'trending_up', color: 'text-secondary', bar: true },
          { label: 'Students Placed', value: '1,452', sub: '198 still seeking', icon: 'group', color: 'text-secondary', bar: false },
          { label: 'Active Partners', value: '500+', sub: 'This semester', icon: 'handshake', color: 'text-secondary', bar: false },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            className="glass-panel rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group"
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1} variants={staggerVariants}
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-secondary-container rounded-bl-full opacity-15 -z-10 group-hover:scale-110 transition-transform" />
            <div className="flex items-center gap-2 mb-4">
              <span className={`material-symbols-outlined ${kpi.color}`}>{kpi.icon}</span>
              <h3 className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">{kpi.label}</h3>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl text-primary">{kpi.value}</span>
              <span className="font-sans text-xs font-bold text-secondary bg-secondary-container px-2 py-1 rounded-full">{kpi.sub}</span>
            </div>
            {kpi.bar && (
              <div className="mt-6 h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[88%]">
                  <div className="h-full bg-white/20 animate-pulse" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div
          className="lg:col-span-8 glass-panel rounded-2xl p-8"
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={staggerVariants}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-display text-2xl text-on-surface">Department Placement Comparison</h2>
              <p className="font-sans text-sm text-on-surface-variant mt-1">Offers extended across academic faculties.</p>
            </div>
            <Link href="/officer/analytics" className="text-primary hover:bg-surface-variant/50 p-2 rounded-full transition-all active:scale-90">
              <span className="material-symbols-outlined">open_in_new</span>
            </Link>
          </div>
          <div className="relative h-80 w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-4 glass-panel rounded-2xl p-8 flex flex-col"
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={staggerVariants}
        >
          <div className="mb-6">
            <h2 className="font-display text-2xl text-on-surface">Conversion Funnel</h2>
            <p className="font-sans text-sm text-on-surface-variant mt-1">Application to offer progression.</p>
          </div>
          <div className="flex-grow flex flex-col justify-center gap-5">
            {funnelSteps.map((step, i) => (
              <motion.div
                key={step.label}
                whileHover={{ scale: 1.02 }}
                className="relative"
                style={{ width: step.width, marginLeft: i > 0 ? 'auto' : undefined, marginRight: i > 0 ? 'auto' : undefined }}
              >
                {i > 0 && <div className="absolute -top-5 left-1/2 w-[1px] h-5 bg-outline-variant" />}
                <div className={`w-full ${step.bg} ${step.accent ? 'shadow-[0_10px_20px_rgba(79,70,229,0.2)]' : ''} rounded-xl p-4 flex justify-between items-center border border-white/30 transition-all hover:shadow-md`}>
                  <span className={`font-sans text-sm font-semibold ${step.accent ? 'text-on-primary' : 'text-on-surface'}`}>{step.label}</span>
                  <span className={`font-sans text-xl font-bold ${step.accent ? 'text-on-primary' : step.text}`}>{step.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quick Navigation */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: '/officer/students', icon: 'people', label: 'Student Directory', desc: 'Search & manage student records' },
          { href: '/officer/analytics', icon: 'analytics', label: 'Full Analytics', desc: 'Detailed department breakdowns' },
          { href: '/officer/settings', icon: 'settings', label: 'Settings & Logs', desc: 'Audit trail & compliance' },
        ].map(card => (
          <Link key={card.href} href={card.href} className="glass-panel rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
            </div>
            <div>
              <p className="font-sans font-semibold text-on-surface text-sm">{card.label}</p>
              <p className="font-sans text-xs text-on-surface-variant">{card.desc}</p>
            </div>
            <span className="material-symbols-outlined text-outline ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
