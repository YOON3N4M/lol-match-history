import type { Metadata } from "next";
import type { ReactNode } from "react";

import Layout from "@/components/layout/Layout";

import "../styles/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "LOL Match History",
  description: "League of Legends match history search",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
