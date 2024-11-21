"use client";

import postTweet from "@/libs/postTweet";
import GitHubData from "./GitHubData";
import Modal from "./Modal";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Tweet() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tweet, setTweet] = useState("");
    const { data: session } = useSession();


    

    const handlePostTweet = () => {
        if (!tweet) {
            console.error("Tweet content is empty. Please generate or write a tweet.");
            return;
        }

       console.log("Posting tweet:", tweet);
       console.log("User ID:", session.user.id);
        postTweet(tweet)
            .then(() => {
                console.log("Tweet posted successfully.");
            })
            .catch((error) => {
                console.error("Error posting tweet:", error);
            });
    };

    return (
        <div>
            <div>
                <button
                    className="btn btn-secondary text-white mb-4"
                    onClick={() => setIsModalOpen(true)}
                >
                    Generate Tweet
                </button>
            </div>

            {/* Modal for GitHub Data and generating tweet */}
            <Modal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                customPrompt={<GitHubData setTweet={setTweet} />}
            />

            {/* Textarea for tweet content */}
            <textarea
                className="textarea textarea-primary"
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                placeholder="Generate a tweet to edit."
                style={{
                    width: "100%",          
                    minHeight: "300px",     
                    height: "auto",         
                    resize: "vertical",     
                    padding: "1rem",        
                    fontSize: "1rem", 
                    borderColor: "#A594F9"      
                }}
            />

            {/* Button to post the tweet */}
            <div className="flex justify-end mt-4">
                <button className="btn bg-black text-white" onClick={handlePostTweet}>
                    Post Tweet
                </button>
            </div>
        </div>
    );
}
