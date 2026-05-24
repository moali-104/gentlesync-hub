import { createFileRoute } from "@tanstack/react-router";
import PortalListPage from "@/components/shared/PortalListPage";
import { getUpcomingBookings } from "@/api/sessions.api";

const doctorNav = [
  { label: "OVERVIEW", to: "/doctor/home" },
  { label: "PATIENTS", to: "/doctor/patients" },
  { label: "SESSIONS", to: "/doctor/sessions" },
  { label: "NOTES", to: "/doctor/notes" },
];

const fmt = (v) => (v ? new Date(v).toLocaleString() : "—");

export const Route = createFileRoute("/doctor/sessions")({
  head: () => ({ meta: [{ title: "Sessions — AutiCare" }] }),
  component: () => (
    <PortalListPage
      pageTitle="Sessions"
      title="Sessions schedule"
      subtitle="Upcoming consultations and follow-ups with your patients."
      portalLabel="Doctor portal"
      nav={doctorNav}
      fetcher={getUpcomingBookings}
      emptyTitle="No upcoming sessions"
      emptyDescription="Your schedule is clear right now."
      columns={[
        { key: "title", label: "Session", render: (r) => r.title || r.serviceName || "Consultation" },
        { key: "childName", label: "Patient", render: (r) => r.childName ?? r.patientName ?? "—" },
        { key: "parentName", label: "Parent", render: (r) => r.parentName ?? "—" },
        { key: "startTime", label: "When", render: (r) => fmt(r.startTime || r.date || r.scheduledAt) },
        {
          key: "status", label: "Status",
          render: (r) => r.status ? (
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-100 text-blue-700">{r.status}</span>
          ) : "—",
        },
      ]}
    />
  ),
});
