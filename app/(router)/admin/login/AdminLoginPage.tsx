"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const defaultRedirectTo = searchParams.get("redirect") || "/admin";

  const handleAdminLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

      const res = await fetch(`${API_URL}/api/admin/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error || "Giriş başarısız. Lütfen bilgilerinizi kontrol edin."
        );
      } else {
        const targetUrl = data.redirectTo || defaultRedirectTo;
        router.replace(targetUrl);
      }
    } catch (err) {
      console.error("Login hatası:", err);
      setError("Sunucuya bağlanılamadı. Lütfen ağ bağlantınızı kontrol edin.");
    }

    setLoading(false);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='p-8 max-w-sm w-full bg-white rounded-xl shadow-2xl border border-gray-100'>
        <h1 className='text-3xl font-extrabold mb-8 text-center text-red-600'>
          Admin Paneli Girişi
        </h1>

        <Input
          type='text'
          placeholder='Admin ID'
          className='w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Input
          type='password'
          placeholder='Şifre'
          className='w-full p-4 mb-6 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={handleAdminLogin}
          className='w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition duration-200 shadow-md disabled:opacity-50'
          disabled={loading}
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </Button>

        {error && (
          <p className='text-red-600 bg-red-50 p-3 rounded-lg mt-4 text-center border border-red-200'>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
