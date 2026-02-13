export default function SkeletonLoader() {
  return (
    <div className="p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-20 bg-slate-700 rounded-full" />
      </div>

      <div className="h-6 bg-slate-700 rounded w-3/4 mb-3" />
      
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-700 rounded" />
        <div className="h-4 bg-slate-700 rounded w-5/6" />
        <div className="h-4 bg-slate-700 rounded w-4/6" />
      </div>

      <div className="flex gap-2">
        <div className="h-6 w-16 bg-slate-700 rounded" />
        <div className="h-6 w-16 bg-slate-700 rounded" />
        <div className="h-6 w-16 bg-slate-700 rounded" />
      </div>
    </div>
  );
}