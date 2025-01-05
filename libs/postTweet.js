import apiClient from "./api";

export default async function postTweet(tweet) {
  try {
    console.log("Posting tweet:", tweet);
    const response = await apiClient.post("/twitter", { tweet }); // Ensure this path matches the file path

    if (response.status === 201) {
      console.log("Tweet posted successfully:", response);

      // Check for Notification API permission
      if (Notification.permission === "granted") {
        new Notification("Tweet Posted Successfully!");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Tweet Posted Successfully!");
          }
        });
      }
    }
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}
