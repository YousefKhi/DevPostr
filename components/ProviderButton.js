/* eslint-disable @next/next/no-img-element */
"use client";

import { Popover, Transition } from "@headlessui/react";
import { useState } from "react";
import apiClient from "@/libs/api"; // Replace with your actual API client import

const ProviderButton = ({ provider, label }) => {
  const { data: session } = useSession();
  const [isUnlinking, setIsUnlinking] = useState(false);

  // Placeholder function for unlinking
  const handleUnlink = async () => {
    setIsUnlinking(true);
    try {
      await apiClient.post("/api/unlink", { provider }); // Replace with your actual unlink API endpoint
      signOut(); // Redirect after unlinking
    } catch (e) {
      console.error(e);
    } finally {
      setIsUnlinking(false);
    }
  };

  // Return nothing if session doesn't exist or provider isn't linked
  if (!session || !session.user[provider]) return null;

  const { name, image } = session.user[provider];

  return (
    <Popover className="relative">
      <Popover.Button className="btn">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-6 h-6 rounded-full"
            width={24}
            height={24}
          />
        ) : (
          <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full">
            {name.charAt(0)}
          </span>
        )}
        <span className="ml-2">{name}</span>
      </Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute left-0 mt-2 w-36 rounded-md bg-white shadow-md">
          <div className="p-2 text-sm">
            <button
              onClick={handleUnlink}
              disabled={isUnlinking}
              className="w-full text-red-600 hover:bg-red-100 rounded-md p-2"
            >
              {isUnlinking ? "Unlinking..." : "Unlink Account"}
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProviderButton;
