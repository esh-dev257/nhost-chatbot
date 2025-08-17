// Header.jsx with hamburger menu
import { useSignOut, useUserEmail } from "@nhost/react";
import { useState } from "react";
import "./Header.css";

// Update the interface in Header.tsx
interface HeaderProps {
  selectedChatId?: string;
  toggleSidebar: () => void;  // Add this
  isSidebarOpen: boolean;     // Add this
}
export function Header({ selectedChatId, toggleSidebar, isSidebarOpen }: HeaderProps) {
  const { signOut } = useSignOut();
  const email = useUserEmail();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="menu-toggle" 
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isSidebarOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
          
          <h1 className="app-title">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" />
            </svg>
            ChatBot AI
          </h1>
          
          {selectedChatId && (
            <div className="chat-status">
              <span className="status-indicator active" />
              Active Chat
            </div>
          )}
        </div>

        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="user-email">{email}</span>
          </div>

          <button
            onClick={() => signOut()}
            className="sign-out-button"
            title="Sign out"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}