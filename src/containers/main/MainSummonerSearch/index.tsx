"use client";

import { handleRiotId } from "@/utils/riot";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useState } from "react";

export default function MainSummonerSearch() {
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  function handleChange(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setKeyword(event.target.value);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const riotId = handleRiotId(keyword, "#");
    const { name, tag } = riotId;
    router.push(`/summoners/kr/${name}-${tag}`);
  }

  return (
    <div className="mx-auto mt-24 h-[60px] w-full max-w-[800px] rounded-[30px] bg-white px-4 py-2">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex max-w-[234px] flex-1 flex-col gap-1 pl-4">
          <span className="text-xs font-bold">Region</span>
          <span className="text-sm text-gray-400">Korea</span>
        </div>
        <div className="flex-1">
          <input
            className="size-full text-sm outline-none"
            onChange={handleChange}
            value={keyword}
            placeholder="플레이어 이름 + #KR1"
          />
        </div>
        <button className="text-2xl font-extrabold text-main-500" type="submit">
          .GG
        </button>
      </form>
    </div>
  );
}
