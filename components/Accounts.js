"use client";

import GitHubAccountButton from "./GithubButton";
import TwitterAccountButton from "./TwitterButton";

export default function Accounts() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Linked Accounts</h2>
      <div className="flex items-center gap-4">
        <GitHubAccountButton className="px-6 py-3" />
        <TwitterAccountButton className="px-6 py-3" />
      </div>
    </div>
  );
}


