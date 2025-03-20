"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Cards() {
  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const [progressData, setProgressData] = useState({
    materi1: 0,
    materi2: 0,
    materi3: 0,
  });

  // 🔥 Fetch progress saat user login atau data berubah
  useEffect(() => {
    if (userEmail) {
      fetch(`/api/progress?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("🔥 API Response:", data); // ✅ Cek apakah API mengembalikan progress
          setProgressData({
            materi1: data?.materi1 || 0,
            materi2: data?.materi2 || 0,
            materi3: data?.materi3 || 0,
          });
        })
        .catch((error) => console.error("Error fetching progress:", error));
    }
  }, [userEmail]); // ⬅️ Perubahan di sini

  // 🔄 Auto-refresh setelah update progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (userEmail) {
        router.refresh(); // ✅ Auto-refresh untuk mengambil data terbaru
      }
    }, 3000); // Cek setiap 3 detik

    return () => clearInterval(interval);
  }, [userEmail]);

  return (
    <div className="flex space-x-4">
      {/* Card 1 */}
      <div className="card group hover:shadow sm:max-w-sm">
        <figure>
          <img
            src="https://cdn.flyonui.com/fy-assets/components/card/image-8.png"
            alt="Shoes"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
        <div className="card-body">
          <h5 className="card-title mb-2.5">Materi 1</h5>
          <p className="mb-6">Belajar dasar-dasar pemrograman.</p>
          <progress
            className="progress progress-secondary w-56"
            value={progressData.materi1}
            max="100"
          ></progress>
          <div className="card-actions">
            <button
              className="btn btn-dash btn-accent"
              onClick={() => router.push("/materi1")}
            >
              Belajar Yuk
            </button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card group hover:shadow sm:max-w-sm">
        <figure>
          <img
            src="https://cdn.flyonui.com/fy-assets/components/card/image-8.png"
            alt="Shoes"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
        <div className="card-body">
          <h5 className="card-title mb-2.5">Materi 2</h5>
          <p className="mb-6">Belajar konsep lanjut.</p>
          <progress
            className="progress progress-secondary w-56"
            value={progressData.materi2}
            max="100"
          ></progress>
          <div className="card-actions">
            <button
              className="btn btn-dash btn-accent"
              onClick={() => router.push("/materi2")}
            >
              Belajar Yuk
            </button>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card group hover:shadow sm:max-w-sm">
        <figure>
          <img
            src="https://cdn.flyonui.com/fy-assets/components/card/image-8.png"
            alt="Shoes"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
        <div className="card-body">
          <h5 className="card-title mb-2.5">Materi 3</h5>
          <p className="mb-6">Tingkatkan keterampilan.</p>
          <progress
            className="progress progress-secondary w-56"
            value={progressData.materi3}
            max="100"
          ></progress>
          <div className="card-actions">
            <button
              className="btn btn-dash btn-accent"
              onClick={() => router.push("/materi3")}
            >
              Belajar Yuk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
