"use client";

import { ReactNode } from "react";
import AppContextProvider from "./AppContext";

export const AppProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};
