const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function parseWithGemini(text) {
  try {
    const prompt = `Extract and format the following resume text into a structured JSON format:
        Return only a valid JSON response without any additional text or formatting.

        {
          "name": <name>,
          "email": <email>,
          "education": {
            "degree": <degree>,
            "branch": <branch>,
            "institution": <institution>,
            "year": <year>
          },
          "experience": {
            "job_title": <job_title>,
            "company": <company>,
            "start_date": <start_date>,
            "end_date": <end_date>
          },
          "skills": [<skill_1>, <skill_2>, ...],
          "summary": <write a short summary about the candidate profile>
        }

        Resume Text: """${text}"""`;

    const result = await model.generateContent(prompt);
    let parsedText = result.response.text();


    parsedText = parsedText.replace(/```json|```/g, "").trim();

   
    const jsonData = JSON.parse(parsedText);
    return jsonData;
  } catch (error) {
    console.error("Gemini Processing Error:", error);
    throw new Error("Failed to process text with Gemini API");
  }
}

module.exports = { parseWithGemini };
