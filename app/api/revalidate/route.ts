import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  const paths = [
    '/',
    '/abfindung',
    '/kuendigung',
    '/aufhebungsvertrag',
    '/abmahnung',
    '/fristlose-kuendigung',
    '/ratgeber',
    '/ratgeber/urteile',
    '/ratgeber/muster',
    '/abfindungsrechner',
    '/kuendigung-pruefen',
    '/blog',
  ];

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    paths: paths.length,
    timestamp: new Date().toISOString(),
  });
}
