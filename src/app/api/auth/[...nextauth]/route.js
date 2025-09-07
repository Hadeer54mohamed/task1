import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
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
      return `${baseUrl}/verify-otp`;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email;
        token.name = profile.name || token.name;
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
