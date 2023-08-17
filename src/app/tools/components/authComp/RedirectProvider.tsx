"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
const RedirectProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin?callbackUrl=/signin");
    },
  });
  return <>{session ? <> {children}</> : ""}</>;
};

export default RedirectProvider;
