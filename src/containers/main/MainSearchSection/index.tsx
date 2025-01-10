import useSearch from "@/hooks/useSearch";
import { useState } from "react";

function MainSearchSection() {
  const { handleOnChange, handleOnSubmit, username, usernameWithRiotId } =
    useSearch();

  const [isTooltipOn, setIsTooltipOn] = useState(false);

  return (
    <div className="mt-xxxl flex w-[800px] pr-xl h-[60px] bg-white rounded-[30px] shadow-md justify-between items-center mx-auto ">
      <div className="basis-1/5 h-full pl-[16px] flex flex-col justify-center">
        <label className="text-xs font-bold">Region</label>
        <span className="text-opgg-gray-text text-sm ">Korea</span>
      </div>
      <div className="border-r h-[40%] mr-[32px]" />
      <div className="flex flex-1 flex-col h-full justify-center">
        <label className="text-xs font-bold">Search</label>
        <div className="relative">
          <form
            id="search-input"
            className="flex pr-xl items-center"
            onSubmit={handleOnSubmit}
          >
            <input
              onFocus={() => setIsTooltipOn(true)}
              onBlur={() => setIsTooltipOn(false)}
              className="w-full text-sm"
              onChange={handleOnChange}
              value={username}
              placeholder="유저명#태그"
            />
          </form>
          {/* 검색창 툴팁 영역 */}
          {isTooltipOn && (
            <div className="absolute top-full w-full bg-white border shadow-md z-[100] mt-md p-md">
              <p className="text-sm text-opgg-gray-text font-bold">
                현재 대소문자를 정확히 구분하여 입력해야만 정상적인 검색이
                가능합니다.
              </p>
              <span className="text-sm bg-[text-opgg-gray-text p-xxs rounded-md font-semibold">
                {usernameWithRiotId}
              </span>
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        form="search-input"
        className="font-bold text-opgg-blue text-xl"
      >
        .GG
      </button>
    </div>
  );
}

export default MainSearchSection;
