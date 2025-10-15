"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CoupleLoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const handleCoupleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.link) {
        window.location.href = data.link;
      } else {
        setError(data.error || "Giriş başarısız.");
      }
    } catch (e) {
      setError("Sunucuya bağlanılamadı.");
    }

    setLoading(false);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-pink-50'>
      <div className='p-8 max-w-sm w-full bg-white rounded-xl shadow-2xl border border-pink-200'>
        <h1 className='text-3xl font-extrabold mb-8 text-center text-pink-600'>
          Çift Girişi
        </h1>

        <input
          type='text'
          placeholder='Kullanıcı Adı (Login ID)'
          className='w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150'
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <input
          type='password'
          placeholder='Şifre'
          className='w-full p-4 mb-6 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleCoupleLogin}
          className='w-full bg-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 transition duration-200 shadow-md disabled:opacity-50'
          disabled={loading}
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>

        {error && (
          <p className='text-red-600 bg-red-50 p-3 rounded-lg mt-4 text-center border border-red-200'>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
