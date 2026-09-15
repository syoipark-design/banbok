import { useState } from 'react';

export default function RecentTransferItem({ transfer }) {
  const [starred, setStarred] = useState(transfer.starred);

  return (
    <div className="flex items-center gap-[14px] px-[20px] py-[10px]">
      <div className="relative w-[39px] h-[39px] shrink-0">
        <img src={transfer.avatar} alt="" className="w-full h-full" />
        {transfer.avatarInner && (
          <img
            src={transfer.avatarInner}
            alt=""
            className="absolute inset-0 w-[16px] h-[17px] m-auto object-contain"
          />
        )}
      </div>
      <div className="flex flex-col gap-[2px] flex-1">
        <span className="text-[15px] font-normal text-[#222] leading-[1.3]">
          {transfer.name}
        </span>
        <span className="text-[11px] text-[#9a9a9a] leading-[1.3]">
          {transfer.bank} {transfer.accountNumber}
        </span>
      </div>
      <button onClick={() => setStarred(!starred)} className="shrink-0 p-[4px]">
        <img
          src={starred ? '/assets/icon-star-yellow.svg' : '/assets/icon-star.svg'}
          alt="즐겨찾기"
          className="w-[16px] h-[16px]"
        />
      </button>
    </div>
  );
}
