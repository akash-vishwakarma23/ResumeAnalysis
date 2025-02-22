const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/mongoose");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const resumeSearchRoutes = require("./routes/resumeSearchRoutes");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/resume", resumeSearchRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Resume Analysis App");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
