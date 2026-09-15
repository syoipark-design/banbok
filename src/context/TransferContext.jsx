import { createContext, useContext, useState } from 'react';

const TransferContext = createContext();

// 표시 순서: 울딸 용돈 / 고교동창회 / 네일샵 / 순대트럭 (왼→오)
// 저장은 역순, 렌더 시 .reverse()로 복원
const DEFAULT_TRANSFERS = [
  {
    name: '순대트럭', avatar: '/assets/freq-avatar-truck.png',
    recipient: { name: '이순대', account: '토스뱅크 1231-2345-6789', logo: '/assets/logo-toss-circle.svg' },
    category: '기타', amount: 15000, amountLabel: '15,000원',
    scheduleType: 'onDemand', day: 25, weekdays: [], dateLabel: '필요할 때',
  },
  {
    name: '네일샵', avatar: '/assets/freq-avatar-nail.png',
    recipient: { name: '이진솔', account: '하나 789-111222-33304', logo: '/assets/logo-hana-save.svg' },
    category: '기타', amount: 70000, amountLabel: '70,000원',
    scheduleType: 'onDemand', day: 25, weekdays: [], dateLabel: '필요할 때',
  },
  {
    name: '고교동창회', avatar: '/assets/freq-avatar-school.png',
    recipient: { name: '김국민', account: '기업 000-1234-56789', logo: '/assets/ibk-logo.png' },
    category: '회비', amount: 30000, amountLabel: '30,000원',
    scheduleType: 'monthly', day: 15, weekdays: [], dateLabel: '매월 15일',
  },
  {
    name: '울딸 용돈', avatar: '/assets/freq-avatar-uldal.png',
    recipient: { name: '이유진', account: '신한 110123456789', logo: '/assets/logo-shinhan-save.svg' },
    category: '용돈', amount: 500000, amountLabel: '500,000원',
    scheduleType: 'monthly', day: 25, weekdays: [], dateLabel: '매월 25일',
  },
];

const EMPTY_DRAFT = {
  recipient: null,
  category: '',
  name: '',
  amount: 0,
  scheduleType: 'monthly',
  day: 25,
  weekdays: [],
};

export function TransferProvider({ children }) {
  const [savedTransfers, setSavedTransfers] = useState(DEFAULT_TRANSFERS);
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  const updateDraft = (patch) => setDraft(prev => ({ ...prev, ...patch }));
  const resetDraft = () => setDraft(EMPTY_DRAFT);

  const commitDraft = () => {
    const amountLabel = draft.amount > 0
      ? `${draft.amount.toLocaleString('ko-KR')}원` : '0원';
    const dateLabel =
      draft.scheduleType === 'onDemand' ? '필요할 때' :
      draft.scheduleType === 'weekly'
        ? (draft.weekdays.length > 0 ? '매주 ' + draft.weekdays.join('·') : '매주')
        : `매월 ${draft.day}일`;
    const transfer = {
      ...draft,
      name: draft.name.trim() || draft.category || '이체',
      amountLabel,
      dateLabel,
    };
    setSavedTransfers(prev => [transfer, ...prev]);
    setDraft(EMPTY_DRAFT);
  };

  return (
    <TransferContext.Provider value={{ savedTransfers, draft, updateDraft, resetDraft, commitDraft }}>
      {children}
    </TransferContext.Provider>
  );
}

export const useTransfers = () => useContext(TransferContext);
