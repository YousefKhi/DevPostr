"use client";

import GitHubAccountButton from "./GithubButton";
import TwitterAccountButton from "./TwitterButton";

export default function Accounts() {
  return (
    <div>
      <h2>Linked Accounts</h2>
        <GitHubAccountButton/>
        <TwitterAccountButton/> 
    </div>
  );

}
