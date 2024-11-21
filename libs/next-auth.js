import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import config from "@/config";
import connectMongo from "./mongo";
import LogoName from "@/components/LogoName";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name ? profile.given_name : profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: new Date(),
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope:"repo read:user user:email",
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          createdAt: new Date(),
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "1.0A", // Set to OAuth 1.0a
      authorization: {
        url: "https://api.twitter.com/oauth/authorize",
      },
      token: "https://api.twitter.com/oauth/access_token",
    
      }),
    ...(connectMongo
      ? [
          EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: config.mailgun.fromNoReply,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
  ],
adapter: MongoDBAdapter(connectMongo),
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async signIn({ user }) {
      return user ? true : false;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    brandColor: config.colors.main,
    logo: LogoName,
    colorScheme: 'auto', // Optional: Light or dark mode support
  },
  pages: {
    signIn: "/signIn",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: null,
  },
  debug : true,
  
};

export default authOptions;
