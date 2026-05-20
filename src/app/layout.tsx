import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../styles/globals.css";
import Header from "./_common/Header";

export const metadata: Metadata = {
  title: "33.GG",
  description: "리그오브레전드 게임전적 조회 서비스를 제공합니다.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
