const monate = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

function firstOfMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

interface StandAnzeigeProps {
  modifiedAt?: Date | string;
}

export default function StandAnzeige({ modifiedAt }: StandAnzeigeProps = {}) {
  const date = modifiedAt ? new Date(modifiedAt) : firstOfMonth();
  const monat = monate[date.getMonth()];
  const jahr = date.getFullYear();
  const iso = date.toISOString().slice(0, 10);

  return (
    <div className="flex items-center gap-1.5 text-[0.78rem] text-ink-muted">
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <time dateTime={iso}>
        Stand: {monat} {jahr}
      </time>
    </div>
  );
}
