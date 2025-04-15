import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth-config";

import { EditUserClientPage } from "./client-page";

async function fullUrl() {
  const headersList = headers();
  const host = (await headersList).get("host");
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

interface EditUserPageInterface {
  params: Promise<{ userId: string }>;
}

export default async function EditUserPage(props: EditUserPageInterface) {
  const { params } = props;
  const { userId } = await params;
  const session = await getServerSession(authOptions);

  if (session && session.accessToken && userId) {
    const url = await fullUrl();
    const response = await fetch(`${url}/api/user?userId=${userId}`, {
      method: "GET",
      headers: { authorization: session.accessToken },
    });
    const data = await response.json();

    if (data.ok) {
      return <EditUserClientPage user={data.data} />;
    }
  }

  redirect("/view/users");
}
