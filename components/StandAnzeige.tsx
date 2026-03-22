const monate = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export default function StandAnzeige() {
  const now = new Date();
  const monat = monate[now.getMonth()];
  const jahr = now.getFullYear();

  return (
    <div className="flex items-center gap-1.5 text-[0.78rem] text-ink-muted">
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <time dateTime={now.toISOString().split('T')[0]}>
        Stand: {monat} {jahr}
      </time>
    </div>
  );
}
