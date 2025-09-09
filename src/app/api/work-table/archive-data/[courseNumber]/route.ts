import { isEmpty } from 'lodash';
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseNumber: string }> },
) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const { courseNumber } = await params;
  if (isEmpty(courseNumber)) throw new Error('Precisa de identificação!');

  const url = `${process.env.BASE_API_URL}/work-table/archive-data/${courseNumber}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token?.accessToken}` },
  });

  if (res.status === 204) {
    return NextResponse.json({ ok: false, data: { message: 'Nenhum conteudo encontrado' } });
  }

  const data = await res.json();
  if (res.status !== 200) return NextResponse.json({ ok: false, data });
  return NextResponse.json({ ok: true, data });
}
