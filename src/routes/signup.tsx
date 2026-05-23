import { createFileRoute } from "@tanstack/react-router";
import PublicLayout from "@/components/layout/PublicLayout";
import Signup from "@/features/auth/Signup";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — AutiCare" }] }),
  component: () => (
    <PublicLayout>
      <Signup />
    </PublicLayout>
  ),
});
