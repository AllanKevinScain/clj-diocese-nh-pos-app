import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { CompleteRecordInterface, ReturnHandlerApiType } from '@/types';

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const recordId = request.nextUrl.searchParams.get('recordId');

  if (!recordId) throw new Error('Ficha não identificada!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/${recordId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  const data = (await res.json()) as ReturnHandlerApiType<CompleteRecordInterface>;
  return NextResponse.json({ ok: res.status !== 200 ? false : true, ...data });
}
