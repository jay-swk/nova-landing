"use client";

import { motion } from "motion/react";
import type { Scenario } from "./scenarios";

export default function LevelSelector({
  scenarios,
  activeLevel,
  onSelect,
}: {
  scenarios: Scenario[];
  activeLevel: number;
  onSelect: (level: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {scenarios.map((s, i) => {
        const isActive = activeLevel === s.level;
        return (
          <motion.button
            key={s.level}
            onClick={() => onSelect(s.level)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`text-left p-5 rounded-xl border transition-all ${
              isActive
                ? "border-[#7c3aed] bg-[#7c3aed]/10 shadow-lg shadow-purple-900/20"
                : "border-[#2a2a3a] bg-[#111118] hover:border-[#3a3a5a] hover:bg-[#1a1a24]"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-2 py-0.5 rounded-full text-xs font-mono font-bold"
                style={{
                  background: `${s.badgeColor}20`,
                  color: s.badgeColor,
                  border: `1px solid ${s.badgeColor}40`,
                }}
              >
                Level {s.level}
              </span>
              <span className="text-xs text-[#8888aa] font-mono">
                {s.timeEstimate}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#f0f0ff] mb-1">
              {s.title}
            </h3>
            <p className="text-sm text-[#8888aa] leading-relaxed">
              {s.subtitle}
            </p>
            <div className="mt-3 text-xs text-[#444466] font-mono">
              {s.complexity}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
