import { createFileRoute } from "@tanstack/react-router";
import PortalListPage from "@/components/shared/PortalListPage";
import { getSpecialistDashboard } from "@/api/dashboard.api";

const therapistNav = [
  { label: "OVERVIEW", to: "/therapist/home" },
  { label: "PATIENTS", to: "/therapist/patients" },
  { label: "SESSIONS", to: "/therapist/sessions" },
  { label: "NOTES", to: "/therapist/notes" },
];

const fetchPatients = async () => {
  const d = await getSpecialistDashboard().catch(() => null);
  return d?.patients ?? d?.children ?? d?.recentPatients ?? [];
};

export const Route = createFileRoute("/therapist/patients")({
  head: () => ({ meta: [{ title: "Patients — AutiCare" }] }),
  component: () => (
    <PortalListPage
      pageTitle="Patients"
      title="My patients"
      subtitle="Children under your therapy program."
      portalLabel="Therapist portal"
      nav={therapistNav}
      fetcher={fetchPatients}
      emptyTitle="No patients yet"
      emptyDescription="When parents book therapy sessions with you, their children will appear here."
      columns={[
        { key: "name", label: "Name", render: (r) => r.fullName || r.name || `Patient #${r.id ?? "—"}` },
        { key: "age", label: "Age", render: (r) => r.age ?? r.ageYears ?? "—" },
        { key: "diagnosis", label: "Diagnosis", render: (r) => r.diagnosis ?? "—" },
        { key: "parent", label: "Parent", render: (r) => r.parentName ?? "—" },
      ]}
    />
  ),
});
