'use client';

import React from 'react';

interface MarkdownMessageProps {
  content: string;
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
  if (!content) return null;

  // Split lines into blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: React.ReactNode[] } | null = null;
  let codeBlock: { language: string; lines: string[] } | null = null;

  const flushList = (key: string) => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      elements.push(
        <ul key={key} className="space-y-1.5 my-2 pl-4 list-disc marker:text-indigo-400">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="text-slate-200 text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={key} className="space-y-1.5 my-2 pl-4 list-decimal marker:text-indigo-400 font-medium">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="text-slate-200 text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  const parseInline = (text: string): React.ReactNode[] => {
    // Regex for bold (**bold**), inline code (`code`), italic (*italic*)
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const matchedText = match[0];
      if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-bold text-indigo-300">
            {matchedText.slice(2, -2)}
          </strong>
        );
      } else if (matchedText.startsWith('`') && matchedText.endsWith('`')) {
        parts.push(
          <code
            key={match.index}
            className="px-1.5 py-0.5 rounded-md bg-slate-800 text-amber-300 text-xs font-mono font-semibold"
          >
            {matchedText.slice(1, -1)}
          </code>
        );
      } else if (matchedText.startsWith('*') && matchedText.endsWith('*')) {
        parts.push(
          <em key={match.index} className="italic text-slate-300">
            {matchedText.slice(1, -1)}
          </em>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trimEnd();

    // Check code blocks
    if (line.startsWith('```')) {
      if (codeBlock) {
        // Close code block
        elements.push(
          <pre
            key={`code-${index}`}
            className="my-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed"
          >
            <code>{codeBlock.lines.join('\n')}</code>
          </pre>
        );
        codeBlock = null;
      } else {
        flushList(`list-before-code-${index}`);
        codeBlock = { language: line.slice(3).trim(), lines: [] };
      }
      return;
    }

    if (codeBlock) {
      codeBlock.lines.push(rawLine);
      return;
    }

    // Blank lines
    if (!line.trim()) {
      flushList(`list-before-blank-${index}`);
      return;
    }

    // Headings
    if (line.startsWith('### ')) {
      flushList(`list-before-h3-${index}`);
      elements.push(
        <h4 key={`h3-${index}`} className="text-sm font-bold text-white uppercase tracking-wider mt-3 mb-1.5">
          {parseInline(line.slice(4))}
        </h4>
      );
      return;
    }
    if (line.startsWith('## ')) {
      flushList(`list-before-h2-${index}`);
      elements.push(
        <h3 key={`h2-${index}`} className="text-base font-bold text-indigo-200 mt-4 mb-2">
          {parseInline(line.slice(3))}
        </h3>
      );
      return;
    }
    if (line.startsWith('# ')) {
      flushList(`list-before-h1-${index}`);
      elements.push(
        <h2 key={`h1-${index}`} className="text-lg font-extrabold text-white mt-4 mb-2">
          {parseInline(line.slice(2))}
        </h2>
      );
      return;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushList(`list-before-quote-${index}`);
      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="border-l-2 border-indigo-500 bg-indigo-950/20 px-3 py-1.5 my-2 rounded-r-lg text-slate-300 text-xs italic"
        >
          {parseInline(line.slice(2))}
        </blockquote>
      );
      return;
    }

    // Bullet lists (- or *)
    const bulletMatch = line.match(/^(\s*)([-*])\s+(.+)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList(`list-before-ul-${index}`);
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(parseInline(bulletMatch[3]));
      return;
    }

    // Numbered lists (1. )
    const numberedMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList(`list-before-ol-${index}`);
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(parseInline(numberedMatch[3]));
      return;
    }

    // Normal paragraph
    flushList(`list-before-p-${index}`);
    elements.push(
      <p key={`p-${index}`} className="text-slate-200 text-sm leading-relaxed my-1.5">
        {parseInline(line)}
      </p>
    );
  });

  // Flush any remaining code block or list
  if (codeBlock) {
    elements.push(
      <pre
        key="code-final"
        className="my-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed"
      >
        <code>{(codeBlock as { lines: string[] }).lines.join('\n')}</code>
      </pre>
    );
  }
  flushList('list-final');

  return <div className="space-y-1">{elements}</div>;
}
