import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseNumber: string }> }
) {
  const token = await getToken({ req: request });
  if (!token?.accessToken) throw new Error("Token com problema");

  const { courseNumber } = await params;
  if (!courseNumber) throw new Error("Identificação necessária!");

  const res = await fetch(
    `${process.env.BASE_API_URL}/course/${courseNumber}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }
  );

  const data = await res.json();

  return Response.json(data);
}
