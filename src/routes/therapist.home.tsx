import { createFileRoute } from "@tanstack/react-router";
import PlaceholderPage from "@/components/shared/PlaceholderPage";

export const Route = createFileRoute("/therapist/home")({
  head: () => ({ meta: [{ title: "Therapist Home — AutiCare" }] }),
  component: () => (
    <div className="min-h-screen bg-[var(--surface)] py-16 px-4">
      <PlaceholderPage title="Therapist Dashboard" description="Coming in Phase 2." />
    </div>
  ),
});
