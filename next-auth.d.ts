import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accessToken: string;
    id: string;
    email: string;
    loginType: "admin" | "manager";
    nome: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
    error?: strings;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    id: string;
    email: string;
    loginType: "admin" | "manager";
    nome: string;
    iat?: number;
    exp?: number;
    error?: string;
  }
}
