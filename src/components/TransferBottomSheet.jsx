// 피그마 node 47:2232 — 바텀시트 이체 확인
const A = (n) => `/assets/${n}`;

const toKorean = (num) => {
  if (!num) return '0원';
  const man = Math.floor(num / 10000);
  const rest = num % 10000;
  if (man > 0 && rest === 0) return `${man}만원`;
  if (man > 0) return `${man}만 ${rest.toLocaleString('ko-KR')}원`;
  return `${num.toLocaleString('ko-KR')}원`;
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
`;

export default function TransferBottomSheet({ item, onClose }) {
  const amountStr = item.amount > 0
    ? item.amount.toLocaleString('ko-KR') + '원'
    : '0원';
  const koreanStr = toKorean(item.amount);
  const { name: recipientName = '', account = '', logo = '' } = item.recipient ?? {};

  return (
    <>
      <style>{css}</style>

      {/* ── 오버레이 (클릭 시 닫힘) ── */}
      <div
        className="sheet-fade"
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 200,
        }}
      />

      {/* ── 시트 본체 — top:299, height:561 (frame-abs 기준) ── */}
      <div
        className="sheet-slide"
        style={{
          position: 'absolute', left: 0, top: 299,
          width: 375, height: 561,
          background: '#fff',
          borderRadius: '28.626px 28.626px 0 0',
          zIndex: 201,
        }}
      >
        {/* 핸들 바 (frame 312 → sheet-rel 13) */}
        <div style={{
          position: 'absolute', left: 170.8, top: 13,
          width: 34.351, height: 4.771,
          background: '#d9d9d9', borderRadius: 95.42,
        }} />

        {/* 아바타 73×73 중앙 (frame 360 → sheet-rel 61) */}
        <div style={{
          position: 'absolute',
          left: (375 - 73) / 2, top: 61,
          width: 73, height: 73,
          borderRadius: '50%', overflow: 'hidden',
          background: '#eef4ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {logo && (
            <img src={logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          )}
        </div>

        {/* 제목 (frame 453 → sheet-rel 154): 이름 #005a96 Bold + " 이체하시겠습니까?" black */}
        <p style={{
          position: 'absolute', left: '50%', top: 154,
          transform: 'translateX(-50%)',
          margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 21, lineHeight: 0,
          letterSpacing: -0.1333,
          whiteSpace: 'nowrap', textAlign: 'center',
        }}>
          <span style={{ fontWeight: 700, color: '#005a96', lineHeight: 1.4 }}>{item.name}{' '}</span>
          <span style={{ fontWeight: 400, color: '#000', lineHeight: 1.4 }}>이체하시겠습니까?</span>
        </p>

        {/* 금액 SemiBold 28px (frame 525 → sheet-rel 226) */}
        <p style={{
          position: 'absolute', left: '50%', top: 226,
          transform: 'translateX(-50%)',
          margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 28, fontWeight: 600, color: '#000',
          letterSpacing: -0.1158, lineHeight: '28.703px',
          whiteSpace: 'nowrap', textAlign: 'center',
        }}>{amountStr}</p>

        {/* 한글 금액 Medium 16px #8c8c8c (frame 560.37 → sheet-rel 261.37) */}
        <p style={{
          position: 'absolute', left: '50%', top: 261.37,
          transform: 'translateX(-50%)',
          margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 16, fontWeight: 500, color: '#8c8c8c',
          letterSpacing: -0.1158, lineHeight: '28.703px',
          whiteSpace: 'nowrap', textAlign: 'center',
        }}>{koreanStr}</p>

        {/* 받는계좌 pill (frame: left:16 top:638 w:344 h:42 → sheet-rel top:339)
            내부 좌표는 pill-relative (frame-abs - 16, frame-abs - 638) */}
        <div style={{
          position: 'absolute', left: 16, top: 339,
          width: 344, height: 42,
          border: '1px solid #c8c8c8', borderRadius: 100,
        }}>
          {/* "받는계좌" 라벨 (frame 41,652 → pill-rel 25,14) */}
          <p style={{
            position: 'absolute', left: 25, top: 14, margin: 0,
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 15, fontWeight: 400, color: '#666',
            letterSpacing: -0.1158, lineHeight: 1, whiteSpace: 'nowrap',
          }}>받는계좌</p>

          {/* 은행/아바타 아이콘 (frame 103,647.44 → pill-rel 87,9.44) — 계좌 있을 때만 */}
          {account && logo && (
            <div style={{ position: 'absolute', left: 87, top: 9.44, width: 24, height: 24 }}>
              <img src={logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          )}

          {/* 받는사람 이름 (frame center:156.5,652 → pill-rel center:140.5,14) */}
          <p style={{
            position: 'absolute', left: 140.5, top: 14,
            transform: 'translateX(-50%)',
            margin: 0,
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 15, fontWeight: 500, color: '#000',
            letterSpacing: -0.1158, lineHeight: 1, whiteSpace: 'nowrap', textAlign: 'center',
          }}>{recipientName}</p>

          {/* 계좌번호 (frame 185,652 → pill-rel 169,14) */}
          <p style={{
            position: 'absolute', left: 169, top: 14, margin: 0,
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 15, fontWeight: 400, color: '#666',
            letterSpacing: -0.1158, lineHeight: 1, whiteSpace: 'nowrap',
          }}>{account || '—'}</p>

          {/* ▾ chevron (frame 325,656 → pill-rel 309,18) */}
          <div style={{
            position: 'absolute', left: 309, top: 18,
            width: 10, height: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ transform: 'rotate(180deg)' }}>
              <img src={A('purpose-chevron.svg')} alt="" style={{ width: 10, height: 7, display: 'block' }} />
            </div>
          </div>
        </div>

        {/* 취소 버튼 (frame: left:16 top:719 w:135 h:55 → sheet-rel top:420) */}
        <div
          onClick={onClose}
          style={{
            position: 'absolute', left: 16, top: 420,
            width: 135, height: 55,
            background: '#ececec', borderRadius: 13.359,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <p style={{
            margin: 0,
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 16.221, fontWeight: 600, color: '#222',
            letterSpacing: -0.4771, lineHeight: 1, whiteSpace: 'nowrap',
          }}>취소</p>
        </div>

        {/* 이체하기 버튼 (frame: left:159 top:719 w:199.779 h:55.344 → sheet-rel top:420) */}
        <div
          onClick={onClose}
          style={{
            position: 'absolute', left: 159, top: 420,
            width: 199.779, height: 55.344,
            background: '#ffe200', borderRadius: 13.359,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <p style={{
            margin: 0,
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 16.221, fontWeight: 600, color: '#222',
            letterSpacing: -0.4771, lineHeight: 1, whiteSpace: 'nowrap',
          }}>이체하기</p>
        </div>
      </div>
    </>
  );
}
