import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/unauthorized")({
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-[var(--ink)]">Unauthorized</h1>
        <p className="mt-3 text-[var(--muted)]">You don't have permission to view this page.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 rounded-full bg-orange-500 text-white font-semibold">
          Back home
        </a>
      </div>
    </div>
  ),
});
