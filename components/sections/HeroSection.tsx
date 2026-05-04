"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const PARTICLES = [
  "/nova:review src/auth/",
  "/nova:plan login-api",
  "repo-preflight: rules loaded",
  "PASS: 5/5 dimensions",
  "/nova:run feature",
  "Evaluator: independent stance",
  "Agent Ops: context retained",
  "/nova:auto feature",
  "/nova:ask architecture",
  "/nova:claude-md --project",
  "NOVA-STATE.md updated",
  "Worktree secrets linked",
  "/nova:next",
  "tsc: 0 errors",
  "Security: no hardcoded secrets",
  "/nova:check --pre-commit",
  "Known Gaps: documented",
  "Clean clone: reproducible",
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      opacity: number;
      text: string;
      size: number;
      fadeDir: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.15 + 0.03,
      text: PARTICLES[Math.floor(Math.random() * PARTICLES.length)],
      size: Math.random() * 2 + 9,
      fadeDir: Math.random() > 0.5 ? 1 : -1,
    });

    const init = () => {
      resize();
      particles = Array.from({ length: 28 }, createParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${11}px 'Geist Mono', monospace`;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.fadeDir * 0.0008;

        if (p.opacity > 0.18) p.fadeDir = -1;
        if (p.opacity < 0.02) p.fadeDir = 1;

        if (p.y < -20 || p.x < -200 || p.x > canvas.width + 200) {
          Object.assign(p, createParticle(), { y: canvas.height + 10 });
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "#8888aa";
        ctx.fillText(p.text, p.x, p.y);
        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    init();

    if (!prefersReduced) {
      draw();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

interface HeroStats {
  commands: number;
  skills: number;
  agents: number;
  rules: number;
}

export default function HeroSection({ stats }: { stats?: HeroStats }) {
  const s = stats ?? { commands: 12, skills: 7, agents: 5, rules: 10 };
  return (
    <section
      id="hero"
      className="relative min-h-[84svh] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_80%,rgba(37,99,235,0.06),transparent)]" />

      <ParticleField />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a3a5a] bg-[#111118]/80 text-xs text-[#8888aa] mb-8 font-mono backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse-glow" />
          AI Agent Ops Framework · Claude Code Plugin
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight mb-6"
        >
          <span className="text-[#f0f0ff]">Nova</span>
          <br />
          <span className="gradient-text glow-text">AI Agent Ops</span>
          <br />
          <span className="text-[#f0f0ff]">Framework</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl text-[#8888aa] max-w-2xl mx-auto mb-4 leading-relaxed text-balance"
        >
          AI 코딩 에이전트가 많아질수록,{" "}
          <br className="hidden sm:inline" />
          병목은 생성 속도가 아니라 운영 신뢰도다.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base text-[#8888aa] max-w-xl mx-auto mb-10 leading-relaxed text-balance"
        >
          Nova는 Claude Code 위에서 에이전트 작업을{" "}
          <span className="text-[#a855f7]">환경·맥락·검증·협업·진화</span>로 운영한다.{" "}
          <br className="hidden sm:inline" />
          품질 게이트는 제품의 전부가 아니라, 운영 체계 안에서 가장 강한 실행 루프다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <motion.a
            href="#install"
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(124,58,237,0.4), 0 20px 40px rgba(124,58,237,0.2)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white font-semibold text-base shadow-xl shadow-purple-900/40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            운영 루프 설치하기
          </motion.a>
          <motion.a
            href="#evaluation"
            whileHover={{ scale: 1.03, borderColor: "#7c3aed", backgroundColor: "#1a1a24" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#3a3a5a] text-[#f0f0ff] font-semibold text-base"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M13 5l7 7-7 7" />
            </svg>
            도입 기준 보기
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex items-center justify-center gap-6 sm:gap-8 mb-8"
        >
          {[
            { num: String(s.rules), label: "Operating Rules" },
            { num: String(s.commands), label: "Commands" },
            { num: String(s.agents), label: "Specialist Agents" },
            { num: String(s.skills), label: "Skills" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.num}</div>
              <div className="text-xs text-[#8080b0] font-mono mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="hidden sm:block max-w-2xl mx-auto rounded-xl border border-[#2a2a3a] bg-[#0d0d15]/80 backdrop-blur-sm shadow-2xl shadow-black/40"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3 font-mono text-xs sm:text-sm text-left">
            <div className="text-[#f0f0ff] min-w-0 truncate">
              <span className="text-[#7c3aed]">$</span> claude plugin install nova@nova-marketplace
            </div>
            <div className="hidden sm:block h-4 w-px bg-[#2a2a3a]" />
            <div className="text-[#22c55e] whitespace-normal sm:whitespace-nowrap">
              ✓ Agent Ops ready
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
      >
        <a href="#problem" aria-label="아래로 스크롤" className="flex flex-col items-center gap-2 text-[#8080b0] hover:text-[#8888aa] transition-colors">
          <span className="text-xs font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 10l5 5 5-5" />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
