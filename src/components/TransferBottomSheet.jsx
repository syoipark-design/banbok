// node 47:2232 (이체 확인) + 49:3348 (금액변경) + 49:3377 (완료)
import { useState } from 'react';

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
  .sheet-slide { animation: sheet-slide-up 0.25s ease-out forwards; }
  .sheet-fade  { animation: sheet-fade-in  0.2s  ease-out forwards; }
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
  const [editedAmount, setEditedAmount] = useState(item.amount);
  const [inputFocused, setInputFocused] = useState(false);
  const [showChangeSheet, setShowChangeSheet] = useState(false);
  const [showCompleteSheet, setShowCompleteSheet] = useState(false);

  const avatarSrc = item.avatar || item.recipient?.logo || '';
  const { name: recipientName = '', account = '', logo: bankLogo = '' } = item.recipient ?? {};
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
    if (editedAmount === item.amount) {
      setShowCompleteSheet(true);
    } else {
      setShowChangeSheet(true);
    }
  };

  return (
    <>
      <style>{css}</style>

      {/* ── 딤 오버레이 ── */}
      <div
        className="sheet-fade"
        onClick={showCompleteSheet ? undefined : onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200 }}
      />

      {/* ══════════════════════════════════════════
          이체 확인 시트  (node 47:2232)  top:299
      ══════════════════════════════════════════ */}
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
        <div style={{ position: 'absolute', left: (375 - 73) / 2, top: 61, width: 73, height: 73, borderRadius: '50%', overflow: 'hidden', background: '#eef4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {avatarSrc && <img src={avatarSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />}
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

        {/* ── 하단: 일반 / 금액변경 확인 ── */}
        {!showChangeSheet ? (
          <>
            {/* 받는계좌 pill (sheet-rel 339) */}
            <div style={{ position: 'absolute', left: 16, top: 339, width: 344, height: 42, border: '1px solid #c8c8c8', borderRadius: 100 }}>
              <p style={{ ...pre, position: 'absolute', left: 25, top: 14, fontSize: 15, fontWeight: 400, color: '#666', letterSpacing: -0.1158, lineHeight: 1 }}>받는계좌</p>
              {account && bankLogo && (
                <div style={{ position: 'absolute', left: 87, top: 9.44, width: 24, height: 24, flexShrink: 0 }}>
                  <img src={bankLogo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                </div>
              )}
              <p style={{ ...pre, position: 'absolute', left: 140.5, top: 14, transform: 'translateX(-50%)', fontSize: 15, fontWeight: 500, color: '#000', letterSpacing: -0.1158, lineHeight: 1, textAlign: 'center' }}>{recipientName}</p>
              {/* 계좌번호 — 넘치면 ellipsis */}
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
          </>
        ) : (
          <>
            {/* 흰 배경 — pill·버튼 덮기 */}
            <div style={{ position: 'absolute', left: 0, top: 270, width: 375, height: 291, background: '#fff' }} />

            {/* 노란 정보 박스 (frame 580 → sheet-rel 281) */}
            <div style={{ position: 'absolute', left: 16, top: 281, width: 343, height: 120, background: 'rgba(255,226,0,0.14)', borderRadius: 11 }}>
              {/* 제목 (box-rel 26) */}
              <p style={{ ...pre, position: 'absolute', left: 24, top: 26, fontSize: 18, fontWeight: 600, color: '#000', letterSpacing: -0.072, lineHeight: 1 }}>
                평소보다 {diff.toLocaleString('ko-KR')}원 {moreOrLess} 보냈어요
              </p>
              {/* 본문 (box-rel 56) */}
              <p style={{ ...pre, position: 'absolute', left: 24, top: 56, fontSize: 15, fontWeight: 400, color: '#222', letterSpacing: -0.3599, lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
                <span style={{ fontWeight: 600, color: '#005a96' }}>{item.name}</span>
                <span>{particle(item.name)} </span>
                <span>{item.amount.toLocaleString('ko-KR')}원 → </span>
                <span style={{ fontWeight: 600, color: '#222' }}>{editedAmount.toLocaleString('ko-KR')}원</span>
                <span>으로{'\n'}변경할까요?</span>
              </p>
            </div>

            {/* 버튼 바 배경 */}
            <div style={{ position: 'absolute', left: 0, top: 399, width: 375, height: 162, background: '#fff' }} />

            {/* 아니요 (sheet-rel 420) */}
            <div onClick={() => setShowChangeSheet(false)} style={{ position: 'absolute', left: 16, top: 420, width: 135, height: 55, background: '#ececec', borderRadius: 13.359, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 1 }}>
              <p style={{ ...pre, fontSize: 16.221, fontWeight: 600, color: '#222', letterSpacing: -0.4771, lineHeight: 1 }}>아니요</p>
            </div>

            {/* 네, 변경할게요 (sheet-rel 420) */}
            <div onClick={() => { setShowChangeSheet(false); setShowCompleteSheet(true); }} style={{ position: 'absolute', left: 159, top: 420, width: 199.779, height: 55.344, background: '#ffe200', borderRadius: 13.359, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 1 }}>
              <p style={{ ...pre, fontSize: 16.221, fontWeight: 600, color: '#222', letterSpacing: -0.4771, lineHeight: 1 }}>네, 변경할게요</p>
            </div>
          </>
        )}
      </div>

      {/* ══════════════════════════════════════════
          이체 완료 시트  (node 49:3377)  top:299
          zIndex:203 — 이체 확인 시트 위에 슬라이드인
      ══════════════════════════════════════════ */}
      {showCompleteSheet && (
        <div
          className="sheet-slide"
          style={{
            position: 'absolute', left: 0, top: 299,
            width: 375, height: 561,
            background: '#fff', borderRadius: '28.626px 28.626px 0 0',
            zIndex: 203,
          }}
        >
          {/* 핸들 */}
          <div style={{ position: 'absolute', left: 170.8, top: 13, width: 34.351, height: 4.771, background: '#d9d9d9', borderRadius: 95.42 }} />

          {/* 그린 체크 아이콘 (frame 408 → sheet-rel 109, 57×57) */}
          <div style={{ position: 'absolute', left: 159, top: 109, width: 57, height: 57 }}>
            <img src={A('cs-check-icon.png')} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
          </div>

          {/* "[이름]\n이체 완료" (frame 498 → sheet-rel 199) */}
          <div style={{ position: 'absolute', left: '50%', top: 199, transform: 'translateX(-50%)', textAlign: 'center', fontFamily: 'Pretendard, sans-serif', fontWeight: 700, fontSize: 21, lineHeight: 1.4, letterSpacing: -0.1333, whiteSpace: 'nowrap' }}>
            <p style={{ margin: 0, color: '#005a96' }}>{item.name}</p>
            <p style={{ margin: 0, color: '#000' }}>이체 완료</p>
          </div>

          {/* 받는계좌 + 화살표 (frame 567 → sheet-rel 268) — ellipsis 적용 */}
          <div style={{ position: 'absolute', left: '50%', top: 268, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <p style={{ ...pre, margin: 0, fontSize: 15, fontWeight: 400, color: '#666', letterSpacing: -0.1158, lineHeight: 1, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {account || recipientName}
            </p>
            {/* 우향 화살표: purpose-chevron(하향) rotate(-90deg) → 우향 */}
            <div style={{ width: 4, height: 8, flexShrink: 0, transform: 'rotate(-90deg)' }}>
              <img src={A('purpose-chevron.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>

          {/* 메모 pill (frame 615 → sheet-rel 316) */}
          <div style={{ position: 'absolute', left: '50%', top: 316, transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', paddingLeft: 18, paddingRight: 18, height: 30, background: '#f7f7f7', borderRadius: 29, whiteSpace: 'nowrap' }}>
            <p style={{ ...pre, margin: 0, fontSize: 15, fontWeight: 400, color: '#888', letterSpacing: -0.1158, lineHeight: 1 }}>💬 메모입력..</p>
          </div>

          {/* 버튼 바 배경 (frame 698 → sheet-rel 399) */}
          <div style={{ position: 'absolute', left: 0, top: 399, width: 375, height: 162, background: '#fff' }} />

          {/* 공유 버튼 (frame 719 → sheet-rel 420) */}
          <div style={{ position: 'absolute', left: 16, top: 420, width: 74, height: 57, background: '#333b58', borderRadius: 13.36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={A('cs-share-icon.png')} alt="" style={{ width: 22, height: 22, objectFit: 'contain', display: 'block' }} />
          </div>

          {/* 확인 버튼 (frame 719 → sheet-rel 420) */}
          <div onClick={onClose} style={{ position: 'absolute', left: 98, top: 420, width: 260.779, height: 55.344, background: '#ffe200', borderRadius: 13.359, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <p style={{ ...pre, margin: 0, fontSize: 16.221, fontWeight: 600, color: '#222', letterSpacing: -0.4771, lineHeight: 1 }}>확인</p>
          </div>
        </div>
      )}
    </>
  );
}
