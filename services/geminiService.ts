import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client && apiKey) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const createChatSession = (): Chat | null => {
  const genAI = getClient();
  if (!genAI) {
    console.warn("Gemini API Key is missing.");
    return null;
  }

  return genAI.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are 'Coach Pro', a helpful, encouraging, and professional career coach. You assist users with job searching, CV improvement, interview preparation, and career advice. Keep answers concise, actionable, and formatted nicely.",
    },
  });
};
