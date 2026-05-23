import { createFileRoute } from "@tanstack/react-router";
import PublicLayout from "@/components/layout/PublicLayout";
import AboutPage from "@/features/public/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AutiCare" },
      { name: "description", content: "About AutiCare and our mission." },
    ],
  }),
  component: () => (
    <PublicLayout>
      <AboutPage />
    </PublicLayout>
  ),
});
