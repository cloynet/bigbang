import express from "express";
import { checkLogin } from "../lib/couples.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({ error: "Kullanıcı adı ve şifre gerekli" });
    }

    const result = await checkLogin(loginId, password);
    if (!result) {
      return res.status(401).json({ error: "Giriş başarısız" });
    }

    const { link, urlId } = result;

    // ✅ COOKIE AYARLARI GÜNCELLENDİ
    res.cookie(`coupleAuth_${urlId}`, urlId, {
      httpOnly: true,
      secure: false, // Development'ta false
      sameSite: "lax", // Cross-site için lax
      maxAge: 1000 * 60 * 60 * 2, // 7 gün
      path: "/",
      // domain: "localhost" // Development'ta gerek yok
    });

    console.log("✅ Cookie set edildi:", `coupleAuth_${urlId}`, urlId);

    return res.json({ success: true, link });
  } catch (error) {
    console.error("Login hata:", error);
    return res.status(500).json({ error: "Giriş sırasında hata oluştu" });
  }
});

export default router;
