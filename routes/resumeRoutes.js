const express = require("express");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");
const Applicant = require("../models/Applicant");
const verifyToken = require("../middleware/authMiddleware");
const { parseWithGemini } = require("../utils/geminiAPI");

const router = express.Router();

router.post("/enrich", verifyToken, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

   
    const response = await axios({ url, responseType: "arraybuffer" });
    const pdfBuffer = Buffer.from(response.data);

    
    const pdfData = await pdfParse(pdfBuffer);
    const rawText = pdfData.text.trim();

    if (!rawText) {
      return res.status(500).json({
        error: "Failed to extract text from PDF or invalid file type.",
      });
    }

    
    const structuredData = await parseWithGemini(rawText);
    if (!structuredData || !structuredData.name || !structuredData.email) {
      return res
        .status(500)
        .json({ error: "LLM failed to return structured data." });
    }

    
    const newApplicant = new Applicant(structuredData);
    await newApplicant.save();

    return res
      .status(200)
      .json({ message: "Data stored successfully", applicant: structuredData });
  } catch (error) {
    console.error("Error processing resume:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
