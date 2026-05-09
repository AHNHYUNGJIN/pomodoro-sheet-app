'use client';

import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, Trash2, Loader2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchTodos = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/todos');
      const data = await res.json();
      if (Array.isArray(data)) setTodos(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // Poll every 30 seconds for external updates from Google Sheets
    const interval = setInterval(fetchTodos, 30000);
    return () => clearInterval(interval);
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputValue.trim(),
      completed: false,
    };

    // Optimistic Update
    setTodos((prev) => [newTodo, ...prev]);
    setInputValue('');

    try {
      await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
    } catch (error) {
      console.error('Failed to add:', error);
      fetchTodos(); // Rollback on error
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    // Optimistic Update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
    );

    try {
      await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !completed }),
      });
    } catch (error) {
      console.error('Failed to toggle:', error);
      fetchTodos();
    }
  };

  const removeTodo = async (id: string) => {
    // Optimistic Update
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await fetch(`/api/todos?id=${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Failed to delete:', error);
      fetchTodos();
    }
  };

  return (
    <div className="glass apple-shadow rounded-[32px] p-8 w-full max-w-md mx-auto h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Today's Tasks</h2>
        <button
          onClick={fetchTodos}
          disabled={isSyncing}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-apple-gray"
        >
          {isSyncing ? <Loader2 size={20} className="animate-spin" /> : <RefreshCcw size={20} />}
        </button>
      </div>

      <form onSubmit={addTodo} className="relative mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full bg-gray-100 dark:bg-zinc-900 border-none rounded-2xl py-4 pl-5 pr-12 focus:ring-2 focus:ring-apple-blue transition-all outline-none"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-apple-blue text-white rounded-xl shadow-sm hover:scale-105 transition-transform"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-apple-gray">
            <Loader2 className="animate-spin mr-2" /> Loading tasks...
          </div>
        ) : todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-apple-gray opacity-50">
            <CheckCircle2 size={48} className="mb-2" />
            <p>All caught up!</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                layout
                className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700"
              >
                <div
                  className="flex items-center space-x-3 flex-1 cursor-pointer"
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                >
                  <button className="text-apple-blue transition-transform active:scale-90">
                    {todo.completed ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <Circle size={24} className="text-gray-300 dark:text-zinc-600" />
                    )}
                  </button>
                  <span
                    className={`font-medium transition-all ${
                      todo.completed ? 'text-apple-gray line-through' : 'text-foreground'
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
