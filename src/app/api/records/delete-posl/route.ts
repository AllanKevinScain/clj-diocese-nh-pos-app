import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const recordId = request.nextUrl.searchParams.get('recordId');
  if (!recordId) throw new Error('Curso nao identificado!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/posl/${recordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  const data = await res.json();

  return Response.json({ ok: true, data });
}
