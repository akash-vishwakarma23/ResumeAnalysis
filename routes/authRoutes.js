const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = { "naval.ravikant": "05111974" };

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ JWT: token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
