'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EscapeResult } from '@/lib/types';

interface Props {
  onSubmit: (rootCause: string, recommendedAction: string) => void;
  escapeResult: EscapeResult | null;
  evaluating: boolean;
  disabled: boolean;
  connected: boolean;
  myPersona: string;
  submittedPersonas: string[];
  totalPlayers: number;
}

const PERSONA_LABEL: Record<string, string> = {
  supply_chain_manager: 'Supply Chain Mgr',
  finance_analyst: 'Finance Analyst',
};

export default function EscapeSubmit({
  onSubmit,
  escapeResult,
  evaluating,
  disabled,
  connected,
  myPersona,
  submittedPersonas,
  totalPlayers,
}: Props) {
  const [rootCause, setRootCause] = useState('');
  const [action, setAction] = useState('');
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const iHaveSubmitted = submittedPersonas.includes(myPersona);
  const waitingForPartner = iHaveSubmitted && submittedPersonas.length < totalPlayers && !evaluating;

  // Reset submitting state once server confirms via WS (iHaveSubmitted flips to true)
  useEffect(() => {
    if (iHaveSubmitted) setSubmitting(false);
  }, [iHaveSubmitted]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rootCause.trim() || !action.trim()) return;
    if (!connected) return;
    onSubmit(rootCause.trim(), action.trim());
    setSubmitting(true);
    // Do NOT close the form — wait for server confirmation via WebSocket
  }

  // ── Result screen ──────────────────────────────────────────────
  if (escapeResult) {
    const success = escapeResult.success;
    return (
      <div
        className={`border rounded-lg p-4 ${
          success
            ? 'bg-emerald-50 border-emerald-300'
            : 'bg-red-50 border-red-300'
        }`}
      >
        {/* Header row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{success ? '✅' : '❌'}</span>
          <span className={`font-bold text-sm ${success ? 'text-emerald-700' : 'text-red-700'}`}>
            {success ? 'ESCAPED — Crisis averted!' : 'ATTEMPT FAILED'}
          </span>
          <span className="ml-auto text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded px-2 py-0.5">
            Score: {escapeResult.score}/100
          </span>
        </div>

        {/* Short evaluation summary */}
        {escapeResult.evaluation && (
          <p className="text-xs text-gray-700 leading-relaxed mb-4 border-b border-gray-200 pb-3">
            {escapeResult.evaluation}
          </p>
        )}

        {/* Full debrief — always visible, rendered as markdown */}
        {escapeResult.debrief && (
          <div className="prose prose-xs max-w-none text-gray-700 overflow-y-auto max-h-[60vh] pr-1
                          [&_h2]:text-xs [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-4 [&_h2]:mb-1
                          [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:text-gray-700 [&_h3]:mt-3 [&_h3]:mb-1
                          [&_p]:text-xs [&_p]:leading-relaxed [&_p]:mb-2
                          [&_ul]:text-xs [&_ul]:pl-4 [&_ul]:mb-2 [&_ul]:space-y-0.5
                          [&_ol]:text-xs [&_ol]:pl-4 [&_ol]:mb-2 [&_ol]:space-y-0.5
                          [&_li]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-gray-800">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {escapeResult.debrief}
            </ReactMarkdown>
          </div>
        )}

        {!success && !disabled && (
          <button onClick={() => setOpen(true)} className="mt-3 btn-ghost text-xs">
            Try again
          </button>
        )}
      </div>
    );
  }

  // ── Waiting for partner ────────────────────────────────────────
  if (waitingForPartner) {
    return (
      <div className="border border-amber-300 rounded-lg p-4 bg-amber-50 text-center">
        <div className="text-amber-700 text-sm font-medium mb-1">
          ⏳ Submission received
        </div>
        <div className="text-xs text-gray-600 mb-3">
          Waiting for partner to submit…
        </div>
        <div className="flex flex-col gap-1">
          {Object.keys(PERSONA_LABEL).map(p => (
            <div key={p} className="flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  submittedPersonas.includes(p) ? 'bg-[#00a651]' : 'bg-gray-300'
                }`}
              />
              <span className={submittedPersonas.includes(p) ? 'text-[#00a651]' : 'text-gray-500'}>
                {PERSONA_LABEL[p]} {p === myPersona ? '(you)' : ''}
              </span>
              {submittedPersonas.includes(p) && (
                <span className="text-green-600 text-[10px]">✓ submitted</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Evaluating spinner ─────────────────────────────────────────
  if (evaluating) {
    return (
      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 text-center">
        <div className="flex items-center justify-center gap-2 text-blue-600 text-sm font-medium mb-1">
          <span className="inline-block w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin" />
          Evaluating…
        </div>
        <div className="text-xs text-gray-500">Claude is reviewing your combined submissions</div>
      </div>
    );
  }

  // ── Collapsed button ───────────────────────────────────────────
  if (!open && !iHaveSubmitted) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 text-center bg-white">
        <div className="text-xs text-gray-600 mb-3">
          Identified the root cause? Ready to recommend action?
        </div>
        {!connected && (
          <div className="text-[11px] text-red-600 mb-2">
            ⚠ Reconnecting… submission unavailable
          </div>
        )}
        <button
          onClick={() => setOpen(true)}
          disabled={disabled || !connected}
          className="btn-danger text-xs disabled:opacity-40"
        >
          🚨 Submit Escape Attempt
        </button>
      </div>
    );
  }

  // ── Open form ──────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="border border-red-200 rounded-lg p-4 bg-red-50 space-y-3"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
          Escape Submission
        </span>
        {!submitting && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-xs"
          >
            Cancel
          </button>
        )}
      </div>

      <div>
        <label className="block text-[11px] text-gray-600 mb-1">
          Root Cause Analysis<span className="text-red-500 ml-0.5">*</span>
        </label>
        <textarea
          value={rootCause}
          onChange={e => setRootCause(e.target.value)}
          disabled={submitting}
          rows={4}
          placeholder="Explain the cascading failure: what happened, why, how it caused the supply stoppage…"
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs
                     text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400
                     resize-none leading-relaxed disabled:opacity-60"
        />
      </div>

      <div>
        <label className="block text-[11px] text-gray-600 mb-1">
          Recommended Immediate Actions<span className="text-red-500 ml-0.5">*</span>
        </label>
        <textarea
          value={action}
          onChange={e => setAction(e.target.value)}
          disabled={submitting}
          rows={3}
          placeholder="What must the executive team do RIGHT NOW to prevent line stoppage?"
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs
                     text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400
                     resize-none leading-relaxed disabled:opacity-60"
        />
      </div>

      {!connected && (
        <div className="text-[11px] text-red-600">
          ⚠ Reconnecting… please wait before submitting
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        <button
          type="submit"
          disabled={disabled || !connected || !rootCause.trim() || !action.trim() || submitting}
          className="btn-danger text-xs disabled:opacity-40 flex items-center gap-1.5"
        >
          {submitting ? (
            <>
              <span className="inline-block w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              Submitting…
            </>
          ) : (
            'Submit to Evaluator'
          )}
        </button>
        <span className="text-[10px] text-gray-500">Both players must submit</span>
      </div>
    </form>
  );
}
