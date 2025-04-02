import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(async function middleware(request: NextRequest) {
  console.log("🚀 ~ middleware ~ request:", request);
  // const collaboratorsURL = new URL("/collaborators", request.url);
  // return NextResponse.redirect(updatePasswordURL);

  return NextResponse.next();
});

export const config = {
  matcher: [],
};
