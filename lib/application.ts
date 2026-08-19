export const APPLICATION_DEADLINE = "2026-08-28T20:59:59.999Z";

export const APPLICATION_DEADLINE_LABEL =
  "28 August 2026 at 11:59 PM EAT";

export function applicationsAreClosed(now = new Date()) {
  return now.getTime() > new Date(APPLICATION_DEADLINE).getTime();
}
