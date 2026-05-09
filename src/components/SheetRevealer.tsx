'use client';

import React, { useState } from 'react';
import { Lock, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SheetRevealer() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/reveal-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        setSheetUrl(data.url);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const close = () => {
    setIsOpen(false);
    setPassword('');
    setSheetUrl('');
    setError('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform text-apple-gray"
      >
        <Lock size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass apple-shadow rounded-[32px] p-8 w-full max-w-sm relative"
            >
              <button onClick={close} className="absolute top-6 right-6 text-apple-gray">
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold mb-6">Sheet Access</h3>

              {!sheetUrl ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-apple-gray">연결된 구글 시트 주소를 확인하려면 비밀번호를 입력하세요.</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoFocus
                    className="w-full bg-gray-100 dark:bg-zinc-900 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-apple-blue transition-all outline-none"
                  />
                  {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="apple-button-primary w-full py-3"
                  >
                    {isLoading ? 'Checking...' : 'Reveal Link'}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-green-600 font-medium">인증 성공! 아래 버튼을 클릭하여 시트로 이동하세요.</p>
                  <a
                    href={sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-button-primary w-full py-3 flex items-center justify-center space-x-2"
                  >
                    <span>Go to Spreadsheet</span>
                    <ExternalLink size={18} />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
