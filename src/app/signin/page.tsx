"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserButton from "../tools/components/authComp/UserButton";
const Signin = () => {
  const { data: session } = useSession();
  if (session) redirect("/dashboard");
  return (
    <div className="">
      <span>Clique para login</span>
      <UserButton />
    </div>
  );
};

export default Signin;
