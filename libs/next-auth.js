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
]}

export default authOptions;