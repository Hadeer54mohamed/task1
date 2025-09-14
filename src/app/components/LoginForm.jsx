"use client";

import React from "react";
import SocialLoginButtons from "./SocialLoginButtons";

export default function LoginForm({ handleChange, formData, handleSubmit, loading, error }) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
      <p className="mb-4 text-gray-600">
        To keep connected with us please login with your personal info
      </p>

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="border p-2 rounded"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="border p-2 rounded"
        value={formData.password}
        onChange={handleChange}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`text-white p-2 rounded mt-2 ${
          loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <SocialLoginButtons />
      </form>
  );
}
