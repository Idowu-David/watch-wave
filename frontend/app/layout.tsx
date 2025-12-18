import './global.css'; // Import the Tailwind base styles
import type { Metadata } from 'next';
import { WatchlistProvider } from '../app/components/context/WatchlistContext';

// 1. Define Metadata for SEO
export const metadata: Metadata = {
  title: 'Watch-Wave | Watchlist Pro',
  description: 'Your personal movie and TV show tracker.',
};

// 2. Define the Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#141414]">
      <body className="min-h-screen">
        {/* Wrap children with the WatchlistProvider so all pages can access the list */}
        <WatchlistProvider>
          <header>{/* Navbar can go here later */}</header>
          
          {/* Changed 'container mx-auto p-4' to 'w-full' 
            This ensures your Sidebar and Dashboard fill the whole screen.
          */}
          <main className="w-full min-h-screen">
            {children}
          </main>
          
          <footer>{/* Optional: Simple footer */}</footer>
        </WatchlistProvider>
      </body>
    </html>
  );
}