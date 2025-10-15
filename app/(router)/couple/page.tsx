import { Suspense } from "react";
import CoupleLoginPage from "./CoupleClientPage";

export default function Couples() {
  return (
    <Suspense
      fallback={
        <p className='text-center text-gray-500 mt-8'>Sayfa yükleniyor...</p>
      }
    >
      <CoupleLoginPage />
    </Suspense>
  );
}
