import { createContext, useContext, useState } from 'react';

const TransferContext = createContext();

// 피그마 45:1947 기본 4개 — 역순 저장(렌더 시 .reverse()로 원래 순서 복원)
const makeDefault = (name, logo) => ({
  recipient: { name, account: '', logo },
  name,
  category: '',
  amount: 0,
  scheduleType: 'monthly',
  day: 25,
  weekdays: [],
  amountLabel: '0원',
  dateLabel: '매월 25일',
});

const DEFAULT_TRANSFERS = [
  makeDefault('순대트럭', '/assets/freq-avatar-truck.png'),
  makeDefault('네일샵',   '/assets/freq-avatar-nail.png'),
  makeDefault('고교동창회', '/assets/freq-avatar-school.png'),
  makeDefault('울딸 용돈', '/assets/freq-avatar-uldal.png'),
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
