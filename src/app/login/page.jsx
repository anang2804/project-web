"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
      console.log(session);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Bagian Kiri */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center bg-blue-400 p-10 text-white"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">Selamat Datang Kembali!</h1>
        <p className="text-2xl font-semibold mt-2 text-black">
          Perjalanan belajarmu siap dimulai! 🚀
        </p>
      </motion.div>

      {/* Bagian Kanan */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center p-6 bg-gray-100 relative"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
          onClick={() => router.push("/")}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <motion.div
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Login
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Masuk kembali ke akun Anda untuk melanjutkan pembelajaran
          </p>

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="text"
                placeholder="Masukkan Email Anda"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Masukkan Password Anda"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-400 text-white rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          {error && (
            <p className="bg-red-500 text-white text-center p-2 mt-4 rounded-lg">
              {error}
            </p>
          )}

          <div className="text-center mt-4">
            <span className="text-gray-600">Belum Memiliki Akun? </span>
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700"
            >
              Daftar
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
