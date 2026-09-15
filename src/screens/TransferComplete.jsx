// 피그마 node 10:1074 — 375×812 절대좌표, 원본 값 그대로
import { useLocation, useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import { useTransfers } from '../context/TransferContext';

const A = (n) => `/assets/${n}`;

// 한국어 조사: 마지막 글자에 받침 있으면 "을", 없으면 "를"
const particle = (name) => {
  const last = name?.[name.length - 1];
  if (!last) return '을';
  const code = last.charCodeAt(0);
  if (code >= 0xAC00 && code <= 0xD7A3) {
    return (code - 0xAC00) % 28 !== 0 ? '을' : '를';
  }
  return '을';
};

export default function TransferComplete() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addTransfer } = useTransfers();

  const draft = state?.transferDraft ?? {
    category: '용돈',
    recipient: { name: '이유진', account: '신한 110123456789', logo: A('fs-logo-shinhan.svg') },
    amountLabel: '500,000원',
    dateLabel: '매월 25일',
    name: '울딸 용돈',
  };

  const ptcl = particle(draft.name);

  // 확인: 1회만 저장 후 홈 이동 (useEffect 아닌 onClick)
  const handleConfirm = () => {
    addTransfer(draft);
    navigate('/home');
  };

  return (
    <div style={{ position: 'relative', width: 375, height: 812, background: '#fff', overflow: 'hidden' }}>

      {/* ── 상태바 ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 375, zIndex: 10 }}>
        <StatusBar />
      </div>

      {/* ── 체크 아이콘
           inset: top 21.92% = 178px, left 41.87% = 157px
           width = 375×(1−0.4187−0.4187) = 61px, height = 812×(1−0.2192−0.7057) = 61px ── */}
      <div style={{ position: 'absolute', left: 157, top: 178, width: 61, height: 61 }}>
        <img
          alt=""
          src={A('tc-check-icon.svg')}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>

      {/* ── 제목 — top:275, Bold 21px, line-height 1.4, letter-spacing −0.1333px
           1행: [이름](#005a96) + [조사](#000)   2행: 저정했어요(#000)  ── */}
      <div style={{
        position: 'absolute', left: '50%', top: 275,
        transform: 'translateX(-50%)',
        textAlign: 'center',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 21, fontWeight: 700,
        lineHeight: 1.4, letterSpacing: -0.1333,
        whiteSpace: 'nowrap',
      }}>
        <p style={{ margin: 0 }}>
          <span style={{ color: '#005a96' }}>{draft.name}</span>
          <span style={{ color: '#000' }}>{ptcl}</span>
        </p>
        <p style={{ margin: 0, color: '#000' }}>저정했어요</p>
      </div>

      {/* ── 안내 문구 — top:349, Regular 14px, #8c8c8c ── */}
      <div style={{
        position: 'absolute', left: '50%', top: 349,
        transform: 'translateX(-50%)',
        textAlign: 'center',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 14, fontWeight: 400,
        lineHeight: 'normal', color: '#8c8c8c',
        whiteSpace: 'nowrap',
      }}>
        <p style={{ margin: 0 }}>{`저장된 이체는 '전체 > 자주 하는 이체'에서`}</p>
        <p style={{ margin: 0 }}>언제든 수정할 수 있어요.</p>
      </div>

      {/* ── 요약 카드 — left:20, top:448, w:335, h:175, border:#d9d9d9, r:15 ── */}
      <div style={{
        position: 'absolute', left: 20, top: 448,
        width: 335, height: 175,
        border: '1px solid #d9d9d9', borderRadius: 15,
        background: '#fff',
      }}>

        {/* 아바타 — frame(48,475) → card-rel(28,27), size:37 */}
        <div style={{ position: 'absolute', left: 28, top: 27, width: 37, height: 37 }}>
          <img
            alt=""
            src={draft.recipient.logo}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* 수신자 이름 — frame(100,473) → card-rel(80,25) */}
        <p style={{
          position: 'absolute', left: 80, top: 25, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: '#222',
          lineHeight: 1.3, letterSpacing: -0.3256, whiteSpace: 'nowrap',
        }}>{draft.recipient.name}</p>

        {/* 계좌 — frame(100,495) → card-rel(80,47) */}
        <p style={{
          position: 'absolute', left: 80, top: 47, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: '#9a9a9a',
          lineHeight: 1.3, letterSpacing: -0.3256, whiteSpace: 'nowrap',
        }}>{draft.recipient.account}</p>


        {/* "금액" 라벨 — frame(50,536) → card-rel(30,88) */}
        <p style={{
          position: 'absolute', left: 30, top: 88, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: '#8d8d8d',
          lineHeight: 1, letterSpacing: -0.3256, whiteSpace: 'nowrap',
        }}>금액</p>

        {/* 금액 값 — 우측정렬, frame right:(355−325)=30 → card-rel right:30 */}
        <p style={{
          position: 'absolute', right: 30, top: 88, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: 'rgba(34,34,34,0.74)',
          lineHeight: 1, letterSpacing: -0.0924,
          textAlign: 'right', whiteSpace: 'nowrap',
        }}>{draft.amountLabel}</p>

        {/* "이체 일정" 라벨 — frame(50,574) → card-rel(30,126) */}
        <p style={{
          position: 'absolute', left: 30, top: 126, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: '#8d8d8d',
          lineHeight: 1, letterSpacing: -0.3256, whiteSpace: 'nowrap',
        }}>이체 일정</p>

        {/* 일정 값 — 우측정렬, frame right:30 → card-rel right:30 */}
        <p style={{
          position: 'absolute', right: 30, top: 126, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: 'rgba(34,34,34,0.74)',
          lineHeight: 1, letterSpacing: -0.0924,
          textAlign: 'right', whiteSpace: 'nowrap',
        }}>{draft.dateLabel}</p>
      </div>

      {/* ── 확인 버튼 바 — 하단 고정, 1개만 렌더 ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 375, height: 113.55,
        background: '#fff',
      }}>
        <div
          onClick={handleConfirm}
          style={{
            position: 'absolute',
            left: (375 - 342.557) / 2,  // = 16.22
            top: 20.99,
            width: 342.557, height: 55.344,
            borderRadius: 13.359,
            background: '#ffe200',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <p style={{
            margin: 0,
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 16.221, fontWeight: 600, color: '#222',
            letterSpacing: -0.4771, lineHeight: 1, whiteSpace: 'nowrap',
          }}>확인</p>
        </div>
      </div>
    </div>
  );
}
