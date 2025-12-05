
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MOCK_LISTINGS, LOCALITIES } from '../constants';

const SYSTEM_INSTRUCTION = `
You are "Saathi AI", a helpful, friendly local assistant for Kawardha Room Saathi.
Your goal is to help students, workers, and families find rental rooms in Kawardha city.

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
    // Safety check for browser environment
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
    
    if (!apiKey) {
      console.warn("API Key missing for Gemini. AI features will not work.");
      return null;
    }

    if (!chatSession) {
      const ai = new GoogleGenAI({ apiKey });
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
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
    return result.text || "Sorry, I couldn't understand that. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong with the connection. Please try again later.";
  }
};
