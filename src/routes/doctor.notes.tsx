import { createFileRoute } from "@tanstack/react-router";
import PortalListPage from "@/components/shared/PortalListPage";
import { getNotes } from "@/api/notes.api";

const doctorNav = [
  { label: "OVERVIEW", to: "/doctor/home" },
  { label: "PATIENTS", to: "/doctor/patients" },
  { label: "SESSIONS", to: "/doctor/sessions" },
  { label: "NOTES", to: "/doctor/notes" },
];

const fmt = (v) => (v ? new Date(v).toLocaleDateString() : "—");

export const Route = createFileRoute("/doctor/notes")({
  head: () => ({ meta: [{ title: "Notes — AutiCare" }] }),
  component: () => (
    <PortalListPage
      pageTitle="Clinical notes"
      title="Clinical notes"
      subtitle="Observations and updates about your patients."
      portalLabel="Doctor portal"
      nav={doctorNav}
      fetcher={getNotes}
      emptyTitle="No notes yet"
      emptyDescription="Notes you write will appear here."
      columns={[
        { key: "title", label: "Title", render: (r) => r.title || r.subject || "Note" },
        { key: "patient", label: "Patient", render: (r) => r.childName ?? r.patientName ?? "—" },
        {
          key: "content", label: "Content",
          render: (r) => <span className="line-clamp-2 max-w-md inline-block">{r.content || r.body || "—"}</span>,
        },
        { key: "createdAt", label: "Date", render: (r) => fmt(r.createdAt || r.date) },
      ]}
    />
  ),
});
