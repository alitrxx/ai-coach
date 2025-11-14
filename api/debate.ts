// This file is a Vercel Serverless Function that acts as a secure backend.
import { GoogleGenAI, Type, Content } from "@google/genai";
import type { ChatMessage, DebateDifficulty } from "../types";

// This function will be deployed as a serverless API route at /api/debate
export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.API_KEY) {
    return new Response(JSON.stringify({ error: 'API_KEY environment variable not set on the server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    const { history, difficulty } = await request.json() as { history: ChatMessage[], difficulty: DebateDifficulty };

    if (!history || !difficulty) {
        return new Response(JSON.stringify({ error: 'Missing history or difficulty in request body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-pro';

    const debateResponseSchema = {
        type: Type.OBJECT,
        properties: {
            response: {
            type: Type.STRING,
            description: 'Your counter-argument or question in Persian. It must be challenging but respectful.'
            },
            coaching_feedback: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
                name: { type: Type.STRING, description: 'The name of the logical fallacy detected in the user\'s last argument (e.g., "Ad Hominem", "Straw Man") in Persian.' },
                explanation: { type: Type.STRING, description: 'A brief explanation of why the user\'s argument is a fallacy, in Persian.' },
                suggestion: { type: Type.STRING, description: 'A constructive suggestion for how the user could improve or rephrase their argument to be more logical. This must be a practical tip. In Persian.'}
            }
            }
        },
        required: ['response', 'coaching_feedback']
    };

    const getSystemInstruction = (difficulty: DebateDifficulty): string => {
        const coreInstruction = `You are an expert debate coach and a world-class logician named 'Logos'. Your role is to help the user strengthen their arguments by engaging them in a debate. You must follow these rules strictly:
1.  Your entire response must be in Persian.
2.  Analyze the user's latest argument for logical fallacies, weaknesses, and unsubstantiated claims.
3.  Formulate a strong, logical counter-argument. You can ask clarifying questions or challenge their premises.
4.  If you identify a specific logical fallacy or a significant weakness in the user's argument, you MUST populate the 'coaching_feedback' object with the fallacy name, explanation, and a constructive suggestion. If there is no clear fallacy, this object MUST be null.
5.  Maintain a professional, objective, and constructive tone. Do not be aggressive. Your purpose is to educate and challenge.
6.  Keep your responses concise and focused on a single point or counter-argument.
7.  The user has started the debate. This is their first message. Now, provide your first response based on their initial stance.`;

        switch (difficulty) {
            case 'easy':
                return `DIFFICULTY: EASY\n${coreInstruction}\nYour tone should be more supportive and encouraging. Focus on explaining concepts simply. Your suggestions should be very clear and easy to follow. Your counter-arguments should be gentle probes rather than direct attacks.`;
            case 'hard':
                return `DIFFICULTY: HARD\n${coreInstruction}\nYour persona is that of a master logician. Be highly critical and scrutinize every detail for the slightest weakness. Your counter-arguments should be sophisticated and challenging. Your suggestions for improvement should push the user towards more complex and nuanced reasoning.`;
            case 'medium':
            default:
                return `DIFFICULTY: MEDIUM\n${coreInstruction}\nYour tone is that of a challenging but fair opponent. Your counter-arguments should be direct and logical. Your suggestions should be practical and aimed at fixing the core flaw in their argument.`;
        }
    }

    const contents: Content[] = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
            systemInstruction: getSystemInstruction(difficulty),
            responseMimeType: "application/json",
            responseSchema: debateResponseSchema,
            temperature: 0.8,
        }
    });

    const responseJsonStr = response.text.trim();
    const parsedResponse = JSON.parse(responseJsonStr);

    const result: ChatMessage = {
      role: 'model',
      content: parsedResponse.response,
      coachingFeedback: parsedResponse.coaching_feedback,
    };
    
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/debate:", error);
    return new Response(JSON.stringify({ error: "Failed to get a response from the AI debate coach." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}
