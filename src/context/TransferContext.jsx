import { createContext, useContext, useState } from 'react';

const TransferContext = createContext();

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
  const [savedTransfers, setSavedTransfers] = useState([]);
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
