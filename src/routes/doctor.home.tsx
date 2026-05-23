import { createFileRoute } from "@tanstack/react-router";
import PlaceholderPage from "@/components/shared/PlaceholderPage";

export const Route = createFileRoute("/doctor/home")({
  head: () => ({ meta: [{ title: "Doctor Home — AutiCare" }] }),
  component: () => (
    <div className="min-h-screen bg-[var(--surface)] py-16 px-4">
      <PlaceholderPage title="Doctor Dashboard" description="Coming in Phase 2." />
    </div>
  ),
});
