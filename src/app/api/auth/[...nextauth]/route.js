import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        // قبول بسيط لغرض التجربة: أي بريد مع كلمة مرور بطول >= 4
        if (password.length >= 4) {
          return { id: email, name: email.split("@")[0], email };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",      
    error: "/login",      
    signOut: "/login",     
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },

    async jwt({ token, account, profile, user }) {
      // OAuth providers
      if (account && profile) {
        token.email = profile?.email || token.email;
        token.name = profile?.name || token.name;
      }
      if (user) {
        token.email = user.email || token.email;
        token.name = user.name || token.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.email) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
