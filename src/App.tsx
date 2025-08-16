import { useState } from "react";
import { useAuthenticationStatus } from "@nhost/react";
import { Auth, ChatList, ChatWindow, Header } from "./components";
import "./App.css";

export default function App() {
  const { isAuthenticated } = useAuthenticationStatus();
  const [chatId, setChatId] = useState<string | undefined>(undefined);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="app">
      <Header selectedChatId={chatId} />
      <div className="app-body">
        <ChatList onSelect={setChatId} selectedId={chatId} />
        <div className="main-content">
          {chatId ? (
            <ChatWindow chatId={chatId} />
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-content">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M8 10h.01M12 10h.01M16 10h.01" />
                </svg>
                <h2>Welcome to ChatBot AI</h2>
                <p>
                  Select an existing chat or create a new one to start your
                  conversation with our AI assistant.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
