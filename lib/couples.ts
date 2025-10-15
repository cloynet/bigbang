import { db } from "./firebase";
import { adminDb } from "./adminFirebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";

function generateRandomSuffix(length = 4) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

// Yeni kullanıcı ekleme
export async function addCouple(
  baseUrlId: string,
  loginId: string,
  password: string
) {
  const randomSuffix = generateRandomSuffix();
  const urlId = `${baseUrlId}-${randomSuffix}`;
  const hashedPassword = await bcrypt.hash(password, 10);
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${urlId}`;

  await adminDb.collection("couples").doc(urlId).set({
    urlId,
    loginId,
    password: hashedPassword,
    link,
    createdAt: new Date().toISOString(),
  });

  return link;
}

export async function checkLogin(
  loginId: string,
  password: string
): Promise<{ link: string; urlId: string } | null> {
  const q = query(collection(db, "couples"), where("loginId", "==", loginId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data();

  const valid = await bcrypt.compare(password, data.password);
  if (!valid) return null;

  return {
    link: data.link,
    urlId: data.urlId,
  };
}
