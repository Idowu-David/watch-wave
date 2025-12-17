import Link from 'next/link';
import Header from './components/common/Header';
import { PlayCircle, ListVideo, Gauge } from 'lucide-react';


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden">
      {/* 1. Header (Navigation) */}
      <Header />

      {/* 2. Hero Section */}
      <main className="relative z-0 pt-16 pb-24 md:pt-24 md:pb-36 flex items-center justify-center">
        <div className="max-w-4xl text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Your Ultimate <span className="text-red-600">Watchlist</span> Manager
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Stop losing track of great movies and TV shows. Search, plan, rate, and track your entertainment journey effortlessly.
          </p>
          
          {/* Main CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="../components/auth/sign-up" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-red-600 hover:bg-red-700 transition transform hover:scale-[1.02]"
            >
              Start Tracking Now
            </Link>
            <Link 
              href="../components/discover" 
              className="inline-flex items-center justify-center px-8 py-3 border border-neutral-700 text-base font-medium rounded-full text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
            >
              Browse Movies
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-neutral-900 rounded-xl shadow-xl border border-neutral-800">
              <ListVideo className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Organize Lists</h3>
              <p className="text-neutral-400 text-sm">Separate what you've seen from what you want to watch next.</p>
            </div>
            <div className="p-6 bg-neutral-900 rounded-xl shadow-xl border border-neutral-800">
              <PlayCircle className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Rate & Review</h3>
              <p className="text-neutral-400 text-sm">Add personal ratings and private notes to every watched title.</p>
            </div>
            <div className="p-6 bg-neutral-900 rounded-xl shadow-xl border border-neutral-800">
              <Gauge className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Track Stats</h3>
              <p className="text-neutral-400 text-sm">Visualize your viewing habits with genre and rating breakdowns.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Optional: Add a subtle background gradient or texture here for a cinematic look */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-color-neutral-800)_0%,transparent_70%)]"></div>
      </div>

    </div>
  );
}

