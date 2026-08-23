export default function OfficerLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-3">
          <div className="w-80 h-10 rounded-2xl shimmer-skeleton" />
          <div className="w-96 h-5 rounded-full shimmer-skeleton" />
        </div>
        <div className="w-36 h-11 rounded-full shimmer-skeleton shrink-0" />
      </div>

      {/* KPI Bento Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-panel rounded-2xl p-8 space-y-6">
            <div className="w-32 h-4 rounded-full shimmer-skeleton" />
            <div className="w-24 h-12 rounded-xl shimmer-skeleton" />
            <div className="w-full h-3 rounded-full shimmer-skeleton" />
          </div>
        ))}
      </div>

      {/* Charts & Funnel Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 glass-panel rounded-2xl p-8 space-y-6">
          <div className="w-64 h-6 rounded-xl shimmer-skeleton" />
          <div className="w-full h-72 rounded-xl shimmer-skeleton" />
        </div>
        <div className="lg:col-span-4 glass-panel rounded-2xl p-8 space-y-6">
          <div className="w-40 h-6 rounded-xl shimmer-skeleton" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-14 rounded-xl shimmer-skeleton" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
