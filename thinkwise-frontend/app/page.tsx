'use client';

import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import WelcomeScreen from './components/WelcomeScreen';

export default function Home() {
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const handleStartChat = (message: string) => {
    setInitialMessage(message);
    setIsChatStarted(true);
  };

  return (
    <div className="h-screen p-4 md:p-6 lg:p-8">
      {!isChatStarted ? (
        <WelcomeScreen onStartChat={handleStartChat} />
      ) : (
        <ChatInterface initialMessage={initialMessage} />
      )}
    </div>
  );
}
