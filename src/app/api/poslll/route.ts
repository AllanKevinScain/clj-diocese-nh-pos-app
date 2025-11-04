import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { InferType } from 'yup';

import type { poslllSchema } from '@/yup';

type PoslllSchemaInferType = InferType<typeof poslllSchema>;

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  const body = (await request.json()) as PoslllSchemaInferType;

  if (!token?.accessToken) throw new Error('Token com problema');

  const res = await fetch(`${process.env.BASE_API_URL}/poslll`, {
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

  const poslllId = request.nextUrl.searchParams.get('poslllId');
  if (!poslllId) throw new Error('Curso não identificado!');

  const res = await fetch(`${process.env.BASE_API_URL}/poslll/${poslllId}`, {
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

export async function PATCH(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const poslllId = request.nextUrl.searchParams.get('poslllId');
  if (!poslllId) throw new Error('Curso nao identificado!');

  const res = await fetch(`${process.env.BASE_API_URL}/poslll/${poslllId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const data = await res.json();

  return NextResponse.json({ ok: true, data });
}
