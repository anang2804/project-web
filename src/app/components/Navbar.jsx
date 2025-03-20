"use client"; // Tambahkan ini di baris pertama

import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // Pastikan menggunakan "next/navigation" untuk App Router

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Logout tanpa redirect bawaan NextAuth
    router.push("/"); // Arahkan user ke halaman utama setelah logout
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="w-full md:flex md:items-center md:gap-2">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a className="link text-xl font-semibold" href="#">
            PintarJaringan
          </a>
        </div>

        <div className="md:navbar-end collapse hidden grow basis-full max-md:w-full">
          <ul className="menu md:menu-horizontal gap-2 p-0 text-base max-md:mt-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
