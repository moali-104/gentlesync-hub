import { createFileRoute } from "@tanstack/react-router";
import PortalListPage from "@/components/shared/PortalListPage";
import { getUpcomingBookings } from "@/api/sessions.api";

const therapistNav = [
  { label: "OVERVIEW", to: "/therapist/home" },
  { label: "PATIENTS", to: "/therapist/patients" },
  { label: "SESSIONS", to: "/therapist/sessions" },
  { label: "NOTES", to: "/therapist/notes" },
];

const fmt = (v) => (v ? new Date(v).toLocaleString() : "—");

export const Route = createFileRoute("/therapist/sessions")({
  head: () => ({ meta: [{ title: "Sessions — AutiCare" }] }),
  component: () => (
    <PortalListPage
      pageTitle="Sessions"
      title="Therapy sessions"
      subtitle="Upcoming therapy sessions with your patients."
      portalLabel="Therapist portal"
      nav={therapistNav}
      fetcher={getUpcomingBookings}
      emptyTitle="No upcoming sessions"
      emptyDescription="Your schedule is clear right now."
      columns={[
        { key: "title", label: "Session", render: (r) => r.title || r.serviceName || "Therapy session" },
        { key: "childName", label: "Patient", render: (r) => r.childName ?? r.patientName ?? "—" },
        { key: "parentName", label: "Parent", render: (r) => r.parentName ?? "—" },
        { key: "startTime", label: "When", render: (r) => fmt(r.startTime || r.date || r.scheduledAt) },
        {
          key: "status", label: "Status",
          render: (r) => r.status ? (
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-700">{r.status}</span>
          ) : "—",
        },
      ]}
    />
  ),
});
