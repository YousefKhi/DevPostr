import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // Add access token to session object
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account }) {
      // If initial sign-in, add access token to the token object
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

export default authOptions;