"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !email || !password || !phone) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, phone }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const { message } = await res.json();
        setError(message || "Registration failed.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f4f8] relative">
      {/* Close Button */}
      <button
        className="absolute top-5 right-5 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
        onClick={() => router.push("/")}
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      {/* Logo */}
      <div className="absolute top-10 left-10">
        <Image
          src="/logo.svg"
          alt="Forwardin Logo"
          width={177}
          height={33.63}
        />
      </div>

      {/* Register Form Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[350px] bg-white shadow-lg rounded-lg p-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-600">
            Please fill the form below to register
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <div className="relative flex gap-2">
            <select className="w-32 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-black">
              <option value="+62">(ID) +62</option>
            </select>
            <input
              type="text"
              id="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />

          {error && (
            <p className="text-center text-red-500 bg-red-100 p-2 rounded-md mt-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center mt-4">
            <a href="/login" className="text-sm text-blue-500">
              Already have an account? Login here
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
