import { createFileRoute } from "@tanstack/react-router";
import PortalListPage from "@/components/shared/PortalListPage";
import { getSpecialistDashboard } from "@/api/dashboard.api";

const doctorNav = [
  { label: "OVERVIEW", to: "/doctor/home" },
  { label: "PATIENTS", to: "/doctor/patients" },
  { label: "SESSIONS", to: "/doctor/sessions" },
  { label: "NOTES", to: "/doctor/notes" },
];

// Backend may expose patients via dashboard payload (`patients` array) or a dedicated endpoint.
const fetchPatients = async () => {
  const d = await getSpecialistDashboard().catch(() => null);
  return d?.patients ?? d?.children ?? d?.recentPatients ?? [];
};

export const Route = createFileRoute("/doctor/patients")({
  head: () => ({ meta: [{ title: "Patients — AutiCare" }] }),
  component: () => (
    <PortalListPage
      pageTitle="Patients"
      title="My patients"
      subtitle="Children under your care, with quick access to their profile."
      portalLabel="Doctor portal"
      nav={doctorNav}
      fetcher={fetchPatients}
      emptyTitle="No patients yet"
      emptyDescription="When parents book sessions with you, their children will appear here."
      columns={[
        { key: "name", label: "Name", render: (r) => r.fullName || r.name || `Patient #${r.id ?? "—"}` },
        { key: "age", label: "Age", render: (r) => r.age ?? r.ageYears ?? "—" },
        { key: "diagnosis", label: "Diagnosis", render: (r) => r.diagnosis ?? "—" },
        { key: "parent", label: "Parent", render: (r) => r.parentName ?? "—" },
      ]}
    />
  ),
});
