import { isEmpty } from 'lodash';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');
  const body = await request.json();
  const { takesMedication: _takesMedication, hasDisease: _hasDisease, ...resBody } = body;

  const formatedBody = {
    ...resBody,
    dataConsent: Boolean(resBody.dataConsent),
    recordNumber: Number(resBody.recordNumber),
    candidatePhone: resBody.candidatePhone.replace(/[^\d]/g, ''),
    godfatherPhone: resBody.godfatherPhone.replace(/[^\d]/g, ''),
  };

  const res = await fetch(`${process.env.BASE_API_URL}/records/posl`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatedBody),
  });

  const data = await res.json();

  if (res.status === 400) return Response.json({ ok: false, data });

  return Response.json({ ok: true, data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error('Token com problema');

  const body = await request.json();
  const {
    id,
    takesMedication: _takesMedication,
    hasDisease: _hasDisease,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...resBody
  } = body;

  const formatedBody = {
    ...resBody,
    dataConsent: Boolean(resBody.dataConsent),
    recordNumber: Number(resBody.recordNumber),
    candidatePhone: resBody.candidatePhone.replace(/[^\d]/g, ''),
    godfatherPhone: resBody.godfatherPhone.replace(/[^\d]/g, ''),
  };

  if (isEmpty(id)) throw new Error('Precisa de identificação!');

  const res = await fetch(`${process.env.BASE_API_URL}/records/posl/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatedBody),
  });

  const data = await res.json();

  if (res.status === 400) return Response.json({ ok: false, data });

  return Response.json({ ok: true, data });
}
