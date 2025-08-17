import { useState } from "react";
import { useAuthenticationStatus } from "@nhost/react";
import { Auth, ChatList, ChatWindow, Header } from "./components";
import "./App.css";

export default function App() {
  const { isAuthenticated } = useAuthenticationStatus();
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  // Add state to track sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle function for the hamburger menu
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="app">
      {/* Pass toggle function and current state to Header */}
      <Header 
        selectedChatId={chatId} 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
      />
      <div className="app-body">
        {/* Pass isOpen state to ChatList */}
        <ChatList 
          onSelect={setChatId} 
          selectedId={chatId} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
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