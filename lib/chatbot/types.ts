export type MessageRole = 'bot' | 'user';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  isLeadForm?: boolean;
  isLeadSuccess?: boolean;
}

export interface ChatbotLeadData {
  name: string;
  email: string;
  phone?: string;
  chatSummary: string;
  topicCategory: string;
  pageUrl: string;
}
