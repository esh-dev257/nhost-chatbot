// ChatList.jsx with responsive drawer functionality
import { useMutation, useSubscription } from "@apollo/client";
import { SUBSCRIBE_CHATS, INSERT_CHAT } from "../../graphql";
import { useEffect } from "react";
import type { Chat } from "../../types";
import "./ChatList.css";

// Update the interface in ChatList.tsx
interface ChatListProps {
  onSelect: (id: string) => void;
  selectedId?: string;
  isOpen: boolean;           // Add this
  onClose: () => void;       // Add this
}

export function ChatList({ onSelect, selectedId, isOpen, onClose }: ChatListProps) {
  const { data, loading } = useSubscription(SUBSCRIBE_CHATS);
  const [createChat, { loading: creating }] = useMutation(INSERT_CHAT);

  // Close sidebar on selection in mobile view
  const handleSelectChat = (id: string) => {
    onSelect(id);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const handleCreateChat = async () => {
    try {
      await createChat({ variables: { title: "New Chat" } });
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const chats: Chat[] = data?.chats || [];

  return (
    <>
      <div 
        className={`chat-list-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className={`chat-list ${isOpen ? 'active' : ''}`}>
        <div className="chat-list-header">
          <h2>
            Chats
            <button className="header-close-btn" onClick={onClose} aria-label="Close sidebar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </h2>
          
          <button
            onClick={handleCreateChat}
            disabled={creating}
            className="new-chat-button"
            title="Start new chat"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Chat
          </button>
        </div>

        <div className="chat-list-content">
          {loading ? (
            <div className="chat-list-loading">
              <div className="loading-spinner" />
              <span>Loading chats...</span>
            </div>
          ) : chats.length === 0 ? (
            <div className="chat-list-empty">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p>No chats yet</p>
              <small>Start a new conversation to begin</small>
            </div>
          ) : (
            <ul className="chat-list-items">
              {chats.map((chat) => (
                <li key={chat.id}>
                  <button
                    onClick={() => handleSelectChat(chat.id)}
                    className={`chat-item ${
                      selectedId === chat.id ? "active" : ""
                    }`}
                  >
                    <div className="chat-item-content">
                      <div className="chat-title">
                        {chat.title || "Untitled Chat"}
                      </div>
                      <div className="chat-date">
                        {new Date(chat.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="chat-item-indicator" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}