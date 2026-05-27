"use client";

import { usePathname } from "next/navigation";
import { handleRiotId } from "@/utils/riot";
import Link from "next/link";

export default function SummonerNotFound() {
  const pathname = usePathname();

  const username = decodeURIComponent(pathname.split("/").at(-1) ?? "");
  const { name, tag } = handleRiotId(username, "-");

  return (
    <div>
      <div className="content-layout flex flex-col items-center gap-10 pt-10">
        <h2 className="text-2xl font-bold">
          Korea 지역 내 &quot;
          <span className="text-main-500">
            {name}#{tag}{" "}
          </span>{" "}
          &quot; 플레이어를 찾을 수 없습니다.
        </h2>
        <p className="text-center text-gray-600">
          라이엇 ID 시스템 변경으로 인해 검색이 되지 않을 수도 있습니다. <br />
          게임 이름과 태그를 다시 한번 확인하시고 재시도 해주세요.
        </p>
        <Link
          className="rounded bg-main-500 px-4 py-2 font-medium text-white hover:bg-main-600"
          href="/"
        >
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
