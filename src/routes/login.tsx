import { createFileRoute } from "@tanstack/react-router";
import PublicLayout from "@/components/layout/PublicLayout";
import Login from "@/features/auth/Login";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — AutiCare" }] }),
  component: () => (
    <PublicLayout>
      <Login />
    </PublicLayout>
  ),
});
