"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const PARTICLES = [
  "/nova:review src/auth/",
  "/nova:plan login-api",
  "Hard-Block: jwt_secret hardcoded",
  "PASS ✓ 5/5 dimensions",
  "/nova:gap design.md src/",
  "Evaluator: adversarial stance",
  "Generator → Nova → Done",
  "/nova:auto feature",
  "Sprint 1 PASS",
  "/nova:xv architecture",
  "Data flow: complete",
  "Boundary values: OK",
  "/nova:next",
  "tsc: 0 errors",
  "Security: no hardcoded secrets",
  "/nova:verify --strict",
  "Known Gaps: documented",
  "Complexity: Medium → Plan",
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

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_80%,rgba(37,99,235,0.06),transparent)]" />

      <ParticleField />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a3a5a] bg-[#111118]/80 text-xs text-[#8888aa] mb-8 font-mono backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse-glow" />
          Claude Code Plugin — v3.14.1
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight mb-6"
        >
          <span className="text-[#f0f0ff]">Verify Before</span>
          <br />
          <span className="gradient-text glow-text">You Ship.</span>
          <br />
          <span className="text-[#f0f0ff]">Every Time.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl text-[#8888aa] max-w-2xl mx-auto mb-4 leading-relaxed text-balance"
        >
          AI가 코드를 빠르게 만들어줘도,{" "}
          <br className="hidden sm:inline" />
          잘못된 판단 하나가 4주 뒤 전체 리팩토링으로 돌아온다.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base text-[#8888aa] max-w-xl mx-auto mb-10 leading-relaxed text-balance"
        >
          Nova는 AI 오케스트레이터 루프 안의{" "}
          <span className="text-[#a855f7]">Quality Gate</span>다.{" "}
          <br className="hidden sm:inline" />
          코드를 생성하지 않고, 생성된 코드가 제대로 됐는지{" "}
          <span className="text-[#a855f7]">독립 검증</span>한다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
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
            설치하기 (30초)
          </motion.a>
          <motion.a
            href="https://github.com/TeamSPWK/nova"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, borderColor: "#7c3aed", backgroundColor: "#1a1a24" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#3a3a5a] text-[#f0f0ff] font-semibold text-base"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex items-center justify-center gap-8 mb-10"
        >
          {[
            { num: "10", label: "Auto-Apply Rules" },
            { num: "13", label: "Commands" },
            { num: "5", label: "Specialist Agents" },
            { num: "4", label: "Verification Skills" },
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
          className="max-w-lg mx-auto rounded-xl border border-[#2a2a3a] bg-[#0d0d15]/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-[#111118] border-b border-[#2a2a3a]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]/70" />
              <div className="w-3 h-3 rounded-full bg-[#eab308]/70" />
              <div className="w-3 h-3 rounded-full bg-[#22c55e]/70" />
            </div>
            <span className="ml-2 text-xs text-[#8080b0] font-mono">terminal</span>
          </div>
          <div className="p-4 font-mono text-sm leading-7">
            <div className="text-[#8080b0]"># Install Nova (30 seconds)</div>
            <div className="text-[#f0f0ff]">
              <span className="text-[#7c3aed]">$</span> claude plugin marketplace add TeamSPWK/nova
            </div>
            <div className="text-[#f0f0ff]">
              <span className="text-[#7c3aed]">$</span> claude plugin install nova@nova-marketplace
            </div>
            <div className="text-[#8080b0] mt-1"># Start immediately</div>
            <div className="text-[#f0f0ff]">
              <span className="text-[#7c3aed]">$</span> /nova:next
            </div>
            <div className="text-[#22c55e] mt-1">
              ✓ Nova Quality Gate active — every session, automatically
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
