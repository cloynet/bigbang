// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import listEndpoints from "express-list-endpoints";

// 🔹 Route dosyaları
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import contactRoutes from "./routes/contact.js";
import couplesRoutes from "./routes/couples.js";
import logoutRoutes from "./routes/logout.js";

const app = express();

console.log("adminRoutes:", adminRoutes.stack);

// 🔹 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/couples", couplesRoutes);
app.use("/api/logout", logoutRoutes);

// 🔹 Kök endpoint
app.get("/", (req, res) => {
  res.send("✅ Backend çalışıyor, kök endpoint aktif!");
});

// 🔹 Route listesini yazdır (MUTLAKA app.use sonrası)
console.log("Yüklenen route listesi:");
console.table(listEndpoints(app));

// 🔹 Server başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend ${PORT} portunda çalışıyor`));

console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
