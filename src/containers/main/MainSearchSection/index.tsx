import SearchInput from "@/components/SearchInput";

function MainSearchSection() {
  return (
    <div className="flex w-[800px] h-[60px] bg-white rounded-[30px] shadow-md justify-between items-center mx-auto ">
      <div className="basis-1/5 h-[40px] pl-[16px] flex flex-col">
        <label className="text-xs font-bold">Region</label>
        <span className="text-[#9AA4AF] text-sm flex-1">Korea</span>
      </div>
      {/* <Box w={{ pc: "234px", mo: "80px" }} h="40px" pl={{ pc: 4, mo: 2 }}
      </Box> */}
      <div className="border-r h-[40%] mr-[32px]" />
      <div className="flex flex-1 flex-col">
        <label className="text-xs font-bold">Search</label>
        <SearchInput />
      </div>
      {/* <Box position="relative" flex={1}>
      
      </Box> */}
      {/* <Box as="button" color={"keyColor.sky"} fontWeight={700} fontSize="2xl">
        .GG
      </Box> */}
    </div>
  );
}

export default MainSearchSection;
