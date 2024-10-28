// components/GitHubData.js
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Octokit } from '@octokit/rest';

export default function GitHubData() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      if (status === 'loading') return;

      const accessToken = session?.accessToken;
      if (!accessToken) {
        setError('Access token is missing.');
        setLoading(false);
        return;
      }

      try {
        const octokit = new Octokit({ auth: accessToken });
        const response = await octokit.request('GET /user/repos', {
          visibility: 'public',
        });
        setRepos(response.data || []);
      } catch (err) {
        setError('Failed to fetch repositories.');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, [session, status]);

  return (
    <div>
      <h1>Your GitHub Repositories</h1>
      {loading && <p>Loading repositories...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {repos.length > 0 ? (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No repositories found.</p>
      )}
    </div>
  );
}
