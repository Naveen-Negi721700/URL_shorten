import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ], 

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.githubId = account.providerAccountId;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.githubId = token.githubId;

      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };