"use client";

import { useRouter } from "next/navigation";
import { setAuthenticated } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  
  // State for all fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logic to save the user data would go here
    console.log("User Data:", formData);
    
    setAuthenticated();
    router.replace("/components/discover");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-10">
      <header className="absolute top-0 left-0 p-8 z-20">
         <Link href="/">
            <h1 className="text-red-600 text-4xl font-black tracking-tighter uppercase cursor-pointer hover:scale-105 transition">
              Watch-Wave
            </h1>
          </Link>
    </header>
      <div className="w-full max-w-[450px] bg-neutral-900/40 p-10 rounded-lg border border-neutral-800 shadow-2xl">
        
        <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Row */}
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 p-4 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 p-4 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              required
            />
          </div>

          {/* Age Field */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-4 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />

          {/* Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />

          {/* Password Field */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded mt-4 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-neutral-500 text-sm">
            Already a member?{" "}
            <button 
              onClick={() => router.push("../auth/login")} 
              className="text-white hover:underline font-medium"
            >
              Log In
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}