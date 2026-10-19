/**
 * A post's date as the site prints it: "19 Oct 2026", in India's time. The
 * zone is fixed rather than the server's or the visitor's, so the server's
 * render and the browser's agree and a post never moves a day between them.
 */
const DATE = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export function postDate(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : DATE.format(date);
}
