export default function StudentLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-3">
          <div className="w-32 h-4 rounded-full shimmer-skeleton" />
          <div className="w-64 h-10 rounded-2xl shimmer-skeleton" />
          <div className="w-80 h-5 rounded-full shimmer-skeleton" />
        </div>
        <div className="flex gap-3">
          <div className="w-32 h-10 rounded-xl shimmer-skeleton" />
          <div className="w-24 h-10 rounded-xl shimmer-skeleton" />
        </div>
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-panel rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-20 h-3 rounded-full shimmer-skeleton" />
            <div className="w-28 h-10 rounded-xl shimmer-skeleton" />
          </div>
        ))}
      </div>

      {/* Application Pipeline Skeleton */}
      <div className="glass-panel rounded-2xl p-8 space-y-8">
        <div className="w-48 h-6 rounded-xl shimmer-skeleton" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full shimmer-skeleton" />
              <div className="w-16 h-3 rounded-full shimmer-skeleton" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-panel rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl shimmer-skeleton shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="w-24 h-4 rounded-full shimmer-skeleton" />
              <div className="w-36 h-3 rounded-full shimmer-skeleton" />
            </div>
          </div>
        ))}
      </div>

      {/* Academic Details Skeleton */}
      <div className="glass-panel rounded-2xl p-8 space-y-6">
        <div className="w-40 h-6 rounded-xl shimmer-skeleton" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="w-20 h-3 rounded-full shimmer-skeleton" />
              <div className="w-32 h-5 rounded-lg shimmer-skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
