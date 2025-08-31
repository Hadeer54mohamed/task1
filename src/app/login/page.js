"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/dashboard"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/images/ENSd.png"
            alt="ENS"
            className="w-16 h-16 mb-2"
          />
          <h1 className="text-3xl font-bold mb-1 text-gray-800">Login</h1>
          <p className="text-gray-600">Log in to your account</p>
        </div>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-gray-700">
            Username or Email
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="rounded-md border border-gray-300 w-full py-2.5 px-4 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            className="rounded-md border border-gray-300 w-full py-2.5 px-4 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4 hover:bg-blue-600 transition"
        >
          Login
        </button>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 rounded-lg mb-4 hover:bg-red-600 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition"
        >
          <img
            src="https://www.svgrepo.com/show/512317/github-142.svg"
            alt="GitHub"
            className="w-5 h-5"
          />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
