import { createFileRoute } from "@tanstack/react-router";
import PortalListPage from "@/components/shared/PortalListPage";
import { getChildren } from "@/api/children.api";

const parentNav = [
  { label: "OVERVIEW", to: "/parent/home" },
  { label: "CHILDREN", to: "/parent/children" },
  { label: "SESSIONS", to: "/parent/sessions" },
  { label: "NOTES", to: "/parent/notes" },
];

export const Route = createFileRoute("/parent/children")({
  head: () => ({ meta: [{ title: "Children — AutiCare" }] }),
  component: () => (
    <PortalListPage
      pageTitle="Children"
      title="My children"
      subtitle="View and manage your children's profiles, plans and progress."
      portalLabel="Parent portal"
      nav={parentNav}
      fetcher={getChildren}
      emptyTitle="No children yet"
      emptyDescription="Add your first child to start tracking their care journey."
      columns={[
        {
          key: "name",
          label: "Name",
          render: (r) => r.fullName || r.name || r.firstName || `Child #${r.id ?? "—"}`,
        },
        { key: "age", label: "Age", render: (r) => r.age ?? r.ageYears ?? "—" },
        { key: "gender", label: "Gender", render: (r) => r.gender ?? "—" },
        { key: "diagnosis", label: "Diagnosis", render: (r) => r.diagnosis ?? "—" },
      ]}
    />
  ),
});
