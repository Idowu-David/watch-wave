// // app/(auth)/register/page.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";

// export default function SignUpPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     age: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Set auth
//     document.cookie = "isLoggedIn=true; path=/; max-age=86400";
//     localStorage.setItem("isLoggedIn", "true");
//     login({ name: "User" });

//     router.replace("/dashboard");
//   };

//   return (
//     <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
//       <div
//         className="absolute inset-0 bg-cover bg-center hidden md:block opacity-40"
//         style={{
//           backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-9a10-07d3f044733e/web/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
//         }}
//       />
//       <div className="absolute inset-0 bg-black/70" />
//       <div className="relative z-10 w-full max-w-[450px] bg-black/80 p-12 rounded-md text-white border border-white/5 shadow-2xl">
//         <h1 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Create Account</h1>
//         <form onSubmit={handleSignup} className="space-y-4">
//           <div className="flex gap-4">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-1/2 p-4 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition text-sm"
//               required
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-1/2 p-4 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition text-sm"
//               required
//             />
//           </div>
//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             min="1"
//             max="120"
//             value={formData.age}
//             onChange={handleChange}
//             className="w-full p-4 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition text-sm"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-4 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition text-sm"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-4 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition text-sm"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-[#E50914] hover:bg-[#b20710] text-white font-bold py-4 rounded mt-4 transition duration-200 uppercase tracking-widest text-sm shadow-lg shadow-red-900/30"
//           >
//             Sign Up
//           </button>
//         </form>
//         <div className="mt-8 text-center">
//           <p className="text-neutral-500 text-sm">
//             Already a member?{" "}
//             <Link href="/login" className="text-white hover:underline font-bold">
//               Log In
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setAuthenticated } from "../../../lib/auth"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";




const signUpSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch(
        "https://watch-wave-5es6.onrender.com/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        setAuthenticated();
        router.replace("/discover");
      } else {
        alert(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Connection to server failed.");
    }
  };

  return (
    
    
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block opacity-40"
        style={{
          backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-9a10-07d3f044733e/web/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 w-full max-w-[450px] bg-black/80 p-12 rounded-md text-white border border-white/5 shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Create Account</h1>
    
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME ROW */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="w-full p-4 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="w-full p-4 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* USERNAME */}
          <div>
            <input
              {...register("username")}
              placeholder="Username"
              className="w-full p-4 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full p-4 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          
          {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className="w-full p-4 pr-12 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {/* ICON TOGGLE */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded mt-4 transition"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center">
          <p className="text-neutral-500 text-sm">
            Already a member?{" "}
            <button
              onClick={() => router.push("/auth/login")}
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
