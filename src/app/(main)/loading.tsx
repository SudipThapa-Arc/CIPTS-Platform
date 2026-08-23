export default function MainLoading() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] w-full px-5">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <span className="font-display text-primary text-sm font-bold absolute">C</span>
        </div>
        <p className="font-sans text-sm font-semibold text-on-surface-variant animate-pulse">Loading CIPTS...</p>
      </div>
    </div>
  );
}
