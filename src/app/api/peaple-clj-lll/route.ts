import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  const token = (await headers()).get('authorization');

  if (!token) throw new Error('Token com problema');

  const searchParams = request.nextUrl.searchParams;
  const peapleId = searchParams.get('peapleId');

  if (!peapleId) throw new Error('Identificação necessária!');

  const res = await fetch(`${process.env.BASE_API_URL}/peaple-poslll/${peapleId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return NextResponse.json({ ok: true, data });
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  const body = await request.json();

  if (!token?.accessToken) throw new Error('Token com problema');

  const res = await fetch(`${process.env.BASE_API_URL}/peaple-poslll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json({ ok: true, data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = await request.json();

  const peapleId = request.nextUrl.searchParams.get('peapleId');
  if (!peapleId) throw new Error('Curso não identificado!');

  const res = await fetch(`${process.env.BASE_API_URL}/peaple-poslll/${peapleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json({ ok: true, data });
}

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const peapleId = request.nextUrl.searchParams.get('peapleId');
  if (!peapleId) throw new Error('Curso nao identificado!');

  const res = await fetch(`${process.env.BASE_API_URL}/peaple-poslll/${peapleId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const data = await res.json();

  return NextResponse.json({ ok: true, data });
}
