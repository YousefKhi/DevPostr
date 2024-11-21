"use client";
import { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import apiClient from "@/libs/api";
import { useSession } from "next-auth/react";
import { sendOpenAi } from "@/libs/gpt";

export default function GitHubData({ userId, setTweet }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commitMessages, setCommitMessages] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const { data: session } = useSession();
  const [since, setSince] = useState("");
  const [until, setUntil] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [userInput, setUserInput] = useState("");

  // Fetch GitHub token and handle errors
  useEffect(() => {
    const fetchGitHubToken = async () => {
      try {
        const currentUserId = session?.user?.id;
        if (!currentUserId) return;

        const response = await apiClient.post("/database", {
          userId: currentUserId,
          provider: "github",
        });

        if (response?.accounts?.length > 0) {
          const githubAccount = response.accounts[0];
          setAccessToken(githubAccount.access_token);
        } else {
          setError("GitHub account not linked.");
        }
      } catch (err) {
        setError("Failed to fetch GitHub account.");
      }
    };

    fetchGitHubToken();
  }, [userId]);

  // Fetch repositories for the authenticated user
  useEffect(() => {
    const fetchGitHubRepos = async () => {
      if (!accessToken) return;

      try {
        const octokit = new Octokit({ auth: accessToken });
        const response = await octokit.rest.repos.listForAuthenticatedUser({
          visibility: "all",
          per_page: 5,
        });
        setRepos(response.data || []);
      } catch (err) {
        setError("Failed to fetch repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, [accessToken]);

  const fetchCommits = async (owner, repo) => {
    if (!accessToken) return;

    try {
      const octokit = new Octokit({ auth: accessToken });
      const response = await octokit.rest.repos.listCommits({
        owner,
        repo,
        per_page: 20,
        since: since ? new Date(since).toISOString() : undefined,
        until: until ? new Date(until).toISOString() : undefined,
      });
      const messages = response.data.map((commit) => commit.commit.message);
      setCommitMessages((prev) => ({
        ...prev,
        [repo]: messages,
      }));
    } catch (err) {
      setError(`Failed to fetch commits for ${repo}.`);
    }
  };

  const handleRepoSelect = (owner, repo) => {
    setSelectedRepo(repo);
    fetchCommits(owner, repo);
  };

  const handleCombineText = async () => {
    if (!selectedRepo || !commitMessages[selectedRepo]) {
      setError("Please select a repository with commits to combine.");
      return;
    }

    const combinedText = `${userInput}\n${commitMessages[selectedRepo].join("\n")}`;
    
    // Send the combined text to the OpenAI API
    const response = await sendOpenAi([{ content: combinedText, role: "user" }], userId);

    if (response && typeof setTweet === "function") {
      setTweet(response); // Set tweet content if setTweet is available
    } else {
      setError("Failed to generate tweet content.");
    }
  };

  return (
    <div>
      {loading && <p>Loading repositories...</p>}
      {error && <div style={{ color: "red" }}>{error}</div>}
  
      {/* Date picker inputs */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Start Date:
          <input
            type="date"
            value={since}
            onChange={(e) => setSince(e.target.value)}
            style={{
              marginLeft: "0.5rem",
              padding: "0.25rem",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#333",
            }}
          />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          End Date:
          <input
            type="date"
            value={until}
            onChange={(e) => setUntil(e.target.value)}
            style={{
              marginLeft: "0.5rem",
              padding: "0.25rem",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#333",
            }}
          />
        </label>
      </div>
  
      {/* Repository buttons */}
      {repos.length > 0 ? (
        <ul style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: 0 }}>
          {repos.map((repo) => (
            <li key={repo.id} style={{ marginBottom: "1rem", listStyleType: "none" }}>
              <button
                className={`btn btn-outline ${selectedRepo === repo.name ? "bg-blue-600 text-white" : "text-black"}`}
                onClick={() => handleRepoSelect(repo.owner.login, repo.name)}
                style={{
                  backgroundColor: selectedRepo === repo.name ? "#A594F9" : "transparent",
                  color: selectedRepo === repo.name ? "#ffffff" : "#000000",
                  borderColor: selectedRepo === repo.name ? "#A594F9" : "#ccc",
                }}
              >
                {repo.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <div>No repositories found.</div>
      )}
  
      {/* User input and generate button */}
      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Custom Prompt for AI"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
            marginBottom: "1rem",
            backgroundColor: "#f9f9f9",
          }}
        />
        <button
          className="btn btn-primary"
          onClick={handleCombineText}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#A594F9",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          Generate Tweet
        </button>
      </div>
    </div>
  );
}  