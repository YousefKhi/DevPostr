import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export default async function LayoutPrivate({ children }) {
  const session = await getServerSession(authOptions);
  await connectMongo();

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  const { id } = session.user;

  const user = await User.findById(id);
  if (user?.hasAccess !== true) {
    redirect("/#pricing");
  }
  
  

  return <>{children}</>;
}