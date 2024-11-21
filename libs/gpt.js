import axios from "axios";

// Use this if you want to make a call to OpenAI GPT-4 for instance. userId is used to identify the user on openAI side.
export const sendOpenAi = async (messages, userId, max = 10000, temp = 1) => {
  const url = "https://api.openai.com/v1/chat/completions";
  console.log(process.env.OPENAI_API_KEY);

  console.log("Ask GPT >>>");
  messages.map((m) =>
    console.log(" - " + m.role.toUpperCase() + ": " + m.content)
  );

  const body = JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a solo develepor influencer trying to advertise your product on twitter using your git commits to get more users, write a tweet that cant exceed the twitter character limit of 275 no matter what.",
      },
      {
        role: "user",
        content: messages.map((m) => m.content).join("\n"),
      }
      
    ],
    max_tokens: max,
    temperature: temp,
    user: userId,
  });


  const options = {
    headers: {
      Authorization: `Bearer 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`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(url, body, options);

    const answer = res.data.choices[0].message.content;
    const usage = res?.data?.usage;

    console.log(">>> " + answer);
    console.log(
      "TOKENS USED: " +
        usage?.total_tokens +
        " (prompt: " +
        usage?.prompt_tokens +
        " / response: " +
        usage?.completion_tokens +
        ")"
    );
    console.log("\n");

    return answer;
  } catch (e) {
    console.error("GPT Error: " + e?.response?.status, e?.response?.data);
    return null;
  }
};
