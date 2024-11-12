"use client";
import { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import apiClient from "@/libs/api";
import { useSession } from "next-auth/react";

export default function GitHubData({ userId }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commitMessages, setCommitMessages] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const { data: session } = useSession();

  // States for user input dates
  const [since, setSince] = useState("");
  const [until, setUntil] = useState("");

  useEffect(() => {
    const fetchGitHubToken = async () => {
      try {
        const currentUserId = session?.user?.id;
        if (!currentUserId) {
          return;
        }
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

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      if (!accessToken) return;

      try {
        const octokit = new Octokit({ auth: accessToken });
        const response = await octokit.rest.repos.listForAuthenticatedUser({
          visibility: "all",
          per_page: 10,
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

  return (
    <div>
      {loading && <p>Loading repositories...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Date inputs for selecting the timeframe */}
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
        backgroundColor: "#f9f9f9", // Light background color
        border: "1px solid #ccc",
        borderRadius: "4px",
        color: "#333" // Dark text color for contrast
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
        backgroundColor: "#f9f9f9", // Light background color
        border: "1px solid #ccc",
        borderRadius: "4px",
        color: "#333" // Dark text color for contrast
      }}
    />
  </label>
</div>

      {repos.length > 0 ? (
        <ul style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: 0 }}>
          {repos.map((repo) => (
            <li key={repo.id} style={{ marginBottom: "1rem", listStyleType: "none" }}>
              <button
                className="btn btn-outline btn-accent text-white"
                onClick={() => fetchCommits(repo.owner.login, repo.name)}
              >
                {repo.name}              
              </button>    
                
            </li>
            
          ))}
        </ul>
      ) : (
        !loading && <p>No repositories found.</p>
      )}
    </div>
  );
}
