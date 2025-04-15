import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth-config";

import { ClientPage } from "./client-page";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/courses");
  }

  return <ClientPage />;
}
