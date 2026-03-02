'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/LanguageContext';

interface Props {
  sessionId: string;
  persona: string;
}

function storageKey(sessionId: string, persona: string) {
  return `dojo_notes_${sessionId}_${persona}`;
}

export default function NotesZone({ sessionId, persona }: Props) {
  const { t } = useLang();
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey(sessionId, persona)) ?? '';
    setNotes(stored);
  }, [sessionId, persona]);

  function handleChange(val: string) {
    setNotes(val);
    setSaved(false);

    // Debounced save – 600ms after last keystroke
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(storageKey(sessionId, persona), val);
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    }, 600);
  }

  function handleClear() {
    if (!notes.trim()) return;
    if (!window.confirm(t('notesClearConfirm'))) return;
    setNotes('');
    localStorage.removeItem(storageKey(sessionId, persona));
  }

  const hasNotes = notes.trim().length > 0;
  const wordCount = hasNotes ? notes.trim().split(/\s+/).length : 0;

  return (
    <div className="shrink-0 h-44 border-t-2 border-gray-200 flex flex-col bg-white">

      {/* Header bar */}
      <div className="shrink-0 px-3 py-1.5 flex items-center gap-2 bg-gray-50 border-b border-gray-100">
        <span className="text-[10px] font-semibold text-gray-600 tracking-wide">
          {t('notesHeader')}
        </span>

        <span className="flex-1" />

        {/* Save indicator */}
        {saved && (
          <span className="text-[9px] text-[#00a651] font-medium">
            {t('notesSavedIndicator')}
          </span>
        )}

        {/* Word count */}
        {hasNotes && (
          <span className="text-[9px] text-gray-400">
            {wordCount} {t('notesWords')}
          </span>
        )}

        {/* Clear button */}
        {hasNotes && (
          <button
            onClick={handleClear}
            className="text-[9px] text-red-400 hover:text-red-600 transition-colors"
          >
            {t('notesClear')}
          </button>
        )}
      </div>

      {/* Textarea — fills all remaining height */}
      <textarea
        value={notes}
        onChange={e => handleChange(e.target.value)}
        placeholder={t('notesPlaceholder')}
        className="flex-1 w-full resize-none px-3 py-2 text-[11px] text-gray-700 placeholder-gray-300
                   leading-relaxed focus:outline-none bg-white font-mono min-h-0"
        spellCheck={false}
      />

      {/* Footer */}
      <div className="shrink-0 px-3 py-1 border-t border-gray-100 bg-gray-50">
        <span className="text-[9px] text-gray-400">{t('notesPrivate')}</span>
      </div>
    </div>
  );
}
