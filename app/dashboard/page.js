import ButtonAccount from "@/components/ButtonAccount";
import GitHubData from '@/components/GitHubData';
import React from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import MenuIcons from "@/components/MenuIcons";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-5xl mx-auto space-y-8">
        <DashboardHeader />
        <MenuIcons />
      
      </section>
    </main>
  );
}
