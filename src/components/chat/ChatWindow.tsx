import { useState, useRef, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import {
  SUBSCRIBE_MESSAGES,
  INSERT_USER_MESSAGE,
  SEND_MESSAGE_ACTION,
} from "../../graphql";
import type { Message } from "../../types";
import "./ChatWindow.css";

interface ChatWindowProps {
  chatId: string;
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  const { data, loading } = useSubscription(SUBSCRIBE_MESSAGES, {
    variables: { chat_id: chatId },
    skip: !chatId,
  });
  const [text, setText] = useState("");
  const [insertUserMessage] = useMutation(INSERT_USER_MESSAGE);
  const [sendMessage] = useMutation(SEND_MESSAGE_ACTION);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messages: Message[] = data?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  const handleSend = async () => {
    const content = text.trim();
    if (!content) return;

    setText("");
    try {
      await insertUserMessage({ variables: { chat_id: chatId, content } });
      await sendMessage({ variables: { chat_id: chatId, content } });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {loading ? (
          <div className="messages-loading">
            <div className="loading-spinner" />
            <span>Loading messages...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="messages-empty">
            <div className="welcome-message">
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
              <h3>Start a conversation</h3>
              <p>Send a message to begin chatting with the AI assistant.</p>
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "user" ? "user" : "assistant"
                }`}
              >
                <div className="message-avatar">
                  {message.sender === "user" ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <div className="message-text">{message.content}</div>
                  </div>
                  <div className="message-time">
                    {formatTime(message.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            className="message-input"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="send-button"
            title="Send message"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
