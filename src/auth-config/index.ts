import jwt from 'jsonwebtoken';
import type { NextAuthOptions, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        const res = await fetch(`${process.env.BASE_API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user: User = await res.json();

        if (!res.ok || !user) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const decodedToken = jwt.decode(token.accessToken) as JWT;

      if (user) {
        token.id = user.id;
        token.name = user.nome;
        token.email = user.email;
        token.loginType = user.loginType;
        token.accessToken = user.accessToken;
      }

      if (decodedToken) {
        const inicioDaSessão = new Date(decodedToken.exp! * 1000);
        const agora = new Date();

        if (agora > inicioDaSessão) {
          return {
            ...token,
            error: 'TokenExpirou',
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.loginType = token.loginType;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/',
  },
};
