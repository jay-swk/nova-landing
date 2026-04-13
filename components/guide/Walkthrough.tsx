"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Scenario, Step } from "./scenarios";

function StepIcon({ step }: { step: Step }) {
  if (step.type === "user") {
    return (
      <div className="w-8 h-8 rounded-full bg-[#2563eb]/20 border border-[#2563eb]/40 flex items-center justify-center text-xs shrink-0">
        You
      </div>
    );
  }
  if (step.type === "result") {
    const bg =
      step.status === "pass"
        ? "bg-[#22c55e]/20 border-[#22c55e]/40"
        : "bg-[#ef4444]/20 border-[#ef4444]/40";
    return (
      <div
        className={`w-8 h-8 rounded-full ${bg} border flex items-center justify-center text-xs shrink-0`}
      >
        {step.status === "pass" ? "OK" : "!!"}
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center text-white text-xs font-bold shrink-0">
      N
    </div>
  );
}

function StepBubble({ step, isActive }: { step: Step; isActive: boolean }) {
  const bgMap = {
    user: "bg-[#1a1a2e] border-[#2563eb]/30",
    nova: "bg-[#111118] border-[#3a3a5a]",
    result:
      step.status === "pass"
        ? "bg-[#0a1a0f] border-[#22c55e]/40"
        : "bg-[#1a0a0a] border-[#ef4444]/40",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex gap-3 ${step.type === "user" ? "flex-row-reverse" : ""}`}
    >
      <StepIcon step={step} />
      <div
        className={`rounded-xl border px-4 py-3 max-w-[85%] ${bgMap[step.type]}`}
      >
        <div
          className={`text-sm font-medium ${
            step.type === "user" ? "text-[#93b4ff]" : "text-[#f0f0ff]"
          }`}
        >
          {step.type === "user" && (
            <span className="text-[#8888aa] text-xs font-normal block mb-1">
              자연어로 요청
            </span>
          )}
          {step.content}
        </div>
        {step.detail && isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-2 pt-2 border-t border-[#2a2a3a] text-xs text-[#8888aa] leading-relaxed whitespace-pre-line"
          >
            {step.detail}
          </motion.div>
        )}
        {step.status === "working" && isActive && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <span className="text-xs text-[#8888aa]">처리 중...</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Walkthrough({ scenario }: { scenario: Scenario }) {
  const [currentStep, setCurrentStep] = useState(0);
  const visibleSteps = scenario.steps.slice(0, currentStep + 1);
  const isLast = currentStep >= scenario.steps.length - 1;
  const isFirst = currentStep === 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-mono font-bold"
          style={{
            background: `${scenario.badgeColor}20`,
            color: scenario.badgeColor,
            border: `1px solid ${scenario.badgeColor}40`,
          }}
        >
          Level {scenario.level}
        </span>
        <div>
          <h3 className="text-xl font-bold text-[#f0f0ff]">{scenario.title}</h3>
          <p className="text-sm text-[#8888aa]">
            {scenario.complexity} · 약 {scenario.timeEstimate}
          </p>
        </div>
      </div>

      <p className="text-sm text-[#8888aa] mb-6 leading-relaxed">
        {scenario.description}
      </p>

      {/* Chat area */}
      <div className="rounded-2xl border border-[#2a2a3a] bg-[#0d0d15] overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111118] border-b border-[#2a2a3a]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/70" />
            <div className="w-3 h-3 rounded-full bg-[#eab308]/70" />
            <div className="w-3 h-3 rounded-full bg-[#22c55e]/70" />
          </div>
          <span className="ml-2 text-xs text-[#8080b0] font-mono">
            claude code — nova active
          </span>
          <span className="ml-auto text-xs text-[#444466] font-mono">
            Step {currentStep + 1}/{scenario.steps.length}
          </span>
        </div>

        {/* Steps */}
        <div className="p-4 space-y-4 min-h-[280px] max-h-[480px] overflow-y-auto">
          <AnimatePresence mode="sync">
            {visibleSteps.map((step, i) => (
              <StepBubble
                key={i}
                step={step}
                isActive={i === currentStep}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111118] border-t border-[#2a2a3a]">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={isFirst}
            className="px-4 py-1.5 rounded-lg text-sm text-[#8888aa] border border-[#2a2a3a] hover:text-[#f0f0ff] hover:border-[#3a3a5a] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            &larr; 이전
          </button>

          {/* Progress dots */}
          <div className="flex gap-1.5">
            {scenario.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i <= currentStep ? "bg-[#7c3aed]" : "bg-[#2a2a3a]"
                } ${i === currentStep ? "scale-125" : ""}`}
              />
            ))}
          </div>

          {isLast ? (
            <a
              href="/nova-landing/#install"
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white hover:opacity-90 transition-opacity"
            >
              설치하기 &rarr;
            </a>
          ) : (
            <button
              onClick={() =>
                setCurrentStep(Math.min(scenario.steps.length - 1, currentStep + 1))
              }
              className="px-4 py-1.5 rounded-lg text-sm font-medium bg-[#7c3aed] text-white hover:opacity-90 transition-opacity"
            >
              다음 &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
