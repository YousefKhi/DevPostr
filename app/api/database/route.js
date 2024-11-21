import connectMongo from "@/libs/mongoose"; // Import your Mongoose connection helper
import Account from "@/models/Account"; // Import your Mongoose model for the "accounts" collection
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Import mongoose to check for ObjectId

export async function POST(req) {
  try {
    const { userId, provider } = await req.json();

    // Convert userId to ObjectId if necessary
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    // Connect to the database
    await connectMongo();

    // Use Mongoose's find method to get all matching documents
    const response = await Account.find({ userId: userObjectId, provider });

    return NextResponse.json({ accounts: response || [] }, { status: 200 }); // Return an empty array if no accounts are found
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { userId, provider } = await req.json();

    // Convert userId to ObjectId if necessary
    const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    // Connect to the database
    await connectMongo();

    // Use Mongoose's deleteOne method to delete the document
    const deleteResult = await Account.deleteOne({ userId: userObjectId, provider });

    if (deleteResult.deletedCount > 0) {
      return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No account found to delete" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
