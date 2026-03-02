'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileContent, GateQuestion as GateQuestionType } from '@/lib/types';
import GateQuestion from './GateQuestion';

interface Props {
  file: FileContent | null;
  loading: boolean;
  currentFileId: string | null;
  pendingGate: GateQuestionType | null;
  onGateAnswer: (fileId: string, answer: string) => void;
  persona: string;
}

// ── CSV table renderer ─────────────────────────────────────────────────────────

/** Naïve CSV parser — handles basic quoted fields. */
function parseCSV(raw: string): string[][] {
  return raw
    .trim()
    .split('\n')
    .map(line =>
      line.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''))
    );
}

function CSVTable({ content }: { content: string }) {
  const rows = parseCSV(content);
  if (rows.length === 0) return null;
  const [header, ...body] = rows;
  return (
    <div className="overflow-x-auto">
      <table className="text-xs border-collapse w-full">
        <thead>
          <tr className="bg-gray-100 sticky top-0 z-10">
            {header.map((h, i) => (
              <th
                key={i}
                className="text-left px-2 py-1.5 border border-gray-200 font-semibold text-gray-700 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-2 py-1 border border-gray-200 text-gray-700 whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Markdown renderer ──────────────────────────────────────────────────────────

function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-sm font-bold text-gray-900 mt-4 mb-2 pb-1 border-b border-gray-200 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xs font-bold text-gray-800 mt-3 mb-1.5 uppercase tracking-wide">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xs font-semibold text-gray-700 mt-2 mb-1">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-xs leading-relaxed text-gray-700 mb-2">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-600">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-outside pl-4 text-xs text-gray-700 mb-2 space-y-0.5">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside pl-4 text-xs text-gray-700 mb-2 space-y-0.5">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-xs text-gray-700 leading-relaxed">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-gray-300 pl-3 text-xs text-gray-500 italic my-2">
            {children}
          </blockquote>
        ),
        // Block code — pre wraps code for fenced blocks
        pre: ({ children }) => (
          <pre className="bg-gray-50 border border-gray-200 rounded p-3 text-[11px] font-mono overflow-x-auto whitespace-pre-wrap mb-2 leading-relaxed">
            {children}
          </pre>
        ),
        // Inline code (block code is handled by <pre> above)
        code: ({ className, children }) => (
          <code
            className={
              className
                ? className // language class from fenced block — style inherited from <pre>
                : 'bg-gray-100 text-gray-800 px-1 rounded text-[11px] font-mono'
            }
          >
            {children}
          </code>
        ),
        // GFM tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-2">
            <table className="text-xs border-collapse w-full">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="text-left px-2 py-1 border border-gray-200 bg-gray-100 font-semibold text-gray-700 whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-2 py-1 border border-gray-200 text-gray-700">{children}</td>
        ),
        hr: () => <hr className="border-gray-200 my-3" />,
        // Images — render inline if the backend includes image URLs
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt ?? ''}
            className="max-w-full rounded border border-gray-200 my-2 shadow-sm"
            loading="lazy"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function DocumentViewer({
  file,
  loading,
  currentFileId,
  pendingGate,
  onGateAnswer,
  persona,
}: Props) {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-xs">
        <span className="blink">Loading document...</span>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
        <div className="text-3xl opacity-30">📁</div>
        <div className="text-xs text-center max-w-xs text-gray-500">
          Select a file from the explorer to view its contents.
          <br />
          <span className="text-amber-600">Amber dots</span> indicate unread files.
          <br />
          <span className="text-amber-600">🔒</span> indicates a clue gate to answer.
        </div>
      </div>
    );
  }

  const isTabular = file.type === 'csv' || file.type === 'xlsx';
  const icon = file.type === 'csv' ? '📊' : file.type === 'xlsx' ? '📈' : '📄';

  // Show gate overlay only when the pending gate matches the currently open file
  const showGate = pendingGate !== null && pendingGate.file_id === currentFileId;

  return (
    <div className="h-full flex flex-col">
      {/* File header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 shrink-0 bg-gray-50">
        <span>{icon}</span>
        <span className="text-gray-800 text-xs font-medium truncate">{file.name}</span>
        {showGate && (
          <span className="ml-1 text-amber-600 text-[10px] font-semibold shrink-0">🔒 Gate</span>
        )}
        <span className="ml-auto shrink-0 tag-blue">{file.type.toUpperCase()}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {isTabular ? (
          <CSVTable content={file.content} />
        ) : (
          <MarkdownBody content={file.content} />
        )}
      </div>

      {/* Gate question — shown below document when gate is pending for this file */}
      {showGate && pendingGate && (
        <GateQuestion gate={pendingGate} onAnswer={onGateAnswer} />
      )}

      {/* AI hint footer */}
      {!showGate && (
        <div className="shrink-0 border-t border-gray-200 px-4 py-2 text-xs text-gray-400 bg-gray-50">
          💡 Tip: Copy sections of this document and ask Claude or ChatGPT to help you interpret the data and find connections.
        </div>
      )}
    </div>
  );
}
