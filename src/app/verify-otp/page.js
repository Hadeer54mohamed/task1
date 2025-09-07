"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  // أول ما يفتح الصفحة، لو عنده session نخزن الإيميل بتاعه
  useEffect(() => {
    if (session?.user?.email) {
      localStorage.setItem("userEmail", session.user.email);
    }
  }, [session]);

  const handleVerify = () => {
    setError("");

    if (otp.length !== 4) {
      setError("OTP must be 4 digits");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "1234") {
        localStorage.removeItem("pendingAuth");

        // بعد ما يتأكد يخزّن الاسم/الايميل عشان ما يرجعش للـ login
        localStorage.setItem("userName", session?.user?.name || "User");
        localStorage.setItem("userEmail", session?.user?.email || "");

        router.push("/"); // يروح على الصفحة الرئيسية
      } else {
        setError("❌ OTP incorrect");
      }
    }, 1000);
  };

  const handleResend = () => {
    setResendMessage("OTP resent! Check your email.");
    setTimeout(() => setResendMessage(""), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">OTP Verification</h1>
        <p className="text-gray-600 mb-4 text-center">
          Enter the 4-digit code we sent to{" "}
          <span className="font-semibold text-blue-600">
            {session?.user?.email || "your email"}
          </span>
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
          placeholder="Enter OTP"
          maxLength={4}
          className="border p-2 rounded mb-2 w-full text-center"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          Didn’t get the code?{" "}
          <span
            onClick={handleResend}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Resend
          </span>
        </p>

        {resendMessage && (
          <p className="text-green-500 text-sm text-center mt-1">{resendMessage}</p>
        )}
      </div>
    </div>
  );
}
