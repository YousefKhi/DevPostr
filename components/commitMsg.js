import fetch from "node-fetch";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

async function getCommitMessages(owner, repo, token) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `token ${token}`,
            "Accept": "application/vnd.github.v3+json"
        }
    });

    if (!response.ok) {
        console.error("Failed to fetch commits", response.status);
        return [];
    }

    const commits = await response.json();
    return commits.map(commit => commit.commit.message);
}

export default function CommitMsg() {
    const { data: session, status } = useSession();
    const [commitMessages, setCommitMessages] = useState([]);
    
    useEffect(() => {
        async function fetchCommits() {
            if (status === 'authenticated' && session) {
                const token = session.accessToken;
                const owner = session.user.login;
                const repo = "your-repo-name"; // Set your desired repository name here
                
                const messages = await getCommitMessages(owner, repo, token);
                setCommitMessages(messages);
            }
        }
        
        fetchCommits();
    }, [session, status]);

    return (
        <div>
            <h1>Commit Messages</h1>
            <ul>
                {commitMessages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}
