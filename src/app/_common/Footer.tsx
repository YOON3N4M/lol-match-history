"use client";

import { cn } from "@/utils";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const isMain = pathname === "/";
  return (
    <footer className={cn("pt-8", isMain && "bg-main-500")}>
      <div className="bg-white">
        <div className="content-layout flex flex-col py-8">
          <h2 className="text-2xl font-extrabold text-gray-600">33.GG</h2>
          <span className="mt-10 text-xs text-gray-600">
            GITHUB :{" "}
            <a
              href=" https://github.com/YOON3N4M/lol-match-history"
              target="_blank"
              rel="noopener"
            >
              https://github.com/YOON3N4M/lol-match-history
            </a>{" "}
          </span>
        </div>
      </div>
    </footer>
  );
}
