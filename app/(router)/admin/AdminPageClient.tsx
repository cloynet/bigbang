"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface AddCoupleResponse {
  link?: string;
  error?: string;
}

export default function AdminPageClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = searchParams.get("key");
    if (key) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
      console.log("✅ URL temizlendi, güvenli hale getirildi.");
    }
  }, [searchParams]);

  const [urlId, setUrlId] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddCouple = async () => {
    setLoading(true);
    setError("");
    setLink("");

    try {
      // ✅ ENVIRONMENT VARIABLE KULLAN
      const API_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

      const res = await fetch(`${API_URL}/api/couples`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urlId, loginId, password }),
        credentials: "include",
      });
      const data: AddCoupleResponse = await res.json();

      if (!res.ok) {
        setError(data.error || "Bilinmeyen bir hata oluştu");
      } else {
        setLink(data.link || "");
        setUrlId("");
        setLoginId("");
        setPassword("");
      }
    } catch (err) {
      console.error("❌ Sunucu hatası:", err);
      setError("Sunucuya bağlanılamadı.");
    }

    setLoading(false);
  };

  return (
    <div className='p-8 max-w-xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-red-700'>
        Admin Paneli (Giriş Başarılı)
      </h1>
      <p className='text-sm text-gray-500 mb-6'>
        <strong>Güvenlik:</strong> Giriş anahtarı URLden kaldırıldı. Sayfayı
        yenilerseniz yeniden giriş yapmanız gerekir.
      </p>

      <div className='bg-white p-6 rounded-xl shadow-lg border border-red-100'>
        <h2 className='text-xl font-semibold mb-4'>Yeni Çift Ekle</h2>

        <input
          type='text'
          placeholder='URL ID (örn: duygu-eren)'
          className='w-full p-3 mb-4 border rounded-lg focus:ring-red-500 focus:border-red-500'
          value={urlId}
          onChange={(e) => setUrlId(e.target.value)}
        />

        <input
          type='text'
          placeholder='Login ID (örn: erenilla)'
          className='w-full p-3 mb-4 border rounded-lg focus:ring-red-500 focus:border-red-500'
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <input
          type='password'
          placeholder='Şifre'
          className='w-full p-3 mb-4 border rounded-lg focus:ring-red-500 focus:border-red-500'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAddCouple}
          className='w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 disabled:opacity-50'
          disabled={loading}
        >
          {loading ? "Ekleniyor..." : "Çifti Ekle"}
        </button>

        {link && (
          <p className='text-green-600 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg break-all'>
            <strong>Link Başarıyla Oluşturuldu!</strong>{" "}
            <a href={link} target='_blank' className='underline ml-1'>
              {link}
            </a>
          </p>
        )}

        {error && (
          <p className='text-red-600 mt-4 bg-red-50 border border-red-200 p-2 rounded-lg'>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
