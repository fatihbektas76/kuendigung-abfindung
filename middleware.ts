import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Surfaces the current pathname as `x-pathname` so server components in the
 * root layout can detect whether the request targets the German or English
 * tree without depending on the `next/headers` request URL parsing dance.
 *
 * Why: app/layout.tsx must render `<html lang="..">` correctly for both
 * `/`-rooted German pages and `/en/`-rooted English pages, but RSC has no
 * built-in way to read the pathname inside a server component.
 */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: { headers },
  });
}

export const config = {
  matcher: [
    /*
     * Match every path except:
     * - Next.js internals (`_next/static`, `_next/image`)
     * - Common public-asset paths
     * - The favicon
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2)$).*)',
  ],
};
