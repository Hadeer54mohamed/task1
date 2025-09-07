"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.email) {
      // ✅ لو Google/GitHub
      setUserName(session.user.name || "User");
      setUserEmail(session.user.email);
      return;
    }

    // ✅ لو يدوي
    const localName = localStorage.getItem("userName");
    const localEmail = localStorage.getItem("userEmail");

    if (localName || localEmail) {
      setUserName(localName || "User");
      setUserEmail(localEmail || "");
    } else {
      router.push("/login");
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    if (session) {
      // ✅ لو داخل بجوجل/جيت
      await signOut({ callbackUrl: "/login" });
    } else {
      // ✅ لو داخل يدوي
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white shadow-md rounded-lg p-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {userName || "Guest"} 🎉
        </h1>
        {userEmail && (
          <p className="text-gray-600 mb-6">Signed in as {userEmail}</p>
        )}
        <p className="text-gray-500 mb-6">
          You have successfully logged in. Enjoy your Trip!
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition transform hover:scale-105"
        >
          Log Out
        </button>
      </motion.div>
    </div>
  );
}
