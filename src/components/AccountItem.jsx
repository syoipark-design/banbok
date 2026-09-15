export default function AccountItem({ account }) {
  return (
    <div className="flex items-center gap-[14px] px-[20px] py-[10px]">
      <div className="relative w-[39px] h-[39px] shrink-0">
        <img src={account.logo} alt={account.bank} className="w-full h-full" />
        {account.hasBankInner && account.logoInner && (
          <img
            src={account.logoInner}
            alt=""
            className="absolute inset-0 w-[20px] h-[20px] m-auto object-contain"
          />
        )}
      </div>
      <div className="flex flex-col gap-[2px]">
        <span className="text-[15px] font-normal text-[#222] leading-[1.3]">
          {account.name}
        </span>
        <span className="text-[11px] text-[#9a9a9a] leading-[1.3]">
          {account.bank} {account.accountNumber}
        </span>
      </div>
    </div>
  );
}
