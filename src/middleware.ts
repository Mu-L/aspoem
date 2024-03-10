import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./dictionaries";

// Get the preferred locale, similar to the above or using a library
function getLocale() {
  const headers = { "accept-language": defaultLocale };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale trpc 不走 i18n
  const locale = getLocale();

  if (pathname.startsWith("/api/trpc")) {
    request.headers.set("accept-language", locale);
    return NextResponse.next();
  }

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|favicon|fonts|tools|demo|create|robots|sitemap|share-card-bg|content).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
