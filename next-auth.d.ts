import "next-auth";

declare module "next-auth" {
  interface User {
    access_token: string;
    id: string;
    email: string;
    loginType: "admin" | "manager";
    nome: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    id: string;
    email: string;
    loginType: "admin" | "manager";
    nome: string;
  }
}
