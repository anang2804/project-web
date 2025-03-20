"use client";

import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function Materi1Page() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const lessons = [
    "Komponen Website, Memahami Konsep HTML, Membuat File HTML",
    "Pengenalan CSS, Membuat Project HTML & CSS",
    "Web Development Basics - IBM SkillsBuild",
    "Assignment 1 : Understand Flexbox & Grid",
    "Developing Sites for the Web - IBM SkillsBuild (Mini Class)",
  ];

  const [selectedLesson, setSelectedLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (userEmail) {
      fetch(`/api/progress?email=${userEmail}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("🔥 API Response:", data);
          setCompletedLessons(data.completedLessons || []);
          setProgress(data.progress || 0);
        })
        .catch((error) =>
          console.error("❌ Error fetching progress:", error.message)
        );
    }
  }, [userEmail]);

  const handleNextLesson = async () => {
    if (!completedLessons.includes(selectedLesson)) {
      const updatedCompleted = [...completedLessons, selectedLesson];
      const newProgress = (updatedCompleted.length / lessons.length) * 100;

      setCompletedLessons(updatedCompleted);
      setProgress(newProgress);

      try {
        const response = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            completedLessons: updatedCompleted,
            progress: newProgress,
            lastLesson: selectedLesson,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menyimpan progress");
        }

        console.log("✅ Progress berhasil diperbarui!");
      } catch (error) {
        console.error("❌ Error updating progress:", error.message);
      }
    }

    if (selectedLesson < lessons.length - 1) {
      setSelectedLesson((prev) => prev + 1);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-80 bg-white p-4 border-r overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">Basic Web Development</h1>
          <a href="/dashboard">
            <FaTimes className="text-red-500 text-lg cursor-pointer" />
          </a>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {progress.toFixed(0)}% Complete
        </p>
        <ul>
          {lessons.map((lesson, index) => (
            <li
              key={index}
              className={`p-2 flex items-center gap-2 cursor-pointer rounded-lg ${
                selectedLesson === index
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedLesson(index)}
            >
              <FaCheckCircle
                className={
                  completedLessons.includes(index)
                    ? "text-green-500"
                    : "text-gray-400"
                }
              />
              {lesson}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 relative">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">{lessons[selectedLesson]}</h2>
          <p className="text-gray-600">
            Isi materi atau viewer PDF akan ditampilkan di sini.
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleNextLesson}
          >
            LANJUTKAN →
          </button>
        </div>

        {progress === 100 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center">🎉 Selamat! 🎉</h2>
              <p className="text-center text-gray-700 mt-2">
                Anda telah menyelesaikan semua materi.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
