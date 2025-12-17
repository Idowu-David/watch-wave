"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuthenticated } from "@/app/lib/auth";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    setAuthenticated();
    router.replace("/discover");
  };

  return (    
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
      <header className="absolute top-0 left-0 p-8 z-20">
         <Link href="/">
            <h1 className="text-red-600 text-4xl font-black tracking-tighter uppercase cursor-pointer hover:scale-105 transition">
              Watch-Wave
            </h1>
          </Link>
    </header>
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center hidden md:block opacity-50" 
        style={{ backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-9a10-07d3f044733e/web/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-112.5 bg-black/75 p-16 rounded-md text-white">
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-neutral-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition text-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-neutral-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition text-sm"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded font-bold mt-4"
          >
            Log In
          </button>
        </form>

        <div className="flex justify-between items-center text-xs text-neutral-400 mt-4">
          <div className="flex items-center gap-1">
            <input type="checkbox" className="accent-neutral-500" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="hover:underline">Need help?</a>
        </div>

        <div className="mt-16 text-neutral-500">
          <p className="text-sm">
            New to the app? <Link href="/components/auth/sign-up" className="text-white hover:underline cursor-pointer">Sign up now.</Link>       
         </p>
          <p className="text-xs mt-4">
            This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.
          </p>
        </div>
      </div>
    </div>
  );
}