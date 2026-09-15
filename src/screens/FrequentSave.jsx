// 피그마 node 8:291 기준 — 좌표/스타일/에셋 원본 그대로
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';

const A = (n) => `/assets/${n}`;

// ── 카드 데이터 (Figma 8:291/8:490/8:491/8:492 기준) ──────────────────────────
const CARDS = [
  {
    id: 'yujin',
    logo: A('fs-logo-shinhan.svg'),
    name: '이유진',
    account: '신한 110123456789',
    // collapsed: node 8:332 h=164 / blue h=63
    // expanded:  node 8:492 h=254 / blue h=151
    collapsedH: 164, expandedH: 254,
    blueCollapsedH: 63, blueExpandedH: 151,
    chevronSvg: A('fs-chevron-1.svg'),
    // blue-box-relative 좌표
    summaryLeft: 22, summaryTop: 14,
    chevronBlueTop: 30,
    dividerTop: 61,
    txTops: [74, 97, 120],
    transactions: [
      { date: '08.25', amount: '500,000원' },
      { date: '07.25', amount: '500,000원' },
      { date: '06.25', amount: '500,000원' },
    ],
    // node 8:343: whitespace-nowrap + leading-0 outer, 두 개 <p>로 명시적 줄바꿈
    summary: (
      <div style={{ lineHeight: 0, whiteSpace: 'nowrap' }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, lineHeight: 1.4, letterSpacing: -0.0924 }}>
          <span style={{ fontWeight: 400 }}>최근 3개월간 매월</span>{' '}
          <span style={{ fontWeight: 700, color: '#005a96' }}>25일</span>
          <span style={{ fontWeight: 400 }}>마다</span>{' '}
          <span style={{ fontWeight: 700, color: '#005a96' }}>50만원</span>
          <span style={{ fontWeight: 400 }}>씩</span>
        </p>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 400, lineHeight: 1.4, letterSpacing: -0.0924 }}>보냈어요.</p>
      </div>
    ),
  },
  {
    id: 'minkaeun',
    logo: A('fs-logo-minkaeun.svg'),
    name: '민가은',
    account: '국민 12345601123456',
    // collapsed: node 8:307 h=147 / blue h=46
    // expanded:  node 8:491 h=258 / blue h=158
    collapsedH: 147, expandedH: 258,
    blueCollapsedH: 46, blueExpandedH: 158,
    chevronSvg: A('fs-chevron-2.svg'),
    summaryLeft: 22, summaryTop: 14,
    chevronBlueTop: 21,
    dividerTop: 45,
    txTops: [58, 81, 104, 127],
    transactions: [
      { date: '09.07', amount: '12,000원' },
      { date: '08.31', amount: '26,800원' },
      { date: '08.26', amount: '17,500원' },
      { date: '08.22', amount: '33,000원' },
    ],
    summary: (
      <p style={{ margin: 0, fontSize: 13, fontWeight: 400, letterSpacing: -0.0924, lineHeight: 1.4, whiteSpace: 'nowrap' }}>
        최근 한 달간{' '}
        <span style={{ fontWeight: 700, color: '#005a96' }}>4번</span>
        {' '}보냈어요
      </p>
    ),
  },
  {
    id: 'joyunseo',
    logo: A('fs-logo-kakaobank.svg'),
    name: '조윤서',
    account: '카카오뱅크 3333-12-3456789',
    // collapsed: node 8:318 h=147 / blue h=46
    // expanded:  node 8:490 h=236 / blue h=135
    collapsedH: 147, expandedH: 236,
    blueCollapsedH: 46, blueExpandedH: 135,
    chevronSvg: A('fs-chevron-2.svg'),
    summaryLeft: 22, summaryTop: 14,
    chevronBlueTop: 21,
    dividerTop: 45,
    txTops: [58, 81, 104],
    transactions: [
      { date: '08.25', amount: '500,000원' },
      { date: '07.23', amount: '600,000원' },
      { date: '06.27', amount: '500,000원' },
    ],
    summary: (
      <p style={{ margin: 0, fontSize: 13, fontWeight: 400, letterSpacing: -0.0924, lineHeight: 1.4, whiteSpace: 'nowrap' }}>
        최근 3개월간 매월{' '}
        <span style={{ fontWeight: 700, color: '#005a96' }}>25일 전후</span>에 보냈어요
      </p>
    ),
  },
];

// ── 카드 컴포넌트 ─────────────────────────────────────────────────────────────
function FreqCard({ card, isOpen, isSelected, onToggle, onSelect, animDelay }) {
  const cardH = isOpen ? card.expandedH : card.collapsedH;
  const blueH = isOpen ? card.blueExpandedH : card.blueCollapsedH;

  return (
    <div
      className="fs-card-animate"
      onClick={() => onSelect(card.id)}
      style={{
        position: 'relative',
        width: 341,
        height: cardH,
        overflow: 'hidden',
        borderRadius: 19,
        // 8:350 selected: 1.91px #ffe200, no shadow
        border: isSelected ? '1.91px solid #ffe200' : '1.2px solid #f2f2f5',
        boxShadow: isSelected ? 'none' : '0px 0px 7.62px -0.023px rgba(197,197,197,0.25)',
        background: '#fff',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'height 0.25s ease',
        animationDelay: `${animDelay}s`,
      }}
    >
      {/* 로고 — card-rel left:22 top:22 (frame: logo at 39, card at 17 → 22) */}
      <img
        src={card.logo}
        alt={card.name}
        style={{ position: 'absolute', left: 22, top: 22, width: 34.51, height: 34.51, display: 'block' }}
      />

      {/* 이름 — card-rel left:66.77 top:23 */}
      <p style={{
        position: 'absolute', left: 66.77, top: 23, margin: 0,
        fontSize: 13.99, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap',
      }}>{card.name}</p>

      {/* 계좌 — card-rel left:66.77 top:42.59 */}
      <p style={{
        position: 'absolute', left: 66.77, top: 42.59, margin: 0,
        fontSize: 10.359, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap',
      }}>{card.account}</p>

      {/* 파란 요약 박스 — card-rel left:22 top:78 w:297 */}
      <div
        onClick={(e) => { e.stopPropagation(); onToggle(card.id); }}
        style={{
          position: 'absolute', left: 22, top: 78, width: 297,
          height: blueH,
          overflow: 'hidden',
          background: '#edf2fb',
          borderRadius: 6,
          cursor: 'pointer',
          transition: 'height 0.25s ease',
        }}
      >
        {/* 요약 텍스트 */}
        <div style={{ position: 'absolute', left: card.summaryLeft, top: card.summaryTop }}>
          {card.summary}
        </div>

        {/* 쉐브론 (피그마 원본: 8×4 flex 컨테이너 + -rotate-90 inner) */}
        {/* blue-rel: left:273 top:chevronBlueTop / inner: rotate(-90deg) = ⌄, rotate(90deg) = ⌃ */}
        <div style={{
          position: 'absolute', left: 273, top: card.chevronBlueTop,
          width: 8, height: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(-90deg)', flexShrink: 0, transition: 'transform 0.25s ease' }}>
            <div style={{ position: 'relative', width: 4, height: 8 }}>
              <div style={{ position: 'absolute', top: '-5%', bottom: '-5%', left: '-10%', right: '-10%' }}>
                <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={card.chevronSvg} />
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 (펼칠 때만) */}
        <div style={{
          position: 'absolute', left: 20, top: card.dividerTop, width: 258, height: 1,
          background: '#d5d5d5',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }} />

        {/* 거래 내역 행 */}
        {card.transactions.map((tx, i) => (
          <div key={i} style={{ opacity: isOpen ? 1 : 0, transition: `opacity 0.15s ease ${i * 0.03}s` }}>
            <p style={{ position: 'absolute', left: 23, top: card.txTops[i], margin: 0, fontSize: 13, fontWeight: 400, color: '#737373', letterSpacing: -0.0924, lineHeight: 1, whiteSpace: 'nowrap' }}>{tx.date}</p>
            <p style={{ position: 'absolute', right: 22, top: card.txTops[i], margin: 0, fontSize: 13, fontWeight: 400, color: '#737373', letterSpacing: -0.0924, lineHeight: 1, whiteSpace: 'nowrap' }}>{tx.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 화면 ──────────────────────────────────────────────────────────────────────
export default function FrequentSave() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const hasSelected = selectedId !== null;
  // 독립 토글: 각 카드가 별도 열림 상태 유지 (동시에 여러 개 펼칠 수 있음)
  const toggleOpen = (id) => setOpenId(prev => ({ ...prev, [id]: !prev[id] }));
  const handleSelect = (id) => setSelectedId(id);

  return (
    <div style={{ position: 'relative', width: 375, height: 812, background: '#fff', overflow: 'hidden' }}>
      <style>{`
        .fs-scroll::-webkit-scrollbar{display:none}
        @keyframes ai-grad-sweep {
          from { background-position: 100% 100%; }
          to   { background-position: 0% 0%; }
        }
        .ai-title-line {
          background: linear-gradient(135deg, #222222 0%, #222222 40%, #01CCFF 55%, #01CCFF 100%);
          background-size: 250% 250%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: ai-grad-sweep 1.8s ease-in-out forwards;
        }
        @keyframes fs-card-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fs-card-animate {
          animation: fs-card-in 0.45s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-title-line {
            background: none;
            -webkit-background-clip: unset;
            background-clip: unset;
            color: #222;
            -webkit-text-fill-color: #222;
            animation: none;
          }
          .fs-card-animate {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ── 고정 헤더: 상태바 + 네비 행 (top:0 ~ top:104) ───────────────── */}
      {/* 스크롤해도 이 영역은 항상 프레임 상단에 고정 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 375, height: 104,
        background: '#fff', zIndex: 10,
      }}>
        {/* 상태바 (공용 StatusBar — Figma 8:291 기준) */}
        <StatusBar />

        {/* 뒤로가기 < — node 8:304: left:35 top:70 w:9 h:18 */}
        <button
          onClick={() => navigate('/home')}
          style={{
            position: 'absolute', left: 35, top: 70, width: 9, height: 18,
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          }}
          aria-label="뒤로"
        >
          <div style={{ position: 'absolute', top: '-5%', bottom: '-5%', left: '-10%', right: '-10%' }}>
            <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('fs-back-arrow.svg')} />
          </div>
        </button>

        {/* 타이틀 — node 8:303: -translate-x-1/2 left:calc(50%-0.5px) top:66 */}
        <p style={{
          position: 'absolute', left: 'calc(50% - 0.5px)', top: 66, margin: 0,
          transform: 'translateX(-50%)',
          fontSize: 16, fontWeight: 600, color: '#000',
          letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap',
        }}>자주 하는 이체 저장</p>
      </div>

      {/* ── 스크롤 영역 (고정헤더 104px 아래, 다음바 113.55px 위) ────────── */}
      <div className="fs-scroll" style={{
        position: 'absolute', top: 104, left: 0, right: 0, bottom: 113.55,
        overflowY: 'auto', scrollbarWidth: 'none',
      }}>
        {/* 안내 문구 영역 (Figma 기준 top:104~248 → scroll-relative top:0~144) */}
        {/* AI 스파클: frame top:131 → scroll top: 131-104=27 */}
        {/* 부제목:    frame top:168 → scroll top: 168-104=64 */}
        <div style={{ position: 'relative', height: 144, flexShrink: 0 }}>
          {/* AI 스파클 — node 8:306: size:26 */}
          <div style={{ position: 'absolute', left: 26, top: 27, width: 26, height: 26 }}>
            <img alt="" style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', width: '100%', height: '100%', pointerEvents: 'none' }} src={A('fs-ai-sparkle.png')} />
          </div>

          {/* 부제목 — node 8:305: left:26 / AI 그라디언트 애니메이션 (1회) */}
          <div style={{ position: 'absolute', left: 26, top: 64 }}>
            <p className="ai-title-line" style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: -0.1333, lineHeight: 1.4, whiteSpace: 'nowrap' }}>최근 자주 했던 이체를</p>
            <p className="ai-title-line" style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: -0.1333, lineHeight: 1.4, whiteSpace: 'nowrap' }}>모아봤어요.</p>
          </div>
        </div>

        {/* ── 카드 목록 (flex column — 펼칠 때 아래 카드 자동으로 밀림) ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 17, paddingRight: 17 }}>
          {CARDS.map((card, i) => (
            <FreqCard
              key={card.id}
              card={card}
              isOpen={!!openId[card.id]}
              isSelected={selectedId === card.id}
              onToggle={toggleOpen}
              onSelect={handleSelect}
              animDelay={i * 0.12}
            />
          ))}
        </div>

        {/* ── 이체 내역에서 찾기 — node 8:329 ── */}
        <div style={{ padding: '12px 17px 24px' }}>
          <div style={{
            position: 'relative', width: 341, height: 55.34,
            border: '1.2px solid #f2f2f5', borderRadius: 13.36,
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <p style={{ margin: 0, fontSize: 16.221, fontWeight: 600, color: '#000', letterSpacing: -0.4771, lineHeight: 1, whiteSpace: 'nowrap' }}>이체 내역에서 찾기</p>
          </div>
        </div>
      </div>

      {/* ── 다음 바 — node 8:345: bottom-fixed, h:113.55 ─────────────────── */}
      {/* 피그마 button: left:16.22 top(bar-rel):20.99 w:342.557 h:55.344 r:13.359 */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 375, height: 113.55, background: '#fff' }}>
        <div
          onClick={() => {
            if (!hasSelected) return;
            const card = CARDS.find(c => c.id === selectedId);
            navigate('/transfer/purpose', {
              state: { recipient: { name: card.name, account: card.account, logo: card.logo } },
            });
          }}
          style={{
            position: 'absolute',
            left: (375 - 342.557) / 2,   // = 16.22
            top: 20.99,
            width: 342.557, height: 55.344,
            borderRadius: 13.359,
            background: hasSelected ? '#ffe200' : '#e6e6e6',
            cursor: hasSelected ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s ease',
          }}
        >
          <p style={{
            margin: 0, fontSize: 16.221, fontWeight: 600,
            color: hasSelected ? '#222' : '#999',
            letterSpacing: -0.4771, lineHeight: 1, whiteSpace: 'nowrap',
            transition: 'color 0.2s ease',
          }}>다음</p>
        </div>
      </div>
    </div>
  );
}
