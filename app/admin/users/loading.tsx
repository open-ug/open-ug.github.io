export default function LoadingUsers() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-28 bg-slate-200" />
      <div className="mt-4 h-10 w-52 bg-slate-200" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-32 border border-slate-200 bg-white" />)}
      </div>
      <div className="mt-8 h-72 border border-slate-200 bg-white" />
    </div>
  );
}
