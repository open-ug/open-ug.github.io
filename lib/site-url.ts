import { headers } from "next/headers";

function normalizeOrigin(value: string | undefined) {
  if (!value) return null;
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(candidate).origin;
  } catch {
    return null;
  }
}

export async function getSiteUrl() {
  const configured =
    normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeOrigin(process.env.VERCEL_URL);
  if (configured) return configured;

  const requestOrigin = normalizeOrigin(
    (await headers()).get("origin") ?? undefined,
  );
  return requestOrigin ?? "http://localhost:3000";
}
