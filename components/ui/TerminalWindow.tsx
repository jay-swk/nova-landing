"use client";

import { useEffect, useRef, useState } from "react";

interface TerminalLine {
  type: "command" | "output" | "pass" | "fail" | "warn" | "comment" | "blank";
  content: string;
  delay?: number;
}

interface TerminalWindowProps {
  lines: TerminalLine[];
  isPlaying: boolean;
  title?: string;
}

export default function TerminalWindow({
  lines,
  isPlaying,
  title = "terminal",
}: TerminalWindowProps) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (!isPlaying) {
      const t = setTimeout(() => {
        setVisibleLines([]);
        setCurrentTyping("");
      }, 0);
      timeoutsRef.current.push(t);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const t = setTimeout(() => {
        setVisibleLines(lines);
        setCurrentTyping("");
      }, 0);
      timeoutsRef.current.push(t);
      return;
    }

    let totalDelay = 0;

    lines.forEach((line) => {
      const lineDelay = line.delay ?? 80;
      totalDelay += lineDelay;

      if (line.type === "command") {
        const typingDelay = totalDelay;
        let charDelay = 0;
        for (let c = 0; c <= line.content.length; c++) {
          const d = charDelay;
          const charIdx = c;
          const t = setTimeout(() => {
            setCurrentTyping(line.content.slice(0, charIdx));
          }, typingDelay + d);
          timeoutsRef.current.push(t);
          charDelay += 30;
        }
        totalDelay += line.content.length * 30 + 200;
        const t2 = setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
          setCurrentTyping("");
        }, totalDelay);
        timeoutsRef.current.push(t2);
        totalDelay += 50;
      } else {
        const t = setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
        }, totalDelay);
        timeoutsRef.current.push(t);
        totalDelay += 20;
      }
    });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [isPlaying, lines]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, currentTyping]);

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-[#f0f0ff]";
      case "pass":
        return "text-[#22c55e]";
      case "fail":
        return "text-[#ef4444]";
      case "warn":
        return "text-[#eab308]";
      case "comment":
        return "text-[#444466]";
      case "blank":
        return "";
      default:
        return "text-[#8888aa]";
    }
  };

  const getPrefix = (type: TerminalLine["type"]) => {
    if (type === "command") return "$ ";
    return "";
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#2a2a3a] bg-[#0d0d15] shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111118] border-b border-[#2a2a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]/70" />
          <div className="w-3 h-3 rounded-full bg-[#eab308]/70" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e]/70" />
        </div>
        <span className="ml-2 text-xs text-[#444466] font-mono">{title}</span>
      </div>
      <div
        ref={containerRef}
        className="p-4 font-mono text-sm leading-6 h-80 overflow-y-auto scrollbar-thin"
        style={{ scrollbarColor: "#3a3a5a #0d0d15" }}
      >
        {visibleLines.map((line, i) => (
          <div key={i} className={getLineColor(line.type)}>
            {line.type === "blank" ? (
              <br />
            ) : (
              <span>
                {getPrefix(line.type)}
                {line.content}
              </span>
            )}
          </div>
        ))}
        {currentTyping !== "" && (
          <div className="text-[#f0f0ff]">
            <span>$ </span>
            <span>{currentTyping}</span>
            <span className="animate-cursor border-r-2 border-[#7c3aed] ml-0.5">&nbsp;</span>
          </div>
        )}
        {isPlaying && currentTyping === "" && visibleLines.length < lines.length && (
          <div className="text-[#f0f0ff]">
            <span>$ </span>
            <span className="animate-cursor border-r-2 border-[#7c3aed] ml-0.5">&nbsp;</span>
          </div>
        )}
      </div>
    </div>
  );
}
