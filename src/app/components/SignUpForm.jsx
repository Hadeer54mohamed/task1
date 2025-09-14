"use client";

import React from "react";
import SocialLoginButtons from "./SocialLoginButtons";

export default function SignUpForm({ handleChange, formData, handleSubmit, loading, error }) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-2">Hello, Friend!</h1>
      <p className="mb-4 text-gray-600">
        Enter your personal details and start your journey with us
      </p>

      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        required
        className="border p-2 rounded"
        value={formData.fullname}
        onChange={handleChange}
      />
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
          loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Signing up..." : "Sign Up"}
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
