import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { RegisterUserSchemaInferType } from '@/yup/user-schema';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as RegisterUserSchemaInferType;
  const { city, coName, email, name, ...rest } = body;

  const res = await fetch(`${process.env.BASE_API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify({
      ...rest,
      city: city.trim(),
      coName: coName.trim(),
      email: email.trim(),
      name: name.trim(),
    }),
  });

  const data = await res.json();
  if (res.status !== 200) return NextResponse.json({ ok: false, data: data });
  return NextResponse.json({ ok: true, data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const userId = request.nextUrl.searchParams.get('userId');
  if (!userId) throw new Error('Usuário não identificado!');

  const body = (await request.json()) as RegisterUserSchemaInferType;
  const { city, coName, email, name, id: _, ...rest } = body;

  const res = await fetch(`${process.env.BASE_API_URL}/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify({
      ...rest,
      city: city.trim(),
      coName: coName.trim(),
      email: email.trim(),
      name: name.trim(),
    }),
  });

  const data = await res.json();
  if (res.status !== 200) return NextResponse.json({ ok: false, data: data });
  return NextResponse.json({ ok: true, data });
}

export async function PATCH(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const userId = request.nextUrl.searchParams.get('userId');
  if (!userId) throw new Error('Usuário não identificado!');

  const res = await fetch(`${process.env.BASE_API_URL}/user/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const data = await res.json();
  if (res.status !== 200) return NextResponse.json({ ok: false, data: data });
  return NextResponse.json({ ok: true, data });
}
