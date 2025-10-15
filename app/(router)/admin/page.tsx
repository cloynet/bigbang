import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminPageClient from "./AdminPageClient";

const AUTH_COOKIE_NAME = "admin-auth-key";

export default async function AdminPage() {
  console.log("🔍 AdminPage server component başladı");

  const cookieStore = await cookies();
  const secretKey = cookieStore.get(AUTH_COOKIE_NAME)?.value || null;

  console.log("🍪 Cookie değeri:", secretKey ? "VAR" : "YOK");
  console.log("🔑 Cookie içeriği:", secretKey);
  console.log("🎯 Beklenen key:", process.env.ADMIN_ACCESS_SECRET);

  // ✅ SADECE COOKIE KONTROLÜ
  if (!secretKey) {
    console.error("❌ Admin doğrulama: Oturum çerezi bulunamadı.");
    redirect("/admin/login?redirect=/admin");
  }

  // ✅ Cookie değerini doğrudan environment variable ile karşılaştır
  if (secretKey !== process.env.ADMIN_ACCESS_SECRET) {
    console.error("❌ Admin doğrulama: Geçersiz çerez.");
    redirect("/admin/login?redirect=/admin");
  }

  console.log("🎉 Admin doğrulama başarılı!");

  return <AdminPageClient />;
}
