import { createContext, useContext, useState } from 'react';
import { getBankLogo } from '../lib/bankLogos';

const TransferContext = createContext();

// 표시 순서: 울딸 용돈 / 고교동창회 / 네일샵 / 순대트럭 (왼→오)
// 저장은 역순, 렌더 시 .reverse()로 복원
const mk = (name, avatar, recipientName, account, category, amount, scheduleType, day, dateLabel) => ({
  name, avatar,
  recipient: { name: recipientName, account, logo: getBankLogo(account) },
  category, amount, amountLabel: `${amount.toLocaleString('ko-KR')}원`,
  scheduleType, day, weekdays: [], dateLabel,
});

const DEFAULT_TRANSFERS = [
  mk('순대트럭',   '/assets/freq-avatar-truck.png',  '이순대', '토스뱅크 1231-2345-6789', '기타', 15000,  'onDemand', 25, '필요할 때'),
  mk('네일샵',    '/assets/freq-avatar-nail.png',   '이진솔', '하나 789-111222-33304',    '기타', 70000,  'onDemand', 25, '필요할 때'),
  mk('고교동창회', '/assets/freq-avatar-school.png', '김국민', '기업 000-1234-56789',      '회비', 30000,  'monthly',  15, '매월 15일'),
  mk('울딸 용돈',  '/assets/freq-avatar-uldal.png',  '이유진', '신한 110123456789',        '용돈', 500000, 'monthly',  25, '매월 25일'),
];

const EMPTY_DRAFT = {
  recipient: null,
  category: '',
  name: '',
  amount: 0,
  scheduleType: 'monthly',
  day: 25,
  weekdays: [],
  avatar: { color: '#e0e0e0', emojiSrc: '/assets/ac-emoji-girl.svg' },
};

export function TransferProvider({ children }) {
  const [savedTransfers, setSavedTransfers] = useState(DEFAULT_TRANSFERS);
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  const updateDraft = (patch) => setDraft(prev => ({ ...prev, ...patch }));
  const resetDraft = () => setDraft(EMPTY_DRAFT);

  const updateTransfer = (targetItem, patch) => {
    setSavedTransfers(prev => prev.map(t => t === targetItem ? { ...t, ...patch } : t));
  };

  const commitDraft = () => {
    const amountLabel = draft.amount > 0
      ? `${draft.amount.toLocaleString('ko-KR')}원` : '0원';
    const dateLabel =
      draft.scheduleType === 'onDemand' ? '필요할 때' :
      draft.scheduleType === 'weekly'
        ? (draft.weekdays.length > 0 ? '매주 ' + draft.weekdays.join('·') : '매주')
        : `매월 ${draft.day}일`;
    const recipient = draft.recipient
      ? { ...draft.recipient, logo: getBankLogo(draft.recipient.account) || draft.recipient.logo || '' }
      : null;
    const transfer = {
      ...draft,
      recipient,
      name: draft.name.trim() || draft.category || '이체',
      amountLabel,
      dateLabel,
    };
    setSavedTransfers(prev => [transfer, ...prev]);
    setDraft(EMPTY_DRAFT);
  };

  return (
    <TransferContext.Provider value={{ savedTransfers, draft, updateDraft, resetDraft, commitDraft, updateTransfer }}>
      {children}
    </TransferContext.Provider>
  );
}

export const useTransfers = () => useContext(TransferContext);
