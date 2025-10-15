import express from "express";
import cookie from "cookie";

const router = express.Router();

router.post("/logout", async (req, res) => {
  const { coupleId } = req.body;

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(`coupleAuth_${coupleId}`, "", {
      expires: new Date(0),
      path: "/",
    })
  );

  return res.json({ success: true });
});

export default router;
