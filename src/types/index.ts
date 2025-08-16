export interface Chat {
  id: string;
  title: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  created_at: string;
  chat_id: string;
}

export interface User {
  id: string;
  email: string;
}

export type AuthMode = "signin" | "signup";
