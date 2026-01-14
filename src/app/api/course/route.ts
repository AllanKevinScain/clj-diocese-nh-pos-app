import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { ReturnHandlerApiType } from '@/types';
import type { CourseInferType } from '@/yup';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  const body = await request.json();

  if (!token?.accessToken) throw new Error('Token com problema');

  const res = await fetch(`${process.env.BASE_API_URL}/course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as ReturnHandlerApiType<CourseInferType>;
  if (res.status !== 200) {
    return NextResponse.json({ ok: false, ...data });
  }

  return NextResponse.json({ ok: true, ...data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = await request.json();

  const courseId = request.nextUrl.searchParams.get('courseId');
  if (!courseId) throw new Error('Curso não identificado!');

  const res = await fetch(`${process.env.BASE_API_URL}/course/${courseId}`, {
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

  const courseId = request.nextUrl.searchParams.get('courseId');
  if (!courseId) throw new Error('Curso nao identificado!');

  const res = await fetch(`${process.env.BASE_API_URL}/course/${courseId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  const data = (await res.json()) as ReturnHandlerApiType<CourseInferType>;
  return NextResponse.json({ ok: res.status !== 200 ? false : true, ...data });
}
