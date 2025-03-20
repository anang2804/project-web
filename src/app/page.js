"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md p-5 flex justify-between items-center z-50">
        <div className="text-2xl font-bold text-blue-900">JAGO JARINGAN</div>
        <div className="hidden md:flex gap-6">
          <a
            href="#beranda"
            className={`${
              activeSection === "beranda"
                ? "text-blue-500 font-semibold"
                : "text-gray-700"
            } hover:text-blue-500`}
          >
            Beranda
          </a>
          <a
            href="#menuSection"
            className={`${
              activeSection === "menuSection"
                ? "text-blue-500 font-semibold"
                : "text-gray-700"
            } hover:text-blue-500`}
          >
            Menu
          </a>
          <a
            href="#tentang"
            className={`${
              activeSection === "tentang"
                ? "text-blue-500 font-semibold"
                : "text-gray-700"
            } hover:text-blue-500`}
          >
            Tentang
          </a>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            <Link href="/login">Login</Link>
          </button>
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md">
            <Link href="/register">Register</Link>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="beranda"
        className="h-screen w-screen bg-white-50 flex flex-col items-center justify-center text-center space-y-4 px-6 md:px-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
          Belajar Bersama <span className="text-blue-500">Jatra</span> Untuk
          Tingkatkan Skillmu
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Belajar jaringan jadi lebih gampang dan menyenangkan! Pahami konsep,
          praktikkan konfigurasi, dan eksplorasi dunia jaringan dengan simulasi
          Cisco Packet Tracer. ⚡
        </p>
        <button className="mt-6 px-8 py-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          <Link href="/login">Belajar Sekarang</Link>
        </button>
      </section>

      {/* Fitur Terbaik (Target Scroll) */}
      <section
        id="menuSection"
        className="w-full min-h-screen py-20 bg-blue-500 flex flex-col justify-center items-center space-y-14"
      >
        <div className="md:w-3/5 w-full text-center">
          <h1 className="font-bold md:text-5xl text-3xl text-white capitalize">
            Tingkatkan Pengalaman Belajar di{" "}
            <span className="text-black">Jatra</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full px-4 md:px-12">
          {/* Card 1: Materi */}
          <div className="flex flex-col items-center space-y-4 bg-white rounded-lg p-6 shadow-lg max-w-[320px] mx-auto">
            <div className="p-6 flex justify-center items-center">
              <Image
                src="/buku.png"
                alt="icon"
                width={128}
                height={128}
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="font-bold text-2xl text-blue-900 text-center min-h-[60px]">
              Materi
            </h3>
            <p className="text-center text-gray-700 min-h-[80px]">
              Kemudahan Mengakses Materi Pembelajaran
            </p>
          </div>

          {/* Card 2: Simulasi Virtualisasi Server */}
          <div className="flex flex-col items-center space-y-4 bg-white rounded-lg p-6 shadow-lg max-w-[320px] mx-auto">
            <div className="p-6 flex justify-center items-center">
              <Image
                src="/buku.png"
                alt="icon"
                width={128}
                height={128}
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="font-bold text-2xl text-blue-900 text-center min-h-[60px]">
              Simulasi Cisco Packet Tracer
            </h3>
            <p className="text-center text-gray-700 min-h-[80px]">
              Praktik langsung konfigurasi jaringan menggunakan Cisco Packet
              Tracer dengan panduan langkah demi langkah.
            </p>
          </div>

          {/* Card 3: Evaluasi & Sertifikasi */}
          <div className="flex flex-col items-center space-y-4 bg-white rounded-lg p-6 shadow-lg max-w-[320px] mx-auto">
            <div className="p-6 flex justify-center items-center">
              <Image
                src="/buku.png"
                alt="icon"
                width={128}
                height={128}
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="font-bold text-2xl text-blue-900 text-center min-h-[60px]">
              Latihan Soal
            </h3>
            <p className="text-center text-gray-700 min-h-[80px]">
              Terdapat beberapa latihan soal berupa kuis pengetahuan untuk
              mengasah kemampuan pemahaman belajar
            </p>
          </div>
        </div>
      </section>

      {/* Tentang Section */}
      <section
        id="tentang"
        className="w-full min-h-screen py-20 bg-white-100 flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-10 px-6 md:px-12"
      >
        <div className="max-w-lg md:max-w-xl">
          <h1 className="text-4xl font-bold text-gray-900 leading-snug">
            Menyajikan <span className="text-blue-500">Konten</span>{" "}
            Pembelajaran Langsung Dari Guru
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            Nikmati fitur dimana guru dapat memberikan materi pembelajaran
            kepada siswanya yakni menggabungkan materi berupa teks dan video.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
            Belajar Sekarang
          </button>
        </div>
        <div className="flex justify-center">
          <video
            src="/education-animation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-[500px] h-[400px] rounded-lg "
          />
        </div>
      </section>
    </div>
  );
}
