import { useSignOut, useUserEmail } from "@nhost/react";
import "./Header.css";

interface HeaderProps {
  selectedChatId?: string;
}

export function Header({ selectedChatId }: HeaderProps) {
  const { signOut } = useSignOut();
  const email = useUserEmail();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
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
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
