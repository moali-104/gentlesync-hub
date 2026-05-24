import { createFileRoute } from "@tanstack/react-router";
import PortalListPage from "@/components/shared/PortalListPage";
import { getNotes } from "@/api/notes.api";

const parentNav = [
  { label: "OVERVIEW", to: "/parent/home" },
  { label: "CHILDREN", to: "/parent/children" },
  { label: "SESSIONS", to: "/parent/sessions" },
  { label: "NOTES", to: "/parent/notes" },
];

const fmt = (v) => (v ? new Date(v).toLocaleDateString() : "—");

export const Route = createFileRoute("/parent/notes")({
  head: () => ({ meta: [{ title: "Notes — AutiCare" }] }),
  component: () => (
    <PortalListPage
      pageTitle="Notes"
      title="Notes from your care team"
      subtitle="Updates and observations from doctors and therapists."
      portalLabel="Parent portal"
      nav={parentNav}
      fetcher={getNotes}
      emptyTitle="No notes yet"
      emptyDescription="Notes from your care team will appear here."
      columns={[
        { key: "title", label: "Title", render: (r) => r.title || r.subject || "Note" },
        { key: "author", label: "Author", render: (r) => r.authorName ?? r.createdBy ?? "—" },
        {
          key: "content",
          label: "Content",
          render: (r) => (
            <span className="line-clamp-2 max-w-md inline-block">
              {r.content || r.body || r.description || "—"}
            </span>
          ),
        },
        { key: "createdAt", label: "Date", render: (r) => fmt(r.createdAt || r.date) },
      ]}
    />
  ),
});
