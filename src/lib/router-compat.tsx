/**
 * Compatibility shim: re-exports TanStack Router primitives
 * with react-router-dom-shaped APIs so the original repo
 * components keep working unchanged.
 */
import * as React from "react";
import {
  Link as TLink,
  Outlet,
  useNavigate as useTNavigate,
  useLocation as useTLocation,
  useParams as useTParams,
  useSearch,
  useRouter,
} from "@tanstack/react-router";

export { Outlet };

type AnyProps = Record<string, any>;

function isExternal(to: string) {
  return /^(https?:)?\/\//.test(to) || to.startsWith("mailto:") || to.startsWith("tel:");
}

/**
 * RRD-style Link / NavLink. Renders a plain <a> for safety
 * (TanStack Link requires typed routes which we don't have).
 * Falls back to client navigation via router.navigate to keep SPA behavior.
 */
function makeAnchor(activeAware: boolean) {
  return React.forwardRef<HTMLAnchorElement, AnyProps>(function RRDAnchor(
    { to, replace, className, style, children, onClick, end, ...rest },
    ref
  ) {
    const router = useRouter();
    const location = useTLocation();
    const href = typeof to === "string" ? to : to?.pathname ?? "/";
    const pathname = location.pathname;
    const isActive = activeAware
      ? end || rest.activeOptions?.exact
        ? pathname === href
        : pathname === href || pathname.startsWith(href + "/")
      : false;

    const resolvedClassName =
      typeof className === "function" ? className({ isActive }) : className;
    const resolvedStyle = typeof style === "function" ? style({ isActive }) : style;
    const resolvedChildren =
      typeof children === "function" ? children({ isActive }) : children;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      if (isExternal(href)) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      router.navigate({ to: href, replace: !!replace });
    };

    return (
      <a
        ref={ref}
        href={href}
        className={resolvedClassName}
        style={resolvedStyle}
        onClick={handleClick}
        {...rest}
      >
        {resolvedChildren}
      </a>
    );
  });
}

export const Link = makeAnchor(false);
export const NavLink = makeAnchor(true);

export function useNavigate() {
  const router = useRouter();
  return React.useCallback(
    (to: string | number | { pathname?: string }, options?: { replace?: boolean }) => {
      if (typeof to === "number") {
        window.history.go(to);
        return;
      }
      const path = typeof to === "string" ? to : to?.pathname ?? "/";
      router.navigate({ to: path, replace: !!options?.replace });
    },
    [router]
  );
}

export function useLocation() {
  const loc = useTLocation();
  return {
    pathname: loc.pathname,
    search: loc.searchStr ?? "",
    hash: loc.hash ?? "",
    state: (loc as any).state ?? null,
  };
}

export function useParams<T extends Record<string, string> = Record<string, string>>() {
  return useTParams({ strict: false }) as unknown as T;
}

export function useSearchParams(): [URLSearchParams, (next: URLSearchParams | Record<string, string>) => void] {
  const router = useRouter();
  const loc = useTLocation();
  const params = React.useMemo(
    () => new URLSearchParams(loc.searchStr ?? ""),
    [loc.searchStr]
  );
  const setParams = React.useCallback(
    (next: URLSearchParams | Record<string, string>) => {
      const sp = next instanceof URLSearchParams ? next : new URLSearchParams(next);
      router.navigate({ to: loc.pathname, search: Object.fromEntries(sp) as any });
    },
    [router, loc.pathname]
  );
  return [params, setParams];
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const router = useRouter();
  React.useEffect(() => {
    router.navigate({ to, replace: !!replace });
  }, [to, replace, router]);
  return null;
}
