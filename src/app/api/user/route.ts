import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { ReturnHandlerApiType } from '@/types';
import type { RegisterUserSchemaInferType } from '@/yup/user-schema';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as RegisterUserSchemaInferType;

  const res = await fetch(`${process.env.BASE_API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as ReturnHandlerApiType<RegisterUserSchemaInferType>;
  return NextResponse.json({ ok: res.status !== 200 ? false : true, ...data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const userId = request.nextUrl.searchParams.get('userId');
  if (!userId) throw new Error('Usuário não identificado!');

  const body = (await request.json()) as RegisterUserSchemaInferType;

  const res = await fetch(`${process.env.BASE_API_URL}/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as ReturnHandlerApiType<RegisterUserSchemaInferType>;
  return NextResponse.json({ ok: res.status !== 200 ? false : true, ...data });
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

  const data = (await res.json()) as ReturnHandlerApiType<RegisterUserSchemaInferType>;
  return NextResponse.json({ ok: res.status !== 200 ? false : true, ...data });
}
