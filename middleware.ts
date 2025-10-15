import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 💡 Herkese açık yollar
  const publicPaths = [
    "/couple", // ✅ Çift login sayfası public (sadece /couple)
    "/admin/login",
    "/contact",
    "/about",
    "/products",
    "/api",
    "/favicon.ico",
    "/_next",
    "/", // anasayfa
  ];

  // 🔓 Public sayfaları doğrudan izin ver
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // 🔐 Admin koruması
  if (pathname.startsWith("/admin")) {
    const adminCookie = req.cookies.get("admin-auth-key");

    if (!adminCookie || adminCookie.value !== process.env.ADMIN_ACCESS_SECRET) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = `?redirect=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // 🩷 Çift koruması - GÜNCELLENDİ
  let coupleId = "";

  // Eğer yol /couple/ ile başlıyorsa, ikinci segment ID olur
  if (pathname.startsWith("/couple/")) {
    const parts = pathname.split("/");
    coupleId = parts[2] || "";
  } else {
    // Yoksa doğrudan kök path (örnek: /eren-eren-pl0y)
    const parts = pathname.split("/");
    coupleId = parts[1] || "";
  }

  // ✅ Sadece geçerli coupleId varsa kontrol et
  if (coupleId && coupleId.length > 3) {
    const coupleCookie = req.cookies.get(`coupleAuth_${coupleId}`);

    console.log("🔍 Middleware çift kontrolü:", {
      pathname,
      coupleId,
      hasCookie: !!coupleCookie,
      cookieValue: coupleCookie?.value,
    });

    // 🔐 Eğer çerez yoksa veya yanlışsa ÇİFT LOGIN SAYFASINA gönder (/couple)
    if (!coupleCookie || coupleCookie.value !== coupleId) {
      console.log("❌ Çift erişim reddedildi, /couple'a yönlendiriliyor");
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/couple"; // ✅ /couple/login değil, /couple
      loginUrl.search = `?redirect=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(loginUrl);
    }

    console.log("✅ Çift erişim izni verildi");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
