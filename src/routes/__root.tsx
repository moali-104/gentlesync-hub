import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import * as React from "react";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/authStore";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[var(--ink)]">404</h1>
        <p className="mt-4 text-[var(--muted)]">Page not found</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 rounded-full bg-orange-500 text-white font-semibold">
          Go home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-[var(--ink)]">Something went wrong</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{error.message}</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 rounded-full bg-orange-500 text-white font-semibold">
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AutiCare — Care for children with ASD" },
      { name: "description", content: "AutiCare connects doctors, therapists, and parents to support children on the autism spectrum." },
      { property: "og:title", content: "AutiCare" },
      { property: "og:description", content: "Care platform for children with Autism Spectrum Disorder." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const initAuth = useAuthStore((s) => s.initAuth);
  React.useEffect(() => {
    initAuth();
  }, [initAuth]);
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
