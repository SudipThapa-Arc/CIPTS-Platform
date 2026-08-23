export default function RecruiterLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-3">
          <div className="w-36 h-4 rounded-full shimmer-skeleton" />
          <div className="w-64 h-10 rounded-2xl shimmer-skeleton" />
          <div className="w-48 h-5 rounded-full shimmer-skeleton" />
        </div>
        <div className="w-44 h-11 rounded-xl shimmer-skeleton shrink-0" />
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-panel rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-24 h-3 rounded-full shimmer-skeleton" />
            <div className="w-16 h-8 rounded-lg shimmer-skeleton" />
          </div>
        ))}
      </div>

      {/* Drives Skeleton */}
      <div className="glass-panel rounded-2xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="w-48 h-6 rounded-xl shimmer-skeleton" />
          <div className="w-20 h-4 rounded-full shimmer-skeleton" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 rounded-xl bg-surface-container/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg shimmer-skeleton shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="w-40 h-4 rounded-full shimmer-skeleton" />
                  <div className="w-56 h-3 rounded-full shimmer-skeleton" />
                </div>
              </div>
              <div className="w-24 h-8 rounded-lg shimmer-skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
