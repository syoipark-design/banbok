// node 47:2232 (이체 확인 시트) + 49:3377 (완료 풀스크린) + 52:3452 (완료+변경확인 풀스크린)
import { useState } from 'react';
import { getBankLogo } from '../lib/bankLogos';
import { useTransfers } from '../context/TransferContext';
import StatusBar from './StatusBar';

const A = (n) => `/assets/${n}`;

const toKorean = (num) => {
  if (!num) return '0원';
  const man = Math.floor(num / 10000);
  const rest = num % 10000;
  if (man > 0 && rest === 0) return `${man}만원`;
  if (man > 0) return `${man}만 ${rest.toLocaleString('ko-KR')}원`;
  return `${num.toLocaleString('ko-KR')}원`;
};

const particle = (name) => {
  const last = name?.[name.length - 1];
  if (!last) return '을';
  const code = last.charCodeAt(0);
  if (code >= 0xAC00 && code <= 0xD7A3) return (code - 0xAC00) % 28 !== 0 ? '을' : '를';
  return '을';
};

const css = `
  @keyframes sheet-slide-up {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }
  @keyframes sheet-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes transfer-spin { to { transform: rotate(360deg); } }
  .sheet-slide { animation: sheet-slide-up 0.25s ease-out forwards; }
  .sheet-fade  { animation: sheet-fade-in  0.2s  ease-out forwards; }
  .transfer-spinner {
    animation: transfer-spin 0.8s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .transfer-spinner { animation-duration: 2s; }
  }
  .amount-input {
    background: transparent; border: none; outline: none; padding: 0; margin: 0;
    width: 240px; text-align: center;
    font-family: Pretendard, sans-serif;
    font-size: 28px; font-weight: 600; color: #000;
    letter-spacing: -0.1158px; line-height: 28.703px;
    caret-color: #005a96;
  }
`;

/* ── 공통 텍스트 스타일 ── */
const pre = { margin: 0, fontFamily: 'Pretendard, sans-serif', whiteSpace: 'nowrap' };

export default function TransferBottomSheet({ item, onClose }) {
  const { updateTransfer } = useTransfers();
  const [editedAmount, setEditedAmount] = useState(item.amount);
  const [inputFocused, setInputFocused] = useState(false);
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);
  const [showChangedCompleteScreen, setShowChangedCompleteScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = (callback) => {
    setIsLoading(true);
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => { setIsLoading(false); callback(); }, reduced ? 400 : 1300);
  };

  const avatarIsObj = item.avatar && typeof item.avatar === 'object';
  const avatarSrc = avatarIsObj ? null : (item.avatar || item.recipient?.logo || '');
  const { name: recipientName = '', account = '' } = item.recipient ?? {};
  const bankLogo = getBankLogo(account) || item.recipient?.logo || '';
  const koreanStr = toKorean(editedAmount);
  const diff = Math.abs(editedAmount - item.amount);
  const moreOrLess = editedAmount > item.amount ? '더' : '덜';

  const inputDisplayValue = inputFocused
    ? (editedAmount > 0 ? String(editedAmount) : '')
    : (editedAmount > 0 ? editedAmount.toLocaleString('ko-KR') + '원' : '0원');

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setEditedAmount(raw ? parseInt(raw, 10) : 0);
  };

  const handleTransfer = () => {
    if (isLoading) return;
    if (editedAmount === item.amount) {
      triggerLoading(() => setShowCompleteScreen(true));
    } else {
      triggerLoading(() => setShowChangedCompleteScreen(true));
    }
  };

  const handleSaveChange = () => {
    const newAmountLabel = `${editedAmount.toLocaleString('ko-KR')}원`;
    updateTransfer(item, { amount: editedAmount, amountLabel: newAmountLabel });
    onClose();
  };

  const isComplete = showCompleteScreen || showChangedCompleteScreen;

  return (
    <>
      <style>{css}</style>

      {/* ── 딤 오버레이 (완료 화면이 뜨면 가림) ── */}
      {!isComplete && (
        <div
          className="sheet-fade"
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200 }}
        />
      )}

      {/* ══════════════════════════════════════════
          이체 확인 시트  (node 47:2232)  top:299
      ══════════════════════════════════════════ */}
      {!isComplete && (
        <div
          className="sheet-slide"
          style={{
            position: 'absolute', left: 0, top: 299,
            width: 375, height: 561,
            background: '#fff', borderRadius: '28.626px 28.626px 0 0',
            zIndex: 201,
          }}
        >
          {/* 핸들 */}
          <div style={{ position: 'absolute', left: 170.8, top: 13, width: 34.351, height: 4.771, background: '#d9d9d9', borderRadius: 95.42 }} />

          {/* 아바타 73×73 (sheet-rel 61) */}
          <div style={{ position: 'absolute', left: (375 - 73) / 2, top: 61, width: 73, height: 73, borderRadius: '50%', overflow: 'hidden', background: avatarIsObj ? item.avatar.color : '#eef4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {avatarIsObj
              ? <img src={item.avatar.emojiSrc} alt="" style={{ width: '65%', height: '65%', objectFit: 'contain', display: 'block' }} />
              : avatarSrc && <img src={avatarSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            }
          </div>

          {/* 제목 (sheet-rel 154) */}
          <p style={{ ...pre, position: 'absolute', left: '50%', top: 154, transform: 'translateX(-50%)', fontSize: 21, lineHeight: 0, letterSpacing: -0.1333, textAlign: 'center' }}>
            <span style={{ fontWeight: 700, color: '#005a96', lineHeight: 1.4 }}>{item.name}{' '}</span>
            <span style={{ fontWeight: 400, color: '#000', lineHeight: 1.4 }}>이체하시겠습니까?</span>
          </p>

          {/* 금액 — 인라인 수정 (sheet-rel 226) */}
          <div style={{ position: 'absolute', left: 0, top: 226, width: 375, display: 'flex', justifyContent: 'center' }}>
            <input
              className="amount-input"
              inputMode="numeric"
              value={inputDisplayValue}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChange={handleAmountChange}
            />
          </div>

          {/* 한글 금액 (sheet-rel 261.37) */}
          <p style={{ ...pre, position: 'absolute', left: '50%', top: 261.37, transform: 'translateX(-50%)', fontSize: 16, fontWeight: 500, color: '#8c8c8c', letterSpacing: -0.1158, lineHeight: '28.703px', textAlign: 'center' }}>{koreanStr}</p>

          {/* 받는계좌 pill (sheet-rel 339) */}
          <div style={{ position: 'absolute', left: 16, top: 339, width: 344, height: 42, border: '1px solid #c8c8c8', borderRadius: 100 }}>
            <p style={{ ...pre, position: 'absolute', left: 25, top: 14, fontSize: 15, fontWeight: 400, color: '#666', letterSpacing: -0.1158, lineHeight: 1 }}>받는계좌</p>
            {account && bankLogo && (
              <div style={{ position: 'absolute', left: 87, top: 9.44, width: 24, height: 24, flexShrink: 0 }}>
                <img src={bankLogo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
            )}
            <p style={{ ...pre, position: 'absolute', left: 140.5, top: 14, transform: 'translateX(-50%)', fontSize: 15, fontWeight: 500, color: '#000', letterSpacing: -0.1158, lineHeight: 1, textAlign: 'center' }}>{recipientName}</p>
            <p style={{ ...pre, position: 'absolute', left: 169, top: 14, fontSize: 15, fontWeight: 400, color: '#666', letterSpacing: -0.1158, lineHeight: 1, maxWidth: 128, overflow: 'hidden', textOverflow: 'ellipsis' }}>{account || '—'}</p>
            <div style={{ position: 'absolute', left: 309, top: 18, width: 10, height: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transform: 'rotate(180deg)' }}>
                <img src={A('purpose-chevron.svg')} alt="" style={{ width: 10, height: 7, display: 'block' }} />
              </div>
            </div>
          </div>

          {/* 취소 (sheet-rel 420) */}
          <div onClick={onClose} style={{ position: 'absolute', left: 16, top: 420, width: 135, height: 55, background: '#ececec', borderRadius: 13.359, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <p style={{ ...pre, fontSize: 16.221, fontWeight: 600, color: '#222', letterSpacing: -0.4771, lineHeight: 1 }}>취소</p>
          </div>

          {/* 이체하기 (sheet-rel 420) */}
          <div onClick={handleTransfer} style={{ position: 'absolute', left: 159, top: 420, width: 199.779, height: 55.344, background: '#ffe200', borderRadius: 13.359, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <p style={{ ...pre, fontSize: 16.221, fontWeight: 600, color: '#222', letterSpacing: -0.4771, lineHeight: 1 }}>이체하기</p>
          </div>
        </div>
      )}

      {/* ── 로딩 오버레이 — 풀스크린 딤 + 흰 스피너 ── */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          left: 0, top: 0, width: 375, height: 812,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 250,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'all',
        }}>
          <div
            className="transfer-spinner"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '4px solid rgba(255,255,255,0.25)',
              borderTopColor: '#fff',
            }}
          />
        </div>
      )}

      {/* ══════════════════════════════════════════
          이체 완료 풀스크린  (node 49:3377)
          동일금액 이체 시 로딩 후 화면 전환
      ══════════════════════════════════════════ */}
      {showCompleteScreen && (
        <div
          className="sheet-fade"
          style={{
            position: 'absolute', left: 0, top: 0,
            width: 375, height: 812,
            background: '#fff',
            zIndex: 260,
          }}
        >
          <StatusBar />

          {/* 체크+이름+계좌+메모 그룹 — 상태바~버튼 사이 세로 중앙 */}
          <div style={{
            position: 'absolute', left: 0, top: 44, width: 375, height: 654,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 57, height: 57, flexShrink: 0 }}>
              <img src={A('cs-check-icon.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
            </div>
            <div style={{ marginTop: 33, textAlign: 'center', fontFamily: 'Pretendard, sans-serif', fontWeight: 700, fontSize: 21, lineHeight: 1.4, letterSpacing: -0.1333 }}>
              <p style={{ margin: 0, color: '#005a96' }}>{item.name}</p>
              <p style={{ margin: 0, color: '#000' }}>이체 완료</p>
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
              <p style={{ ...pre, margin: 0, fontSize: 15, fontWeight: 400, color: '#666', letterSpacing: -0.1158, lineHeight: 1, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {account || recipientName}
              </p>
              <div style={{ width: 4, height: 8, flexShrink: 0, transform: 'rotate(180deg)' }}>
                <img src={A('cs-arrow.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
            </div>
            <div style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', paddingLeft: 18, paddingRight: 18, height: 30, background: '#f7f7f7', borderRadius: 29 }}>
              <p style={{ ...pre, margin: 0, fontSize: 15, fontWeight: 400, color: '#888', letterSpacing: -0.1158, lineHeight: 1 }}>💬 메모입력..</p>
            </div>
          </div>

          {/* 버튼 바 배경 — 하단 고정 */}
          <div style={{ position: 'absolute', left: 0, top: 698, width: 375, height: 114, background: '#fff' }} />

          {/* 공유 버튼 */}
          <div style={{ position: 'absolute', left: 16, top: 719, width: 74, height: 57, background: '#333b58', borderRadius: 13.36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={A('cs-share-icon.svg')} alt="" style={{ width: 22, height: 22, objectFit: 'contain', display: 'block' }} />
          </div>

          {/* 확인 버튼 */}
          <div onClick={onClose} style={{ position: 'absolute', left: 98, top: 719, width: 260.779, height: 55.344, background: '#ffe200', borderRadius: 13.359, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <p style={{ ...pre, margin: 0, fontSize: 16.221, fontWeight: 600, color: '#222', letterSpacing: -0.4771, lineHeight: 1 }}>확인</p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          이체 완료 + 저장금액 변경 확인 풀스크린  (node 52:3452)
          다른금액 이체 시 로딩 후 화면 전환
      ══════════════════════════════════════════ */}
      {showChangedCompleteScreen && (
        <div
          className="sheet-fade"
          style={{
            position: 'absolute', left: 0, top: 0,
            width: 375, height: 812,
            background: '#fff',
            zIndex: 260,
          }}
        >
          <StatusBar />

          {/* 체크+이름+계좌+노란박스 그룹 — 상태바~버튼 사이 세로 중앙 (위쪽 여백 균형) */}
          <div style={{
            position: 'absolute', left: 0, top: 44, width: 375, height: 654,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 57, height: 57, flexShrink: 0 }}>
              <img src={A('cs-check-icon.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
            </div>
            <div style={{ marginTop: 19, textAlign: 'center', fontFamily: 'Pretendard, sans-serif', fontWeight: 700, fontSize: 21, lineHeight: 1.4, letterSpacing: -0.1333 }}>
              <p style={{ margin: 0, color: '#005a96' }}>{item.name}</p>
              <p style={{ margin: 0, color: '#000' }}>이체 완료</p>
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
              <p style={{ ...pre, margin: 0, fontSize: 15, fontWeight: 400, color: '#666', letterSpacing: -0.1158, lineHeight: 1, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {account || recipientName}
              </p>
              <div style={{ width: 4, height: 8, flexShrink: 0, transform: 'rotate(180deg)' }}>
                <img src={A('cs-arrow.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
            </div>
            {/* 노란 정보 박스 */}
            <div style={{ marginTop: 32, position: 'relative', width: 343, height: 120, background: 'rgba(255,226,0,0.14)', borderRadius: 11, flexShrink: 0 }}>
              <p style={{ ...pre, position: 'absolute', left: 24, top: 27, fontSize: 18, fontWeight: 600, color: '#000', letterSpacing: -0.072, lineHeight: 1 }}>
                평소보다 {diff.toLocaleString('ko-KR')}원 {moreOrLess} 보냈어요
              </p>
              <p style={{ ...pre, position: 'absolute', left: 24, top: 56, fontSize: 15, fontWeight: 400, color: '#222', letterSpacing: -0.3599, lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
                <span style={{ fontWeight: 600, color: '#005a96' }}>{item.name}</span>
                <span>{particle(item.name)} </span>
                <span>{item.amount.toLocaleString('ko-KR')}원 → </span>
                <span style={{ fontWeight: 600, color: '#222' }}>{editedAmount.toLocaleString('ko-KR')}원</span>
                <span>으로{'\n'}변경할까요?</span>
              </p>
            </div>
          </div>

          {/* 버튼 바 배경 — 하단 고정 */}
          <div style={{ position: 'absolute', left: 0, top: 698, width: 375, height: 114, background: '#fff' }} />

          {/* 아니요 */}
          <div onClick={onClose} style={{ position: 'absolute', left: 16, top: 719, width: 135, height: 55, background: '#ececec', borderRadius: 13.359, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <p style={{ ...pre, fontSize: 16.221, fontWeight: 600, color: '#222', letterSpacing: -0.4771, lineHeight: 1 }}>아니요</p>
          </div>

          {/* 네, 변경할게요 */}
          <div onClick={handleSaveChange} style={{ position: 'absolute', left: 159, top: 719, width: 199.779, height: 55.344, background: '#ffe200', borderRadius: 13.359, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <p style={{ ...pre, fontSize: 16.221, fontWeight: 600, color: '#222', letterSpacing: -0.4771, lineHeight: 1 }}>네, 변경할게요</p>
          </div>
        </div>
      )}
    </>
  );
}
