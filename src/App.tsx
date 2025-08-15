import { useState } from 'react';
import {
  useAuthenticationStatus,
  useSignInEmailPassword,
  useSignUpEmailPassword,
  useUserEmail,
  useSignOut
} from '@nhost/react';
import { useMutation, useSubscription } from '@apollo/client';
import {
  SUBSCRIBE_CHATS,
  SUBSCRIBE_MESSAGES,
  INSERT_CHAT,
  INSERT_USER_MESSAGE,
  SEND_MESSAGE_ACTION
} from './graphql';

function Auth() {
  const { isAuthenticated } = useAuthenticationStatus();
  const email = useUserEmail();
  const { signInEmailPassword, isLoading: signingIn, error: signInError } = useSignInEmailPassword();
  const { signUpEmailPassword, isLoading: signingUp, error: signUpError } = useSignUpEmailPassword();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [form, setForm] = useState({ email: '', password: '' });

  if (isAuthenticated) return <div style={{ padding: 16 }}>Signed in as {email}</div>;

  const onSubmit = async () => {
    if (mode === 'signin') await signInEmailPassword(form.email, form.password);
    else await signUpEmailPassword(form.email, form.password);
  };

  return (
    <div style={{ maxWidth: 360, margin: '48px auto', display: 'grid', gap: 8 }}>
      <h3>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h3>
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={onSubmit} disabled={signingIn || signingUp}>
        {mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </button>
      {(signInError || signUpError) && <p style={{ color: 'red' }}>{(signInError || signUpError)?.message}</p>}
      <small>
        {mode === 'signin' ? 'No account?' : 'Have an account?'}{' '}
        <a onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} style={{ cursor: 'pointer' }}>
          {mode === 'signin' ? 'Sign up' : 'Sign in'}
        </a>
      </small>
    </div>
  );
}

function ChatList({ onSelect, selectedId }: { onSelect: (id: string) => void; selectedId?: string }) {
  const { data } = useSubscription(SUBSCRIBE_CHATS);
  const [createChat] = useMutation(INSERT_CHAT);

  return (
    <div style={{ width: 260, borderRight: '1px solid #ddd', padding: 12 }}>
      <button onClick={() => createChat({ variables: { title: 'New chat' } })}>+ New Chat</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.chats?.map((c: any) => (
          <li
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{
              cursor: 'pointer',
              padding: '8px 4px',
              background: selectedId === c.id ? '#eef' : 'transparent'
            }}
          >
            {c.title || 'Untitled'}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChatWindow({ chatId }: { chatId: string }) {
  const { data } = useSubscription(SUBSCRIBE_MESSAGES, { variables: { chat_id: chatId }, skip: !chatId });
  const [text, setText] = useState('');
  const [insertUserMessage] = useMutation(INSERT_USER_MESSAGE);
  const [sendMessage] = useMutation(SEND_MESSAGE_ACTION);

  const send = async () => {
    const content = text.trim();
    if (!content) return;
    setText('');
    await insertUserMessage({ variables: { chat_id: chatId, content } });
    await sendMessage({ variables: { chat_id: chatId, content } });
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: 12, overflow: 'auto' }}>
        {(data?.messages || []).map((m: any) => (
          <div key={m.id} style={{ margin: '8px 0', textAlign: m.sender === 'user' ? 'right' : 'left' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 8,
                background: m.sender === 'user' ? '#e8f0ff' : '#f2f2f2'
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, padding: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1 }}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}

export default function App() {
  const { isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();
  const [chatId, setChatId] = useState<string | undefined>(undefined);

  if (!isAuthenticated) return <Auth />;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatList onSelect={setChatId} selectedId={chatId} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 8, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
          <strong>{chatId ? 'Chat' : 'Pick a chat'}</strong>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        {chatId ? <ChatWindow chatId={chatId} /> : <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>Select or create a chat</div>}
      </div>
    </div>
  );
}