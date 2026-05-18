"use client";

import type { PropsWithChildren } from "react";

import GlobalStyles from "@/styles/Globalstyles";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalStyles />
      <Header />
      {children}
    </>
  );
}
