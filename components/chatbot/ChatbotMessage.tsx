'use client';

import type { ChatMessage } from '@/lib/chatbot/types';

interface Props {
  message: ChatMessage;
  isFirstBot?: boolean;
}

export default function ChatbotMessage({ message, isFirstBot }: Props) {
  const isBot = message.role === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] ${isBot ? '' : 'max-w-[75%]'}`}>
        {isBot && isFirstBot && (
          <p className="text-[0.72rem] font-semibold text-gold-dark mb-1 ml-1">
            APOS Legal
          </p>
        )}
        <div
          className={
            isBot
              ? 'bg-white border border-border rounded-[0_12px_12px_12px] px-4 py-3 text-[0.88rem] text-ink-light leading-relaxed'
              : 'bg-gold-dark rounded-[12px_0_12px_12px] px-4 py-2.5 text-[0.88rem] text-white font-medium leading-relaxed'
          }
        >
          {message.text.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
