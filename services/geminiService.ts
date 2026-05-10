
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MOCK_LISTINGS, LOCALITIES } from '../constants';

const SYSTEM_INSTRUCTION = `
You are "Saathi AI", a helpful, friendly local assistant for World Wide Web (WWW).
Your goal is to help students, workers, and families find rental rooms globally.

You have access to the following current listings data (context):
${JSON.stringify(MOCK_LISTINGS.map(l => `${l.type} at ${l.locality} for ₹${l.rentPrice}. Amenities: ${l.amenities.join(', ')}`))}

You also know these localities exist: ${LOCALITIES.join(', ')}.

Guidelines:
1. Answer queries about rental prices, best areas for students (usually Siksha Colony), and families (Ram Nagar, Kailash Nagar).
2. Keep answers short, practical, and easy to read.
3. Be polite and welcoming. Use a mix of English and very simple Hindi words if it feels natural (like "Ji", "Bilkul").
4. If asked about contact numbers, say they must click the "Contact Owner" button on the listing card.
5. If someone asks for something not in the list, apologize and suggest they check back later.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat | null => {
  try {
    // Fix: Obtaining API key exclusively from process.env.API_KEY per guidelines
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.warn("API Key missing for Gemini. AI features will not work.");
      return null;
    }

    if (!chatSession) {
      // Fix: Initializing with new GoogleGenAI({apiKey: process.env.API_KEY}) as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatSession = ai.chats.create({
        // Fix: Use 'gemini-3-flash-preview' for basic text tasks instead of deprecated models
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
    return null;
  }
};

export const sendMessageToSaathi = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    if (!chat) {
       return "Saathi AI is currently offline (API Key missing). Please contact admin.";
    }
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    // Fix: Using .text property directly instead of method as per guidelines
    return result.text || "Sorry, I couldn't understand that. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with the connection. Please try again later.";
  }
};
