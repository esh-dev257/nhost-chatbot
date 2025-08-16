import { useMutation, useSubscription } from "@apollo/client";
import { SUBSCRIBE_CHATS, INSERT_CHAT } from "../../graphql";
import type { Chat } from "../../types";
import "./ChatList.css";

interface ChatListProps {
  onSelect: (id: string) => void;
  selectedId?: string;
}

export function ChatList({ onSelect, selectedId }: ChatListProps) {
  const { data, loading } = useSubscription(SUBSCRIBE_CHATS);
  const [createChat, { loading: creating }] = useMutation(INSERT_CHAT);

  const handleCreateChat = async () => {
    try {
      await createChat({ variables: { title: "New Chat" } });
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const chats: Chat[] = data?.chats || [];

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Chats</h2>
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
                  onClick={() => onSelect(chat.id)}
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
  );
}
