'use client';

import { useEffect, useState } from 'react';
import { GateQuestion as GateQuestionType } from '@/lib/types';

interface Props {
  gate: GateQuestionType;
  onAnswer: (fileId: string, answer: string) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export default function GateQuestion({ gate, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // When a hint arrives (wrong answer returned), reset so player can try again
  useEffect(() => {
    if (gate.hint) {
      setSubmitted(false);
      setSelected(null);
    }
  }, [gate.hint]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || submitted) return;
    setSubmitted(true);
    onAnswer(gate.file_id, selected);
  }

  return (
    <div className="shrink-0 border-t border-amber-200 bg-amber-50 px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-amber-700 text-[11px] font-bold uppercase tracking-wider">
          🔒 Clue Gate
        </span>
        <span className="text-[10px] text-gray-500">
          Answer correctly to confirm this clue in your investigation
        </span>
      </div>

      {/* Question */}
      <p className="text-xs text-gray-700 leading-relaxed mb-3">{gate.question}</p>

      {/* Hint (shown after wrong answer) */}
      {gate.hint && (
        <div className="mb-3 bg-amber-100 border border-amber-300 rounded px-3 py-2">
          <span className="text-[11px] text-amber-700">
            💡 <span className="font-medium">Hint:</span> {gate.hint}
          </span>
        </div>
      )}

      {/* Options */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-1.5 mb-3">
          {gate.options.map((opt, i) => {
            const letter = LETTERS[i];
            const isSelected = selected === letter;
            return (
              <label
                key={letter}
                className={`flex items-start gap-2.5 px-3 py-2 rounded cursor-pointer border text-xs transition-colors ${
                  isSelected
                    ? 'border-amber-500 bg-white text-amber-800'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name={`gate-${gate.file_id}`}
                  value={letter}
                  checked={isSelected}
                  onChange={() => !submitted && setSelected(letter)}
                  className="mt-0.5 shrink-0 accent-amber-500"
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={!selected || submitted}
          className="px-4 py-1.5 text-xs font-medium rounded border border-amber-600
                     bg-white text-amber-700 hover:bg-amber-100 transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitted ? 'Checking…' : 'Submit Answer'}
        </button>
      </form>
    </div>
  );
}
