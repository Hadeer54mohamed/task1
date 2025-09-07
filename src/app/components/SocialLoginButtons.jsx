"use client";

import React from "react";
import { signIn } from "next-auth/react";

const SocialLoginButtons = () => {
/*   const handleSocialLogin = (provider) => {
    signIn(provider, { callbackUrl: "/verify-otp" });
  }; */

  return (
    <div className="w-full">
       <button
        onClick={() => signIn("google", { callbackUrl: "/verify-otp" })}
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
        onClick={() => signIn("github", { callbackUrl: "/verify-otp" })}
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
  );
};

export default SocialLoginButtons;
