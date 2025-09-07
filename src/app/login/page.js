"use client";

import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    terms: false,
    gender: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.fullname || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("userName", formData.fullname);
      localStorage.setItem("userEmail", formData.email);
      setLoading(false);
      router.push("/verify-otp"); // 👈 بعد التسجيل يروح ع verify-otp
    }, 3000);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = formData;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/verify-otp", // 👈 هنخليه يرجع هنا
    });

    setLoading(false);

    if (res?.ok) {
      localStorage.setItem("userName", email);
      localStorage.setItem("userEmail", email);
      router.push("/verify-otp"); // 👈 هنا بدل "/"
    } else {
      setError(res?.error || "Login failed");
    }
  };

  return (
    <section className="relative w-full max-w-lg mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-6">
      <div className="flex justify-around mb-6">
        <button
          onClick={() => setIsLogin(false)}
          className={`text-lg font-bold ${
            !isLogin
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setIsLogin(true)}
          className={`text-lg font-bold ${
            isLogin
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`}
        >
          Log In
        </button>
      </div>

      <div className="relative min-h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          {!isLogin ? (
            <motion.div
              key="signup"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full"
            >
              <SignUpForm
                handleChange={handleChange}
                formData={formData}
                handleSubmit={handleSignUpSubmit}
                loading={loading}
                error={error}
              />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full"
            >
              <LoginForm
                handleChange={handleChange}
                formData={formData}
                handleSubmit={handleLoginSubmit}
                loading={loading}
                error={error}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
