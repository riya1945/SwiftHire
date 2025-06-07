import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const GeminiApi = async (promptText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(promptText);
    const response = await result.response;
    const text = response.text(); 

    return text;
  } catch (error) {
    throw error;
  }
};
