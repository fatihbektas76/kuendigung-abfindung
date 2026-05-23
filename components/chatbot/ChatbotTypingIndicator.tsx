'use client';

export default function ChatbotTypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-border rounded-[0_12px_12px_12px] px-4 py-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-[chatbotBounce_0.6s_ease-in-out_infinite]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-[chatbotBounce_0.6s_ease-in-out_0.15s_infinite]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-[chatbotBounce_0.6s_ease-in-out_0.3s_infinite]" />
      </div>
    </div>
  );
}
