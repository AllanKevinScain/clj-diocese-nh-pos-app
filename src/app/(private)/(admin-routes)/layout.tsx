import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth-config";

export const metadata: Metadata = {
  title: "Administração",
  description: "Página de administradores",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.loginType !== "admin") {
    redirect("/courses");
  }
  return children;
}
