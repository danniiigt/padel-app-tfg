import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const user = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            body: Object.entries(credentials)
              .map((e) => e.join("="))
              .join("&"),
          }
        )
          .then((res) => res.json())
          .catch((err) => {
            return null;
          });

        if (user) {
          return user;
        } else {
          return false;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      return true;
    },
    // redirect: async ({ url, baseUrl }) => {
    //   console.log("REDIRECT MADERFAKUER");
    //   console.log({ url });
    //   console.log({ baseUrl });

    //   const params = new URLSearchParams(new URL(url).search);
    //   const callbackUrl = params.get("callbackUrl");

    //   if (url.startsWith(baseUrl)) {
    //     if (callbackUrl?.startsWith("/")) {
    //       return baseUrl + callbackUrl;
    //     } else if (callbackUrl?.startsWith(baseUrl)) {
    //       return callbackUrl;
    //     }
    //   } else {
    //     return Promise.resolve(baseUrl);
    //   }
    //   // return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl);
    // },
    // Getting the JWT token from API response
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      const isSigningIn = user ? true : false;
      if (isSigningIn) {
        token.jwt = user.access_token;
        token.user = user;
      } else {
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.jwt = token.jwt;
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
  // session
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

export default NextAuth({
  ...authOptions,
});
