export default function SearchBar() {
  return (
    <div className="mx-[16px] mt-[12px] mb-[4px] flex items-center gap-[8px] bg-[#f5f5f5] rounded-[14px] px-[14px] py-[11px]">
      <img src="/assets/icon-search.svg" alt="" className="w-[16px] h-[16px] shrink-0" />
      <input
        type="text"
        placeholder="받는 사람 이름 또는 계좌번호"
        className="flex-1 bg-transparent text-[14px] text-[#b1b1b1] placeholder-[#b1b1b1] outline-none border-none"
        readOnly
      />
      <img src="/assets/icon-camera.svg" alt="카메라" className="w-[22px] h-[22px] shrink-0" />
    </div>
  );
}
