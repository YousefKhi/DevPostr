// components/ButtonSignin.js
"use client";

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      router.push('/dashboard'); // Redirect to dashboard if session exists
    } else {
      router.push('/auth/signin'); // Redirect to sign-in if no session
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {session ? 'Go to Dashboard' : 'Login'}
    </button>
  );
};

export default SigninButton;
