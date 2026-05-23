import { createFileRoute } from "@tanstack/react-router";
import PublicLayout from "@/components/layout/PublicLayout";
import LandingPage from "@/features/public/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutiCare — Home" },
      { name: "description", content: "Personalized, collaborative care for children on the autism spectrum." },
    ],
  }),
  component: () => (
    <PublicLayout>
      <LandingPage />
    </PublicLayout>
  ),
});
