import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token?.accessToken) throw new Error('Token com problema');

  const res = await fetch(`${process.env.BASE_API_URL}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const data = await res.json();
  if (res.status === 204) return NextResponse.json({ ok: true, data: [] });
  if (res.status !== 200) return NextResponse.json({ ok: false, data: data });
  return NextResponse.json({ ok: true, data });
}
