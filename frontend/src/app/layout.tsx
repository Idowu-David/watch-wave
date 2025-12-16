// src/app/layout.tsx
import './global.css'; // Import the Tailwind base styles
import type { Metadata } from 'next';

// 1. Define Metadata for SEO
export const metadata: Metadata = {
  title: 'Watchlist Pro',
  description: 'Your personal movie and TV show tracker.',
};

// 2. Define the Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header>{/* Leader: Place the <NavBar /> component here later */}</header>
        <main className="container mx-auto p-4">{children}</main>
        <footer>{/* Optional: Simple footer */}</footer>
      </body>
    </html>
  );
}