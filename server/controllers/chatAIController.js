import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import { model } from "mongoose";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Controller function
export async function chatbotResponse(req, res) {
  try {
    const { message } = req.body;

    // Add base context
    const prompt = `
You are a helpful AI assistant for CodeDrive, an online learning platform. Answer the user's questions about programming, coding, and software development in a clear and concise manner.Here also coding courses are available and you can buy and start learning also chat with mentor available. you can also code here beacuse code editor is present. If you don't know the answer, say "I'm not sure about that." Be friendly and professional. 

      User: ${message}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
