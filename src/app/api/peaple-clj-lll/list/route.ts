import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token?.accessToken) throw new Error('Token com problema');

  const res = await fetch(`${process.env.BASE_API_URL}/course`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  if (res.status === 204) return NextResponse.json([]);

  const data = await res.json();

  return NextResponse.json(data);
}
