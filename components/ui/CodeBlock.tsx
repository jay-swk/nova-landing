"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
}

export default function CodeBlock({
  code,
  language = "bash",
  showCopy = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-[#2a2a3a] bg-[#0d0d15]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#111118] border-b border-[#2a2a3a]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a3a]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a3a]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a3a]" />
          </div>
          <span className="text-xs text-[#8080b0] font-mono">{language}</span>
        </div>
        {showCopy && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-[#8888aa] hover:text-[#f0f0ff] transition-colors px-2 py-1 rounded hover:bg-[#1a1a24]"
            aria-label="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-[#22c55e] flex items-center gap-1"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Copied
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-7">
        <code className="text-[#f0f0ff] font-mono whitespace-pre">
          {code.split("\n").map((line, i) => {
            const isComment = line.trim().startsWith("#");
            return (
              <span key={i} className={isComment ? "text-[#8080b0]" : "text-[#f0f0ff]"}>
                {line}
                {"\n"}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
