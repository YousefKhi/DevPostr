import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import Account from "@/models/Account";
import connectMongo from "@/libs/mongoose";
import mongoose from "mongoose";
import authOptions from "@/libs/next-auth";

export async function POST(req) {
  try {
    const { TwitterApi } = require('twitter-api-v2');
    const { tweet } = await req.json();

    // Ensure session data is server-side compatible
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;

    // Connect to MongoDB and retrieve user's Twitter account tokens
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) 
      ? new mongoose.Types.ObjectId(userId) 
      : userId;

    // Connect to the database
    await connectMongo();

    // Use Mongoose's findOne method to get the Twitter account tokens
    const account = await Account.findOne({ 
      userId: userObjectId, 
      provider: "twitter" 
    });

    if (!account) {
      return NextResponse.json({ error: "Twitter account not found" }, { status: 404 });
    }

    // Create Twitter client with the user's tokens
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_CLIENT_ID,
      appSecret: process.env.TWITTER_CLIENT_SECRET,
      accessToken: '1461431191156965377-eGfOoTSlkPlnOq7WYBP2dXFpmvUiy3',
      accessSecret: 'h66IL0SefHBPhDqmiBWXSU2fSQRvbsJPmadMdSjmjQccQ',
    });

    // Post the tweet using v2 API
    const response = await twitterClient.v2.tweet({ text: tweet });

    if (response.data) {
      return NextResponse.json({ 
        message: "Tweet posted successfully", 
        data: response.data 
      }, { status: 201 });
    } else {
      return NextResponse.json({ 
        error: "Failed to post tweet to Twitter API" 
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to post tweet", 
      details: error.message 
    }, { status: 500 });
  }
}
