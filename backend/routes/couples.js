import express from "express";
import { addCouple, getCoupleByUrlId } from "../lib/couples.js"; // ✅ getCoupleByUrlId ekle

const router = express.Router();

// ✅ Çift ekleme (POST)
router.post("/", async (req, res) => {
  try {
    const { urlId, loginId, password } = req.body;

    console.log("🔍 Çift ekleme isteği:", { urlId, loginId, password });

    if (!urlId || !loginId || !password) {
      return res.status(400).json({
        error: "URL ID, Login ID ve şifre gerekli",
      });
    }

    const link = await addCouple(urlId, loginId, password);
    console.log("✅ Çift eklendi, link:", link);

    return res.json({ success: true, link });
  } catch (error) {
    console.error("❌ Çift ekleme hatası:", error);
    return res.status(500).json({
      error: "Çift eklenirken bir hata oluştu: " + error.message,
    });
  }
});

// ✅ Çift bilgilerini getir (GET) - BU EKLENDİ!
router.get("/:urlId", async (req, res) => {
  try {
    const { urlId } = req.params;

    console.log("🔍 Çift bilgisi isteği:", urlId);

    // Firebase'den çift bilgilerini getir
    const couple = await getCoupleByUrlId(urlId);

    if (!couple) {
      console.log("❌ Çift bulunamadı:", urlId);
      return res.status(404).json({
        success: false,
        error: "Çift bulunamadı",
      });
    }

    console.log("✅ Çift bulundu:", couple);

    return res.json({
      success: true,
      couple: {
        urlId: couple.urlId,
        loginId: couple.loginId,
        created_at: couple.created_at,
        // Diğer bilgileri buraya ekleyebilirsin
      },
    });
  } catch (error) {
    console.error("❌ Çift bilgisi alma hatası:", error);
    return res.status(500).json({
      success: false,
      error: "Çift bilgileri alınamadı: " + error.message,
    });
  }
});

export default router;
