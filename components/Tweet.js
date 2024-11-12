"use client";

import Input from "./Input";
import GitHubData from "./GitHubData";
import Modal from "./Modal";
import { useState } from "react";

export default function Tweet() {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div>
            <div>
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>Fetch commits</button>
            </div>
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Input/>
            
        
        </div>
    );
}
