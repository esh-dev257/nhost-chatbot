import { gql } from '@apollo/client';

export const SUBSCRIBE_CHATS = gql`
  subscription MyChats {
    chats(order_by: { updated_at: desc }) {
      id
      title
      updated_at
    }
  }
`;

export const SUBSCRIBE_MESSAGES = gql`
  subscription ChatMessages($chat_id: uuid!) {
    messages(
      where: { chat_id: { _eq: $chat_id } }
      order_by: { created_at: asc }
    ) {
      id
      sender
      content
      created_at
    }
  }
`;

export const INSERT_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
    }
  }
`;

export const INSERT_USER_MESSAGE = gql`
  mutation InsertUserMessage($chat_id: uuid!, $content: String!) {
    insert_messages_one(object: { chat_id: $chat_id, content: $content }) {
      id
    }
  }
`;

export const SEND_MESSAGE_ACTION = gql`
  mutation SendMessage($chat_id: uuid!, $content: String!) {
    sendMessage(input: { chat_id: $chat_id, content: $content }) {
      id
      content
      created_at
    }
  }
`;