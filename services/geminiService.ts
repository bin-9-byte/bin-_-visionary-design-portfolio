import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `
You are NEXUS AI, the digital assistant for a world-class product designer named Alex.
Style: Professional, concise, slightly futuristic, and confident.
Goal: Help visitors understand Alex's design philosophy, availability, and skillset.

Key Info about Alex:
- Specializes in UI/UX, Motion Design, and Frontend Engineering.
- Philosophy: "Form follows function, but emotion drives adoption."
- Availability: Currently open for freelance projects starting next month.
- Contact: Suggest they use the contact form below for inquiries.
- Location: Digital nomad, currently based in Tokyo time zone.

Keep responses under 50 words unless asked for a detailed explanation.
`;

export const sendMessageToGemini = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm processing a complex design pattern. Try again in a moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection to the neural link failed. Please try again later.";
  }
};