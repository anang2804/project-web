"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect ke login jika belum login
  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!session) {
    router.replace("/");
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="justify-center p-8">
        <Card />
      </div>
      <div className="flex flex-col items-center justify-row min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {session.user?.email}!
        </h1>
        <p className="text-gray-600 mt-2">You have successfully logged in.</p>

        <button
          onClick={() => signOut()}
          className="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </>
  );
}
