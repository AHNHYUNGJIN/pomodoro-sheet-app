'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MODES = {
  WORK: { label: 'Focus', minutes: 25, color: 'text-apple-blue', icon: Zap },
  SHORT_BREAK: { label: 'Short Break', minutes: 5, color: 'text-green-500', icon: Coffee },
  LONG_BREAK: { label: 'Long Break', minutes: 15, color: 'text-indigo-500', icon: Coffee },
};

export default function PomodoroTimer() {
  const [mode, setMode] = useState('WORK');
  const [timeLeft, setTimeLeft] = useState(MODES.WORK.minutes * 60);
  const [isActive, setIsActive] = useState(false);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(MODES[mode as keyof typeof MODES].minutes * 60);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Add notification or sound here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (MODES[mode as keyof typeof MODES].minutes * 60)) * 100;

  return (
    <div className="glass apple-shadow rounded-[32px] p-8 flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="flex space-x-2 mb-8 bg-gray-100 dark:bg-zinc-900 p-1 rounded-2xl">
        {Object.entries(MODES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === key
                ? 'bg-white dark:bg-zinc-800 shadow-sm text-foreground'
                : 'text-apple-gray hover:text-foreground'
            }`}
          >
            {value.label}
          </button>
        ))}
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200 dark:text-zinc-800"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={754}
            initial={{ strokeDashoffset: 754 }}
            animate={{ strokeDashoffset: 754 - (754 * (100 - progress)) / 100 }}
            transition={{ duration: 1, ease: 'linear' }}
            className={MODES[mode as keyof typeof MODES].color}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={timeLeft}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-6xl font-bold tracking-tighter"
            >
              {formatTime(timeLeft)}
            </motion.div>
          </AnimatePresence>
          <div className="text-apple-gray font-medium mt-1">
            {MODES[mode as keyof typeof MODES].label}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-apple-blue text-white shadow-lg active:scale-95 transition-transform"
        >
          {isActive ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-foreground shadow-lg active:scale-95 transition-transform"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}
