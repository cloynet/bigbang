import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CouplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("🔍 Çift sayfası yükleniyor, ID:", id);

  // 🍪 Cookie kontrolü
  const cookieStore = await cookies();
  const coupleCookie = cookieStore.get(`coupleAuth_${id}`);

  console.log("🍪 Cookie kontrolü:", {
    id,
    hasCookie: !!coupleCookie,
    cookieValue: coupleCookie?.value,
  });

  if (!coupleCookie || coupleCookie.value !== id) {
    console.log("❌ Cookie yok, login'e yönlendiriliyor");
    redirect(`/couple?redirect=/${id}`);
  }

  console.log("✅ Cookie doğrulandı, veri çekiliyor...");

  try {
    const API_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    // 🧠 Backend'den çift verisini çek
    const res = await fetch(`${API_URL}/api/couples/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    console.log("📊 Backend response status:", res.status);

    if (!res.ok) {
      console.error("❌ Backend hatası:", res.status);
      return (
        <div className='min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-2xl shadow-xl text-center'>
            <h1 className='text-3xl font-bold text-red-600 mb-4'>Hata</h1>
            <p className='text-gray-600'>ID: {id} için veri alınamadı.</p>
            <p className='text-sm text-gray-500 mt-2'>Status: {res.status}</p>
          </div>
        </div>
      );
    }

    const data = await res.json();
    console.log("📦 Backend response data:", data);

    if (!data.success) {
      return (
        <div className='min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-2xl shadow-xl text-center'>
            <h1 className='text-3xl font-bold text-orange-600 mb-4'>
              Çift Bulunamadı
            </h1>
            <p className='text-gray-600'>
              ID: {id} ile eşleşen çift bulunamadı.
            </p>
          </div>
        </div>
      );
    }

    const { couple } = data;

    return (
      <div className='min-h-screen bg-gradient-to-br from-pink-100 to-red-100 py-8'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='bg-white rounded-2xl shadow-xl p-8 text-center'>
            <h1 className='text-4xl font-bold text-pink-600 mb-4'>
              {couple.urlId} Çift Sayfası
            </h1>
            <p className='text-gray-600 mb-6'>
              Hoş geldiniz! Bu özel çift sayfasına erişim izniniz var.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
              <div className='bg-pink-50 p-6 rounded-lg'>
                <h3 className='text-xl font-semibold text-pink-700 mb-2'>
                  Çift Bilgileri
                </h3>
                <p>
                  <strong>URL ID:</strong> {couple.urlId}
                </p>
                <p>
                  <strong>Login ID:</strong> {couple.loginId}
                </p>
                <p>
                  <strong>Oluşturulma:</strong>{" "}
                  {new Date(couple.created_at).toLocaleDateString("tr-TR")}
                </p>
              </div>

              <div className='bg-red-50 p-6 rounded-lg'>
                <h3 className='text-xl font-semibold text-red-700 mb-2'>
                  Özellikler
                </h3>
                <p>• Özel mesajlar</p>
                <p>• Fotoğraf albümü</p>
                <p>• Anı defteri</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("💥 Sayfa yüklenirken hata:", error);
    return (
      <div className='min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-2xl shadow-xl text-center'>
          <h1 className='text-3xl font-bold text-red-600 mb-4'>
            Sunucu Hatası
          </h1>
          <p className='text-gray-600'>Sayfa yüklenirken bir hata oluştu.</p>
        </div>
      </div>
    );
  }
}
