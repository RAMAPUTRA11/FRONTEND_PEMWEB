const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/register", (req, res) => {
  const { nama, email, password } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const sql = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";
  db.query(sql, [nama, email, password], (err) => {
    if (err) return res.status(500).json({ message: "Email sudah digunakan" });

    res.json({ message: "Register berhasil" });
  });
});

module.exports = router;
