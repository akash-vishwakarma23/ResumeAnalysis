const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: {
    degree: String,
    branch: String,
    institution: String,
    year: Number,
  },
  experience: {
    job_title: String,
    company: String,
    start_date: String,
    end_date: String,
  },
  skills: [String],
  summary: String,
});

module.exports = mongoose.model("Applicant", ApplicantSchema);
