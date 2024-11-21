
import React from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import MenuIcons from "@/components/MenuIcons";
import Form from '@/components/Form';

export const dynamic = "force-dynamic";

export default async function SignIn() {
return (
    <main>
        <div className="min-h-screen pl-0 pb-24 flex items-center justify-center">
            <Form/>
        </div>
    </main>
);
}
