import { createFileRoute } from "@tanstack/react-router";
import SpecialistDashboard from "@/features/specialist/SpecialistDashboard";

export const Route = createFileRoute("/doctor/home")({
  head: () => ({ meta: [{ title: "Doctor Dashboard — AutiCare" }] }),
  component: () => <SpecialistDashboard role="Doctor" />,
});
