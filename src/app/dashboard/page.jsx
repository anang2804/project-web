"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Card from "../components/Cards";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect ke login jika belum login
  useEffect(() => {
    if (status === "loading") return; // Jangan lakukan apapun saat loading

    if (!session) {
      router.replace("/"); // Redirect ke halaman awal jika tidak ada sesi
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="justify-center p-8">
        <Card />
      </div>

      <div className="flex flex-col items-center justify-row min-h-screen">
        {session ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Welcome, {session.user?.email}!
            </h1>
            <p className="text-gray-600 mt-2 dark:text-gray-400">
              You have successfully logged in.
            </p>
            <button
              onClick={async () => {
                await signOut({ redirect: false }); // Logout tanpa redirect default
                router.push("/"); // Arahkan ke halaman awal setelah logout
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Redirecting to home...
          </p>
        )}
      </div>
    </>
  );
}
