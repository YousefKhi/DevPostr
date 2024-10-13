"use client"

import { signIn } from "next-auth/react";
import config from "@/config";
                
const SigninButton = () => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => signIn(undefined, { callbackUrl: config.auth.callbackUrl })}
    >
      Login
    </button>
  );
};
                
export default SigninButton;