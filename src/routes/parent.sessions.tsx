import { createFileRoute } from "@tanstack/react-router";
import PortalListPage from "@/components/shared/PortalListPage";
import { getMyBookings } from "@/api/sessions.api";

const parentNav = [
  { label: "OVERVIEW", to: "/parent/home" },
  { label: "CHILDREN", to: "/parent/children" },
  { label: "SESSIONS", to: "/parent/sessions" },
  { label: "NOTES", to: "/parent/notes" },
];

const fmt = (v) => (v ? new Date(v).toLocaleString() : "—");

export const Route = createFileRoute("/parent/sessions")({
  head: () => ({ meta: [{ title: "Sessions — AutiCare" }] }),
  component: () => (
    <PortalListPage
      pageTitle="Sessions"
      title="My sessions"
      subtitle="Upcoming and past therapy sessions for your children."
      portalLabel="Parent portal"
      nav={parentNav}
      fetcher={getMyBookings}
      emptyTitle="No sessions booked"
      emptyDescription="Book a session with a specialist to get started."
      columns={[
        {
          key: "title",
          label: "Session",
          render: (r) => r.title || r.serviceName || r.specialistName || "Therapy session",
        },
        { key: "childName", label: "Child", render: (r) => r.childName ?? r.child?.fullName ?? "—" },
        { key: "specialistName", label: "Specialist", render: (r) => r.specialistName ?? r.doctorName ?? "—" },
        { key: "startTime", label: "When", render: (r) => fmt(r.startTime || r.date || r.scheduledAt) },
        {
          key: "status",
          label: "Status",
          render: (r) =>
            r.status ? (
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-orange-100 text-orange-700">
                {r.status}
              </span>
            ) : "—",
        },
      ]}
    />
  ),
});
