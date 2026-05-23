import { createFileRoute } from "@tanstack/react-router";
import PlaceholderPage from "@/components/shared/PlaceholderPage";

export const Route = createFileRoute("/parent/home")({
  head: () => ({ meta: [{ title: "Parent Home — AutiCare" }] }),
  component: () => (
    <div className="min-h-screen bg-[var(--surface)] py-16 px-4">
      <PlaceholderPage title="Parent Dashboard" description="Coming in Phase 2." />
    </div>
  ),
});
