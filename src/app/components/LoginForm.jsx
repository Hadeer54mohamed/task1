"use client";

import React from "react";
import SocialLoginButtons from "./SocialLoginButtons";

export default function LoginForm({ handleChange, formData, handleSubmit }) {
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


      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2"
      >
        Log In
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
