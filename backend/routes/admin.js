import express from "express";
const router = express.Router();

const ADMIN_ID = process.env.ADMIN_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ACCESS_KEY = process.env.ADMIN_ACCESS_SECRET;

//  Admin Login
router.post("/admin-login", async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!ADMIN_ID || !ADMIN_PASSWORD || !ACCESS_KEY) {
      console.error("Ortam değişkenleri eksik!");
      return res.status(500).json({ error: "Sunucu yapılandırma hatası." });
    }

    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      // Cookie
      res.cookie("admin-auth-key", ACCESS_KEY, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 gün
        path: "/",
      });

      return res.status(200).json({
        message: "Giriş başarılı.",
        redirectTo: "/admin",
      });
    } else {
      return res.status(401).json({ error: "Admin kimlik bilgileri hatalı." });
    }
  } catch (error) {
    console.error("Admin Login API Hatası:", error);
    return res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
});

//  Admin Verify
//  Admin Verify - EXTENDED DEBUG
router.get("/verify-admin", (req, res) => {
  try {
    console.log("🔍 Verify-admin endpoint called");
    console.log("📦 Tüm headers:", req.headers);
    console.log("🍪 Tüm cookies:", req.cookies);
    console.log("🔑 Cookie parser sonucu:", req.cookies["admin-auth-key"]);

    const adminKey = req.cookies["admin-auth-key"];

    console.log("🎯 Admin key from cookie:", adminKey);
    console.log("💾 Expected key:", ACCESS_KEY ? "SET" : "NOT SET");
    console.log("✅ Key match:", adminKey === ACCESS_KEY);

    if (!adminKey) {
      console.warn("❌ verify-admin: çerez yok");
      return res.status(401).json({
        valid: false,
        error: "Çerez bulunamadı",
        receivedCookies: req.cookies,
      });
    }

    if (adminKey === ACCESS_KEY) {
      console.log("✅ verify-admin: başarılı");
      return res.status(200).json({ valid: true });
    }

    console.warn("❌ verify-admin: anahtar eşleşmiyor");
    return res.status(403).json({
      valid: false,
      error: "Geçersiz anahtar",
      received: adminKey,
      expected: ACCESS_KEY,
    });
  } catch (error) {
    console.error("Verify Admin Hatası:", error);
    return res.status(500).json({ valid: false, error: "Sunucu hatası" });
  }
});

export default router;
