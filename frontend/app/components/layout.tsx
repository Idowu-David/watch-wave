import Sidebar from "./common/sidebar";

export default function DiscoverPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">Discover</h1>
        {/* movie rows go here */}
      </main>
    </div>
  );
}
