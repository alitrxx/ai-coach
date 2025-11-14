import type { ChatMessage, DebateDifficulty } from "../types";

export async function getDebateResponse(history: ChatMessage[], difficulty: DebateDifficulty): Promise<ChatMessage> {
  try {
    const response = await fetch('/api/debate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history, difficulty }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred in the API.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching debate response from API route:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get response from the debate coach: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the server.");
  }
}
