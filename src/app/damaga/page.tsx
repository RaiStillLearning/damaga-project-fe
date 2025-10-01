"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [user, setUser] = useState<{ username?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch data user dari backend
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {user ? `Dashboard Utama, ${user.username}!` : "Dashboard Utama"}
        </h1>
        <p
          onClick={() => {
            localStorage.removeItem("token"); // clear token biar bisa login ulang
            router.push("/login");
          }}
          className="text-gray-600 cursor-pointer hover:underline"
        >
          Not You? <a href="/login">Sign In</a> as different user
        </p>
      </div>
      <div className="mb-8">
        <p>+ Add new tiles!</p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Card 1</h3>
          <p className="text-gray-600">
            Konten card pertama dengan spacing yang proper
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Card 2</h3>
          <p className="text-gray-600">
            Konten card kedua dengan layout yang responsive
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Card 3</h3>
          <p className="text-gray-600">
            Konten card ketiga dengan layout yang responsive
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Card 4</h3>
          <p className="text-gray-600">
            Konten card keempat dengan layout yang responsive
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Card 5</h3>
          <p className="text-gray-600">
            Konten card kelima dengan layout yang responsive
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Card 6</h3>
          <p className="text-gray-600">
            Konten card ke-enam dengan design yang konsisten
          </p>
        </div>
      </div>

      {/* Additional Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Section Tambahan</h2>
        <p className="text-gray-600 mb-4">
          Ini adalah contoh konten yang tidak akan mepet dengan sidebar karena
          layout sudah diatur dengan proper padding dan spacing.
        </p>
        <p className="text-gray-600">
          Anda dapat menambahkan komponen apapun di sini dan semuanya akan
          ter-layout dengan baik.
        </p>
      </div>
    </div>
  );
}
