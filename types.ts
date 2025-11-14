export type DebateDifficulty = 'easy' | 'medium' | 'hard';

export interface CoachingFeedback {
  name: string;
  explanation: string;
  suggestion: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  coachingFeedback?: CoachingFeedback | null;
}
