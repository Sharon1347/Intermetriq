"use client";

import { signOut } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");  // Redirect to sign-in after logout
  };

  return (
    <Button onClick={handleSignOut} className="btn-primary">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
