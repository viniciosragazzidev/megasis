"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/app/tools/components/ui/button";
const UserButton = () => {
  const { data: session } = useSession();

  return (
    <>
      <div>
        {session ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Login</Button>
        )}
      </div>
    </>
  );
};
export default UserButton;
