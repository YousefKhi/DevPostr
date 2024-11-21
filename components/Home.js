import React from "react";
import { useSession } from "next-auth/react";

export function Home() {
    const { data: session } = useSession();
    const name =  session?.user?.name;


    return (
        <div>
            <h1>Hi,{name} welcome to DevPostr!!</h1>
        </div>
    );
}

export default Home;