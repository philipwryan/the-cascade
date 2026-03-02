'use client';

import { FileInfo } from '@/lib/types';

interface Props {
  files: FileInfo[];
  openedFiles: string[];
  selectedFileId: string | null;
  onSelect: (fileId: string) => void;
}

const folderOrder = ['operations', 'alerts', 'reports', 'accounts_receivable', 'risk', 'market_data', 'policies'];

const FILE_ICONS: Record<string, string> = {
  csv: '📊',
  txt: '📄',
  pdf: '📋',
  xlsx: '📈',
  docx: '📝',
};

export default function FileExplorer({ files, openedFiles, selectedFileId, onSelect }: Props) {
  // Group files by folder
  const grouped: Record<string, FileInfo[]> = {};
  for (const f of files) {
    const folder = f.folder || 'root';
    if (!grouped[folder]) grouped[folder] = [];
    grouped[folder].push(f);
  }

  const folders = Object.keys(grouped).sort(
    (a, b) => (folderOrder.indexOf(a) ?? 99) - (folderOrder.indexOf(b) ?? 99)
  );

  return (
    <div className="h-full overflow-y-auto px-2 py-3">
      <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 px-1">
        File Explorer
      </div>
      {folders.map(folder => (
        <div key={folder} className="mb-3">
          <div className="text-xs text-gray-500 px-1 mb-1 flex items-center gap-1">
            <span>▾</span>
            <span className="uppercase tracking-wider">{folder.replace(/_/g, ' ')}</span>
          </div>
          {grouped[folder].map(file => {
            const isOpen = openedFiles.includes(file.id);
            const isSelected = selectedFileId === file.id;
            const icon = FILE_ICONS[file.type] ?? '📄';
            return (
              <button
                key={file.id}
                onClick={() => onSelect(file.id)}
                className={`
                  w-full text-left px-2 py-1.5 rounded text-xs flex items-start gap-2
                  transition-colors hover:bg-gray-100
                  ${isSelected ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500' : 'text-gray-600'}
                  ${isOpen && !isSelected ? 'text-gray-700' : ''}
                `}
              >
                <span className="shrink-0 mt-0.5">{icon}</span>
                <span className="truncate leading-tight flex-1">{file.name}</span>
                {!isOpen && (
                  <span className="shrink-0 self-center w-1.5 h-1.5 rounded-full bg-amber-500" title="Unread" />
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
