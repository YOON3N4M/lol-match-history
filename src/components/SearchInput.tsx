import { handleRiotId } from "@/utils/riot";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [isToolTip, setIsToolTip] = useState(false);
  const translatedName = getTranslatedName(username);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = handleRiotId(username, "#");

    if (inputValue.tag === undefined) {
      if (inputValue.name.length === 2) {
        const handleBlank = `${inputValue.name[0]} ${inputValue.name[1]}`;
        router.push(`/summoners/kr/${handleBlank}-KR1`);
      } else {
        router.push(`/summoners/kr/${inputValue.name}-KR1`);
      }
    } else {
      router.push(`/summoners/kr/${inputValue.name}-${inputValue.tag}`);
    }
  }

  function getTranslatedName(name: string) {
    const tag = name.split("#")[1];
    if (!tag) {
      return "";
    } else if (tag === "KR1") {
      return "";
    } else {
      return name;
    }
  }
  return (
    <div className="relative w-full">
      <form onSubmit={onSubmit}>
        <input
          className="w-[90%] border-0 text-sm outline-none"
          onChange={onChange}
          placeholder="플레이어 이름 + 태그"
          value={username}
          onFocus={() => {
            setIsToolTip(true);
          }}
          onBlur={() => setIsToolTip(false)}
        />
      </form>
      {isToolTip && (
        <div className="absolute z-[3000] mt-2.5 w-full translate-y-0.5 overflow-hidden border border-[#ebeef1] bg-white px-2.5 py-2.5 shadow-[0_2px_2px_0_rgb(0_0_0_/_19%)]">
          <p className="text-xs font-bold text-[#9AA4AF]">현재 대소문자를 정확히 입력해야만 정상적인 검색이 가능 합니다.</p>
          {translatedName === "" ? (
            <div>
              <div>
                <span className="rounded bg-[#f7f7f9] px-0.5 py-px text-xs text-[#9AA4AF]">기존 닉네임 검색 ( 이름#KR1 )</span>
              </div>
              <div>{username !== "" && <span className="cursor-pointer text-[13px] font-bold text-gray-500">{username.split("#")[0]}#KR1</span>}</div>
            </div>
          ) : (
            <div>
              <div>
                <span className="rounded bg-[#f7f7f9] px-0.5 py-px text-xs text-[#9AA4AF]">Riot ID 검색 ( 이름#태그 )</span>
              </div>
              <div>
                <span className="cursor-pointer text-[13px] font-bold text-gray-500">{translatedName}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
