import PomodoroTimer from '@/components/PomodoroTimer';
import TodoList from '@/components/TodoList';
import SheetRevealer from '@/components/SheetRevealer';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 md:px-8 max-w-6xl mx-auto">
      {/* ... existing code ... */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <section className="space-y-6">
          <div className="flex items-center space-x-2 px-4 text-apple-gray font-semibold uppercase tracking-widest text-xs">
            <span>Timer</span>
          </div>
          <PomodoroTimer />
        </section>

        <section className="space-y-6">
          <div className="flex items-center space-x-2 px-4 text-apple-gray font-semibold uppercase tracking-widest text-xs">
            <span>Tasks</span>
          </div>
          <TodoList />
        </section>
      </div>

      <footer className="mt-24 text-center text-apple-gray text-sm">
        <p>© 2026 Designed with Team Orchestrator Skill</p>
      </footer>

      <SheetRevealer />
    </main>
  );
}
