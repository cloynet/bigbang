"use client";

import React, { Suspense } from "react";
import AdminLoginPage from "./AdminLoginPage";

export default function AdminLoginWrapper() {
  return (
    <Suspense
      fallback={<p className='text-center text-gray-500 mt-8'>Yükleniyor...</p>}
    >
      <AdminLoginPage />
    </Suspense>
  );
}
