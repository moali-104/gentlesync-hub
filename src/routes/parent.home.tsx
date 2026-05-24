import { createFileRoute } from "@tanstack/react-router";
import ParentDashboard from "@/features/parent/ParentDashboard";

export const Route = createFileRoute("/parent/home")({
  head: () => ({ meta: [{ title: "Parent Dashboard — AutiCare" }] }),
  component: ParentDashboard,
});
