const express = require("express");
const mongoose = require("mongoose");
const Applicant = require("../models/Applicant");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/search", verifyToken, async (req, res) => {
  const { name } = req.body;

  
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    
    const regex = new RegExp(name, "i");
    const results = await Applicant.find({ name: { $regex: regex } });

    
    if (results.length === 0) {
      return res.status(404).json({ error: "No matching records found" });
    }

   
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error searching resumes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
