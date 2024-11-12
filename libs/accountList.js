import apiClient from "./api";
import { signIn } from "next-auth/react";

export async function accountList(userId, provider) {
  if (!userId || !provider) {
    throw new Error("Both userId and provider must be provided.");
  }

  try {
    const response = await apiClient.post('/database', { userId, provider });

    console.log("Account list response:", response);
    if (response.accounts && response.accounts.length > 0) {
      return response.accounts; // Return the accounts array if found
    } else {
      // Trigger sign-in with the specific provider if no accounts are found
      await signIn(provider, { callbackUrl: "/dashboard" });
    }
  } catch (error) {
    console.error("Error retrieving accounts from API:", error);
    throw new Error("Failed to retrieve accounts. Please try again later.");
  }
}
