'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { WarRoomMessage } from '@/lib/types';

interface Props {
  messages: WarRoomMessage[];
  persona: string;
  onSend: (content: string) => void;
  onRequestHint: () => void;
  disabled: boolean;
}

const PERSONA_COLORS: Record<string, string> = {
  supply_chain_manager: 'text-blue-600',
  finance_analyst: 'text-purple-600',
  COACH: 'text-amber-600',
};

const PERSONA_LABELS: Record<string, string> = {
  supply_chain_manager: 'SCM',
  finance_analyst: 'FIN',
  COACH: 'ADVISOR',
};

function formatTime(ts: string): string {
  try {
    return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  } catch {
    return '';
  }
}

export default function WarRoom({ messages, persona, onSend, onRequestHint, disabled }: Props) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || disabled) return;
    onSend(text);
    setInput('');
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-200 flex items-center gap-2 shrink-0 bg-gray-50">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-slow" />
        <span className="text-xs text-gray-500 uppercase tracking-widest">War Room</span>
        <span className="ml-auto text-xs text-gray-400">{messages.length} messages</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-white">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-xs py-8">
            No messages yet. Share your findings here.
          </div>
        )}
        {messages.map(msg => {
          const isCoach = msg.persona === 'COACH';
          const isMine = msg.persona === persona;
          const color = PERSONA_COLORS[msg.persona] ?? 'text-gray-500';
          const label = PERSONA_LABELS[msg.persona] ?? msg.persona;

          return (
            <div
              key={msg.id}
              className={`rounded p-2.5 text-xs ${
                isCoach
                  ? 'bg-amber-50 border border-amber-200'
                  : isMine
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`font-bold ${color}`}>[{label}]</span>
                <span className="text-gray-400 text-[10px]">{formatTime(msg.timestamp)}</span>
                {isCoach && <span className="tag-amber">ADVISOR</span>}
              </div>
              {msg.message_type !== 'player' ? (
                <div className="text-gray-700 leading-relaxed prose prose-xs max-w-none
                                prose-p:my-1 prose-headings:my-1 prose-headings:text-gray-800
                                prose-strong:text-gray-800 prose-ul:my-1 prose-li:my-0
                                prose-ol:my-1 prose-code:text-[11px] prose-code:bg-gray-100
                                prose-code:px-1 prose-code:rounded">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-gray-200 p-3 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={disabled}
            placeholder={disabled ? 'Game not active...' : 'Share a finding or ask the team...'}
            className="flex-1 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs
                       text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500
                       disabled:opacity-40"
          />
          <button type="submit" disabled={disabled || !input.trim()} className="btn-primary">
            Send
          </button>
        </form>
        <div className="mt-1.5 flex justify-end">
          <button
            onClick={onRequestHint}
            disabled={disabled}
            className="btn-ghost text-[11px]"
          >
            💡 Request advisor hint
          </button>
        </div>
      </div>
    </div>
  );
}
