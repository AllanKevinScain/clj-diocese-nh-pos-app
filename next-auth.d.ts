import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    id: string;
    email: string;
    loginType: 'admin' | 'manager' | 'builder-manager';
    nome: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
    refreshToken?: string;
    error?: strings;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    id: string;
    email: string;
    loginType: 'admin' | 'manager';
    nome: string;
    iat?: number;
    exp?: number;
    error?: string;
  }
}
