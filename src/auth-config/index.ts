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
      // O user só existe no primeiro login.
      if (user) {
        const decodedToken = jwt.decode(user.accessToken) as JWT;
        const expirationTime = decodedToken.exp! * 1000;

        return {
          ...token,
          id: user.id,
          name: user.nome,
          email: user.email,
          loginType: user.loginType,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: expirationTime,
        };
      }

      // Se o token de acesso não expirou.
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Se o token de acesso expirou.
      try {
        const response = await fetch(`${process.env.BASE_API_URL}/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: token.refreshToken,
          }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
          throw refreshedTokens;
        }

        const decodedToken = jwt.decode(refreshedTokens.accessToken) as JWT;
        const expirationTime = decodedToken.exp! * 1000;

        return {
          ...token,
          accessToken: refreshedTokens.accessToken,
          accessTokenExpires: expirationTime,
          // Retorna o novo refresh token se ele for enviado, se não mantém o antigo.
          refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
        };
      } catch (error) {
        console.error('Erro ao atualizar o token de acesso:', error);
        return {
          ...token,
          error: 'RefreshAccessTokenError', // Erro para poder tratar.
        };
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.loginType = token.loginType;
        session.accessToken = token.accessToken;
        session.error = token.error; // Passa o erro para a sessão.
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
