"use client";
import { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import apiClient from "@/libs/api";

const TwitterAccountButton = () => {
  const [twitterAccount, setTwitterAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const fetchTwitterAccount = async () => {
    const currentUserId = session?.user?.id;
    if (!currentUserId || twitterAccount) return;

    try {
      setIsLoading(true);
      const response = await apiClient.post("/database", {
        userId: currentUserId,
        provider: "twitter",
      });

      if (response?.accounts?.length > 0) {
        setTwitterAccount(response.accounts[0]);
        console.log("Twitter account:", response.accounts[0]);
      } else {
        setTwitterAccount(null);
      }
    } catch (error) {
      console.error("Error fetching Twitter account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTwitterAccount();
  }, [session?.user?.id]);

  const handleLink = async () => {
    if (!twitterAccount) {
      signIn("twitter", { callbackUrl: "/dashboard" });
    } else {
      try {
        setIsLoading(true);
        const response = await apiClient.delete("/database", {
          data: { userId: session.user.id, provider: "twitter" },
        });
        if (response.status === 200) {
          setTwitterAccount(null);
        }
      } catch (error) {
        console.error("Error unlinking Twitter account:", error);
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
            <svg className="w-6 h-6 text-blue-500" aria-hidden="true" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.61.58-2.48.69a4.27 4.27 0 001.88-2.36c-.83.5-1.75.86-2.7 1.05A4.22 4.22 0 0015.5 4a4.27 4.27 0 00-4.26 4.26c0 .33.04.65.1.96a12.12 12.12 0 01-8.77-4.44 4.26 4.26 0 00-.58 2.15 4.28 4.28 0 001.9 3.55 4.26 4.26 0 01-1.93-.53v.05a4.28 4.28 0 003.43 4.18 4.22 4.22 0 01-1.92.07 4.28 4.28 0 003.99 2.96A8.57 8.57 0 012 18.54a12.06 12.06 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2v-.56A8.7 8.7 0 0022.46 6Z" />
            </svg>
            {twitterAccount ? "Unlink Twitter" : "Link Twitter"}
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
                  {twitterAccount ? "Unlink Twitter" : "Link Twitter"}
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default TwitterAccountButton;
