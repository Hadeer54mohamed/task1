"use client";

import React from "react";
import { signIn } from "next-auth/react";

const SocialLoginButtons = () => {
  const [loadingProvider, setLoadingProvider] = React.useState("");

  const handleOAuth = async (provider) => {
    try {
      setLoadingProvider(provider);
      await signIn(provider, { callbackUrl: "/verify-otp" });
    } finally {
      setLoadingProvider("");
    }
  };

  const isGoogleLoading = loadingProvider === "google";
  const isGithubLoading = loadingProvider === "github";

  return (
    <div className="w-full">
       <button
        onClick={() => handleOAuth("google")}
        disabled={isGoogleLoading}
        className={`w-full flex items-center justify-center gap-3 text-white py-3 rounded-lg mb-4 transition ${
          isGoogleLoading ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
        }`}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className={`w-5 h-5 ${isGoogleLoading ? "opacity-70" : ""}`}
        />
        {isGoogleLoading ? "Connecting..." : "Sign in with Google"}
      </button>

      <button
        onClick={() => handleOAuth("github")}
        disabled={isGithubLoading}
        className={`w-full flex items-center justify-center gap-3 text-white py-3 rounded-lg transition ${
          isGithubLoading ? "bg-gray-600 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-900"
        }`}
      >
        <img
          src="https://www.svgrepo.com/show/512317/github-142.svg"
          alt="GitHub"
          className={`w-5 h-5 ${isGithubLoading ? "opacity-70" : ""}`}
        />
        {isGithubLoading ? "Connecting..." : "Sign in with GitHub"}
      </button>
    </div>
  );
};

export default SocialLoginButtons;
