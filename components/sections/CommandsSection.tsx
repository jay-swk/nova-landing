"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

interface Command {
  cmd: string;
  description: string;
}

const categoryMap: Record<string, string> = {
  "/nova:ask": "Advise",
  "/nova:audit-self": "Verify",
  "/nova:plan": "Plan",
  "/nova:design": "Plan",
  "/nova:deepplan": "Plan",
  "/nova:review": "Verify",
  "/nova:check": "Verify",
  "/nova:ux-audit": "Verify",
  "/nova:auto": "Operate",
  "/nova:run": "Operate",
  "/nova:evolve": "Operate",
  "/nova:worktree-setup": "Operate",
  "/nova:next": "Context",
  "/nova:scan": "Context",
  "/nova:setup": "Context",
  "/nova:claude-md": "Context",
};

const categoryColors: Record<string, string> = {
  Plan: "#2563eb",
  Verify: "#22c55e",
  Operate: "#a855f7",
  Context: "#eab308",
  Advise: "#0ea5e9",
};

const categories = ["All", "Plan", "Verify", "Operate", "Context", "Advise"];

function getCategory(cmd: string): string {
  return categoryMap[cmd] ?? "Context";
}

export default function CommandsSection({ commands }: { commands: Command[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const enriched = commands.map((c) => ({
    ...c,
    category: getCategory(c.cmd),
  }));

  const filtered =
    activeCategory === "All"
      ? enriched
      : enriched.filter((c) => c.category === activeCategory);

  return (
    <section id="commands" className="py-24 px-4 sm:px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 text-xs text-[#a855f7] font-mono mb-4">
            {commands.length} Commands
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#f0f0ff] mb-4">
            필요할 때 직접 제어
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto">
            에이전트 운영 루프를 직접 제어할 때 사용하는 {commands.length}개 커맨드.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#7c3aed] text-white"
                  : "border border-[#2a2a3a] text-[#8888aa] hover:text-[#f0f0ff] hover:border-[#3a3a5a]"
              }`}
            >
              {cat === "All" ? `All (${enriched.length})` : cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl border border-[#2a2a3a] bg-[#111118] overflow-hidden"
        >
          <div className="hidden md:grid grid-cols-[auto_1fr] gap-4 px-5 py-3 bg-[#0d0d15] border-b border-[#2a2a3a] text-xs font-mono text-[#8080b0] uppercase tracking-wider">
            <div>Command</div>
            <div>Description</div>
          </div>

          {filtered.map((cmd, i) => (
            <motion.div
              key={cmd.cmd}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
              className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-2 md:gap-4 px-5 py-4 border-b border-[#2a2a3a] last:border-b-0 hover:bg-[#1a1a24] transition-colors group"
            >
              <div className="flex items-start gap-2">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ background: categoryColors[cmd.category] ?? "#7c3aed" }}
                  aria-hidden="true"
                />
                <span className="sr-only">{cmd.category}</span>
                <code className="text-[#a855f7] font-mono text-sm whitespace-nowrap font-semibold">
                  {cmd.cmd}
                </code>
              </div>
              <div className="text-sm text-[#f0f0ff] md:pl-0 pl-4">{cmd.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
