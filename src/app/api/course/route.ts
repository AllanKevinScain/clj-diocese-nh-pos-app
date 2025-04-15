import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = (await headers()).get("authorization");

  if (!token) throw new Error("Token com problema");

  const searchParams = request.nextUrl.searchParams;
  const courseId = searchParams.get("courseId");

  if (!courseId) throw new Error("Identificação necessária!");

  const res = await fetch(`${process.env.BASE_API_URL}/course/${courseId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return Response.json({ ok: true, data });
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  const body = await request.json();

  if (!token?.accessToken) throw new Error("Token com problema");

  const res = await fetch(`${process.env.BASE_API_URL}/course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return Response.json({ ok: true, data });
}

export async function PUT(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error("Token com problema");

  const body = await request.json();

  const courseId = request.nextUrl.searchParams.get("courseId");
  if (!courseId) throw new Error("Curso não identificado!");

  const res = await fetch(`${process.env.BASE_API_URL}/course/${courseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return Response.json({ ok: true, data });
}

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error("Token com problema");

  const courseId = request.nextUrl.searchParams.get("courseId");
  if (!courseId) throw new Error("Curso nao identificado!");

  const res = await fetch(`${process.env.BASE_API_URL}/course/${courseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const data = await res.json();

  return Response.json({ ok: true, data });
}
