import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { RecordType } from '@/types';

function parseRecordName(type: string | null) {
  if (type === null) return 'couple';
  const aux = type as RecordType;

  switch (aux) {
    case 'POSl':
      return 'posl';
    case 'POSll':
      return 'posll';
    case 'WORK':
      return 'work';
    default:
      return 'couple';
  }
}

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const recordId = request.nextUrl.searchParams.get('recordId');
  const typeOfRecord = request.nextUrl.searchParams.get('typeOfRecord');

  if (!recordId) throw new Error('Ficha não identificada!');

  const res = await fetch(
    `${process.env.BASE_API_URL}/records/${parseRecordName(typeOfRecord)}/${recordId}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token?.accessToken}` },
    },
  );
  const data = await res.json();

  return NextResponse.json({ ok: true, data });
}
