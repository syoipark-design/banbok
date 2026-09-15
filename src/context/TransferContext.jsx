import { createContext, useContext, useState } from 'react';

const TransferContext = createContext();

// 피그마 45:1947 기본 4개 — 역순 저장(렌더 시 .reverse()로 원래 순서 복원)
// avatar: 스크롤 원형 이미지 / recipient.logo: 모달 pill 은행 아이콘
const DEFAULT_TRANSFERS = [
  {
    name: '순대트럭', avatar: '/assets/freq-avatar-truck.png',
    recipient: { name: '박진순', account: '카카오뱅크 3333-02-3456789', logo: '/assets/logo-kakaobank-save.svg' },
    category: '기타', amount: 25000, amountLabel: '25,000원',
    scheduleType: 'monthly', day: 10, weekdays: [], dateLabel: '매월 10일',
  },
  {
    name: '네일샵', avatar: '/assets/freq-avatar-nail.png',
    recipient: { name: '뷰티네일', account: '신한 110234567890', logo: '/assets/logo-shinhan-save.svg' },
    category: '기타', amount: 80000, amountLabel: '80,000원',
    scheduleType: 'onDemand', day: 25, weekdays: [], dateLabel: '필요할 때',
  },
  {
    name: '고교동창회', avatar: '/assets/freq-avatar-school.png',
    recipient: { name: '김상준', account: '카카오뱅크 3333-01-2345678', logo: '/assets/logo-kakaobank-save.svg' },
    category: '회비', amount: 50000, amountLabel: '50,000원',
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
  recipient: null,       // { name, account, logo } — FrequentSave에서 선택
  category: '',          // TransferPurpose에서 선택
  name: '',              // TransferAmount에서 입력
  amount: 0,
  scheduleType: 'monthly', // 'monthly' | 'weekly' | 'onDemand'
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
      ? `${draft.amount.toLocaleString('ko-KR')}원`
      : '0원';
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
