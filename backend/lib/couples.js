import admin from "firebase-admin";
import bcrypt from "bcryptjs";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

function generateRandomSuffix(length = 4) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

// ✅ URL ID'ye göre çift getirme - DÜZELTİLDİ
export async function getCoupleByUrlId(urlId) {
  try {
    console.log("🔍 Firebase'de çift aranıyor:", urlId);

    const doc = await db.collection("couples").doc(urlId).get();

    if (!doc.exists) {
      console.log("❌ Firebase'de çift bulunamadı:", urlId);
      return null;
    }

    console.log("✅ Firebase'de çift bulundu:", doc.id);

    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error("❌ Firebase sorgu hatası:", error);
    throw error;
  }
}

// Yeni kullanıcı ekleme
export async function addCouple(baseUrlId, loginId, password) {
  const randomSuffix = generateRandomSuffix();
  const urlId = `${baseUrlId}-${randomSuffix}`;
  const hashedPassword = await bcrypt.hash(password, 10);
  const link = `${process.env.FRONTEND_BASE_URL}/${urlId}`;

  await db.collection("couples").doc(urlId).set({
    urlId,
    loginId,
    password: hashedPassword,
    link,
    createdAt: new Date().toISOString(),
  });

  return link;
}

// Giriş kontrolü
export async function checkLogin(loginId, password) {
  const snapshot = await db
    .collection("couples")
    .where("loginId", "==", loginId)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const data = doc.data();

  const valid = await bcrypt.compare(password, data.password);
  if (!valid) return null;

  return {
    link: data.link,
    urlId: data.urlId,
  };
}
