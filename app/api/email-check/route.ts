import { NextRequest, NextResponse } from 'next/server';
import { promises as dnsp } from 'dns';
import { isDisposableDomain } from '@/lib/disposable-emails';

// Node-Runtime — Edge hat kein dns-Modul.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EmailCheckResult =
  | { ok: true }
  | { ok: false; reason: 'format' | 'disposable' | 'no-mx' }
  | { ok: 'unknown'; reason: 'dns-error' };

export async function POST(request: NextRequest) {
  let email = '';
  try {
    const body = await request.json();
    email = typeof body?.email === 'string' ? body.email.trim() : '';
  } catch {
    return NextResponse.json<EmailCheckResult>(
      { ok: false, reason: 'format' },
      { status: 200 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json<EmailCheckResult>(
      { ok: false, reason: 'format' },
      { status: 200 },
    );
  }

  const atIdx = email.lastIndexOf('@');
  const domain = email.slice(atIdx + 1).toLowerCase();

  if (isDisposableDomain(domain)) {
    return NextResponse.json<EmailCheckResult>(
      { ok: false, reason: 'disposable' },
      { status: 200 },
    );
  }

  try {
    const records = await dnsp.resolveMx(domain);
    if (!records || records.length === 0) {
      // resolveMx ohne Records → prüfe fallback A-Record; RFC-5321-konforme
      // Server akzeptieren Mail auch ohne MX, wenn A-Record existiert.
      try {
        await dnsp.resolve(domain);
        return NextResponse.json<EmailCheckResult>({ ok: true }, { status: 200 });
      } catch {
        return NextResponse.json<EmailCheckResult>(
          { ok: false, reason: 'no-mx' },
          { status: 200 },
        );
      }
    }
    return NextResponse.json<EmailCheckResult>({ ok: true }, { status: 200 });
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'ENOTFOUND' || code === 'ENODATA' || code === 'NXDOMAIN') {
      // Domain existiert nicht bzw. hat keine Mail-Konfiguration.
      return NextResponse.json<EmailCheckResult>(
        { ok: false, reason: 'no-mx' },
        { status: 200 },
      );
    }
    // Netzwerk-/DNS-Fehler → nicht blockieren, aber signalisieren.
    return NextResponse.json<EmailCheckResult>(
      { ok: 'unknown', reason: 'dns-error' },
      { status: 200 },
    );
  }
}
