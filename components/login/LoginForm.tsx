"use client";
import React, { useState } from "react";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ id, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = data.link;
    } else {
      setError(data.error || "Giriş başarısız");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-4 p-4'>
      <input
        type='text'
        placeholder='Kullanıcı ID'
        value={id}
        onChange={(e) => setId(e.target.value)}
        className='w-full border px-4 py-2 rounded'
      />
      <input
        type='password'
        placeholder='Şifre'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full border px-4 py-2 rounded'
      />
      {error && <p className='text-red-500'>{error}</p>}
      <button
        type='submit'
        className='w-full bg-gray-800 text-white py-2 rounded'
      >
        Giriş Yap
      </button>
    </form>
  );
}
