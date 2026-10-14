import { useEffect } from 'react';
import { getHealth } from '../services/api';
import { useServerStore } from '../stores/serverStore';

export default function HomePage() {
  const status = useServerStore((state) => state.status);
  const setStatus = useServerStore((state) => state.setStatus);

  useEffect(() => {
    let active = true;

    async function checkServer() {
      setStatus('checking');

      try {
        await getHealth();

        if (active) setStatus('online');
      } catch {
        if (active) setStatus('offline');
      }
    }

    void checkServer();

    return () => {
      active = false;
    };
  }, [setStatus]);

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">
            Relay
          </span>

          <span className="flex items-center gap-2 text-sm text-slate-400">
            <span
              className={`h-2 w-2 rounded-full ${
                status === 'online'
                  ? 'bg-emerald-400'
                  : status === 'offline'
                    ? 'bg-red-400'
                    : 'bg-amber-400'
              }`}
            />
            {status === 'online'
              ? 'Service online'
              : status === 'offline'
                ? 'Service unavailable'
                : 'Connecting'}
          </span>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            Private conversations. No accounts.
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Your conversation.
            <br />
            <span className="text-indigo-400">Your moment.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
            Start a temporary chat, share a link, and connect
            through messages or video. When the session ends,
            the room disappears.
          </p>

          <button
            type="button"
            disabled
            className="mt-10 cursor-not-allowed rounded-xl bg-indigo-500 px-8 py-4 font-semibold text-white opacity-60"
          >
            Create a chat
          </button>

          <p className="mt-4 text-sm text-slate-500">
            Coming in our next milestone
          </p>
        </div>
      </section>

      <footer className="py-6 text-center text-sm text-slate-600">
        No accounts. No permanent message history.
      </footer>
    </main>
  );
}