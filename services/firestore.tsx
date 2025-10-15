import { getFirestore, doc, getDoc } from "firebase/firestore";
import { firebaseApp } from "@/firebase";

const db = getFirestore(firebaseApp);

export const checkLogin = async (username: string, password: string) => {
  try {
    const docRef = doc(db, "couples", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("firestore data: ", data);
      console.log("ınput password: ", password);
      // Kullanıcı adı ve şifreyi kontrol et
      return data.password === password;
    } else {
      return false; // kullanıcı yok
    }
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};
