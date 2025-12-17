export default function DashboardPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-zinc-400 mb-8">
        Welcome back. Here’s your activity and progress.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Watchlist" value="12" />
        <StatCard title="Completed" value="34" />
        <StatCard title="In Progress" value="5" />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
