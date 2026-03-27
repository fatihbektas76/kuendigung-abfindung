import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  // Revalidate the entire site tree — covers all static and dynamic pages
  revalidatePath('/', 'layout');

  return NextResponse.json({
    revalidated: true,
    scope: 'full-site',
    timestamp: new Date().toISOString(),
  });
}
