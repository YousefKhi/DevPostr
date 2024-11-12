/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import apiClient from "@/libs/api";

const GitHubAccountButton = ({ userId }) => {
  const [githubAccount, setGitHubAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const fetchGitHubAccount = async () => {
    const currentUserId = session?.user?.id;
    if (!currentUserId) return;

    try {
      setIsLoading(true);
      const response = await apiClient.post("/database", {
        userId: currentUserId,
        provider: "github",
      });

      if (response?.accounts?.length > 0) {
        setGitHubAccount(response.accounts[0]);
        console.log("GitHub account:", response.accounts[0]);
      } else {
        setGitHubAccount(null);
      }
    } catch (error) {
      console.error("Error fetching GitHub account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubAccount();
  }, [userId, session]);

  const handleLink = async () => {
    if (!githubAccount) {
      signIn("github", { callbackUrl: "/dashboard" });
    } else {
      try {
        setIsLoading(true);
        const response = await apiClient.delete("/database", {
          data: { userId: session.user.id, provider: "github" },
        });
        if (response.status === 200) {
          setGitHubAccount(null);
          fetchGitHubAccount(); // Refresh account status after unlinking
        }
      } catch (error) {
        console.error("Error unlinking GitHub account:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Popover className="relative z-10">
      {({ open }) => (
        <>
          <Popover.Button className="btn flex items-center gap-2">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd"/>
            </svg>
            {githubAccount ? "Unlink GitHub" : "Link GitHub"}
            {isLoading && <span className="loading loading-spinner loading-xs"></span>}
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-[16rem] transform">
              <div className="overflow-hidden rounded-xl shadow-xl ring-1 ring-base-content ring-opacity-5 bg-base-100 p-1">
                <button
                  className="flex items-center gap-2 hover:bg-base-300 duration-200 py-1.5 px-4 w-full rounded-lg font-medium"
                  onClick={handleLink}
                >
                  {githubAccount ? "Unlink GitHub" : "Link GitHub"}
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GitHubAccountButton;
