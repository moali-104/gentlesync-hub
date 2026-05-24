import { createFileRoute } from "@tanstack/react-router";
import SpecialistDashboard from "@/features/specialist/SpecialistDashboard";

export const Route = createFileRoute("/therapist/home")({
  head: () => ({ meta: [{ title: "Therapist Dashboard — AutiCare" }] }),
  component: () => <SpecialistDashboard role="Therapist" />,
});
