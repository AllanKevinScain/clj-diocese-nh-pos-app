import { isEmpty } from 'lodash';
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { InferType } from 'yup';

import type { backgroundTableSchema } from '@/yup';

type BackgroundTableSchemaInferType = InferType<typeof backgroundTableSchema>;

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as BackgroundTableSchemaInferType;
  if (isEmpty(body.courseId)) throw new Error('Identificação do curso necessária!');

  const {
    coordinator: _coordinator,
    auxiliar: _auxiliar,
    base: _base,
    coupleKitchenCoordinator: _coupleKitchenCoordinator,
    kitchenSpiritual: _kitchenSpiritual,
    liturgy: _liturgy,
    secretary: _secretary,
    ...restBody
  } = body;

  const res = await fetch(`${process.env.BASE_API_URL}/work-table`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(restBody),
  });

  const data = await res.json();

  if (res.status !== 200) return NextResponse.json({ ok: false, data });

  return NextResponse.json({ ok: true, data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = (await request.json()) as BackgroundTableSchemaInferType;
  const { id, ...restBody } = body;

  const res = await fetch(`${process.env.BASE_API_URL}/work-table/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(restBody),
  });

  const data = await res.json();

  if (res.status !== 200) return NextResponse.json({ ok: false, data });

  return NextResponse.json({ ok: true, data });
}
