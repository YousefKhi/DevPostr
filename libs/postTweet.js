
import apiClient from "./api";

export default async function postTweet(tweet) {
  try {
    console.log("Posting tweet pt:", tweet);
    const response = await apiClient.post("/twitter", {tweet}); // Ensure this path matches the file path
    if (response.status === 201) {
      console.log("Tweet posted successfully:", response);
    } else {
      console.error("Failed to post tweet:", response.data.error);
    }
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}
