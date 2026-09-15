import { useState } from 'react';

const TABS = ['계좌번호', '카카오톡 친구'];

export default function TabBar() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex items-center mx-[16px] mt-[10px] gap-[4px]">
      {TABS.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`px-[16px] py-[5px] rounded-[100px] text-[14px] font-semibold transition-colors ${
            active === i
              ? 'bg-[#f4f4f4] text-black'
              : 'text-[#999] bg-transparent'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
