import { getSession } from "next-auth/react";
import connectMongo from "@/libs/mongoose"; // Import your MongoDB connection
import User from "@/models/User"; // Import your User model

export default async function handler(req, res) {
  // Ensure the request is a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Retrieve the session to get the user ID
    const session = await getSession({ req });
    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Connect to MongoDB
    await connectMongo();

    // Find the user in the database by their ID
    const user = await User.findById(session.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with user data, including linked accounts
    res.status(200).json({
      id: user._id,
      email: user.email,
      linkedAccounts: user.linkedAccounts, // Assuming linkedAccounts is an array in the User model
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
