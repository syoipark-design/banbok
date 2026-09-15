// 피그마 node 8:493 — 375×812 절대좌표 재현
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBar from '../components/StatusBar';

const A = (n) => `/assets/${n}`;

// 카드 아이콘 — 피그마 좌표 기준, 카드 상대 픽셀
// 카드: left:21(frame), h:87 / 아이콘은 카드 내부 absolute
const CARDS = [
  {
    id: 'allowance',
    title: '용돈',
    titleCenterX: 104,
    subtitle: '부모님, 자녀 등 가족에게 보내는 돈',
    icon: (
      <>
        {/* 8:534 inset [31.65% 77.07% 66.01% 13.61%] → card-rel left:30 top:32 w:35 h:19 */}
        <div style={{ position: 'absolute', left: 30, top: 32, width: 35, height: 19 }}>
          <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-icon-money-1.svg')} />
        </div>
        {/* 8:540 inset [31.9% 77.87% 65.77% 12.8%] → card-rel left:27 top:34 w:35 h:19 */}
        <div style={{ position: 'absolute', left: 27, top: 34, width: 35, height: 19 }}>
          <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-icon-money-2.svg')} />
        </div>
        {/* 8:546 inset [32.15% 78.67% 65.52% 12%] → card-rel left:24 top:36 w:35 h:19 */}
        <div style={{ position: 'absolute', left: 24, top: 36, width: 35, height: 19 }}>
          <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-icon-money-3.svg')} />
        </div>
      </>
    ),
  },
  {
    id: 'housing',
    title: '주거비',
    titleCenterX: 111.5,
    subtitle: '월세, 관리비 등 매달 정기적으로 내는 돈',
    icon: (
      // 8:557 inset [42.98% 78.4% 52.87% 12.8%] → card-rel left:27 top:24 w:33 h:34
      <div style={{ position: 'absolute', left: 27, top: 24, width: 33, height: 34 }}>
        <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-icon-house.svg')} />
      </div>
    ),
  },
  {
    id: 'club',
    title: '회비',
    titleCenterX: 104,
    subtitle: '모임에 정기적으로 내는 돈',
    icon: (
      // 8:574 inset [55.17% 77.42% 39.85% 12.27%] → card-rel left:25 top:23 w:39 h:40
      <div style={{ position: 'absolute', left: 25, top: 23, width: 39, height: 40 }}>
        <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-icon-golf.svg')} />
      </div>
    ),
  },
  {
    id: 'education',
    title: '교육비',
    titleCenterX: 111.5,
    subtitle: '학원비, 과외비 등 교육을 위해 보내는 돈',
    icon: (
      <>
        {/* 8:599 inset [68.1% 78.66% 30.61% 12.9%] → card-rel left:27 top:28 w:32 h:10 */}
        <div style={{ position: 'absolute', left: 27, top: 28, width: 32, height: 10 }}>
          <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-icon-books-2.svg')} />
        </div>
        {/* 8:603 inset [69.37% 78.19% 29.5% 12.75%] → card-rel left:27 top:38 w:34 h:9 */}
        <div style={{ position: 'absolute', left: 27, top: 38, width: 34, height: 9 }}>
          <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-icon-books-3.svg')} />
        </div>
        {/* 8:594 inset [70.47% 78.38% 28.02% 12.59%] → card-rel left:26 top:47 w:34 h:12 */}
        <div style={{ position: 'absolute', left: 26, top: 47, width: 34, height: 12 }}>
          <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-icon-books-1.svg')} />
        </div>
      </>
    ),
  },
  {
    id: 'custom',
    title: '직접 입력',
    titleCenterX: 121.5,
    subtitle: '원하는 이름으로 직접 정하기',
    icon: (
      // 8:519 inset [80.42% 78.6% 15.85% 13.33%] → card-rel left:29 top:28 w:30 h:30
      <div style={{ position: 'absolute', left: 29, top: 28, width: 30, height: 30 }}>
        <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-icon-pencil.svg')} />
      </div>
    ),
  },
];

export default function TransferPurpose() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const recipient = state?.recipient ?? { name: '이유진', account: '신한 110123456789', logo: A('fs-logo-shinhan.svg') };

  const [selectedId, setSelectedId] = useState(null);
  const hasSelected = selectedId !== null;

  const handleNext = () => {
    if (!hasSelected) return;
    const card = CARDS.find(c => c.id === selectedId);
    navigate('/transfer/amount', { state: { category: card.title, recipient } });
  };

  return (
    <div style={{ position: 'relative', width: 375, height: 812, background: '#fff', overflow: 'hidden' }}>
      <style>{'.tp-scroll::-webkit-scrollbar{display:none}'}</style>

      {/* ── 고정 헤더 (StatusBar 44 + 네비 60 = 104) ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 375, height: 104, background: '#fff', zIndex: 10 }}>
        <StatusBar />

        {/* 뒤로가기 — frame left:35 top:70 w:9 h:18 */}
        <button
          onClick={() => navigate('/transfer/new')}
          style={{ position: 'absolute', left: 35, top: 70, width: 9, height: 18, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={A('fs-back-arrow.svg')} />
        </button>

        {/* 제목 — frame center top:66 */}
        <p style={{
          position: 'absolute', left: '50%', top: 66, margin: 0,
          transform: 'translateX(-50%)',
          fontSize: 16, fontWeight: 600, color: '#000',
          letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap',
        }}>자주 하는 이체 저장</p>
      </div>

      {/* ── 스크롤 영역 (top:104 ~ bottom:113.55) ── */}
      <div
        className="tp-scroll"
        style={{
          position: 'absolute', top: 104, left: 0, right: 0, bottom: 113.55,
          overflowY: 'auto', scrollbarWidth: 'none',
        }}
      >
        {/* 상단 섹션 — frame y:104~225 = scroll-rel h:121 */}
        <div style={{ position: 'relative', height: 121, flexShrink: 0 }}>

          {/* 수신자 로고 — node 8:509: frame left:26 top:126 w:30 h:31 → scroll-rel top:22 */}
          <div style={{ position: 'absolute', left: 26, top: 22, width: 30, height: 31 }}>
            <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={recipient.logo} />
          </div>

          {/* 수신자 이름 — node 8:506: frame left:68 top:129 → scroll-rel top:25 */}
          <p style={{
            position: 'absolute', left: 68, top: 25, margin: 0,
            fontSize: 18, fontWeight: 600, color: '#222',
            letterSpacing: -0.072, lineHeight: '24.4px', whiteSpace: 'nowrap',
          }}>{recipient.name}</p>

          {/* ▾ 드롭다운 — frame left:127 top:138 w:10 h:7 → scroll-rel top:34 */}
          {/* rotate(180deg)으로 ▲ → ▾ */}
          <div style={{
            position: 'absolute', left: 127, top: 34, width: 10, height: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ flexShrink: 0, transform: 'rotate(180deg)' }}>
              <div style={{ position: 'relative', width: 10, height: 7 }}>
                <div style={{ position: 'absolute', bottom: '25%', left: '12.29%', right: '12.29%', top: '4.08%' }}>
                  <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('purpose-chevron.svg')} />
                </div>
              </div>
            </div>
          </div>

          {/* "님에게" — frame left:149 top:129 → scroll-rel top:25 */}
          <p style={{
            position: 'absolute', left: 149, top: 25, margin: 0,
            fontSize: 18, fontWeight: 500, color: '#222',
            letterSpacing: -0.072, lineHeight: '24.4px', whiteSpace: 'nowrap',
          }}>님에게</p>

          {/* "어떤 돈을 보내나요?" — frame left:26 top:168 → scroll-rel top:64 */}
          <p style={{
            position: 'absolute', left: 26, top: 64, margin: 0,
            fontSize: 18, fontWeight: 500, color: '#222',
            letterSpacing: -0.072, lineHeight: '24.4px', whiteSpace: 'nowrap',
          }}>어떤 돈을 보내나요?</p>
        </div>

        {/* 카드 목록 — flex column gap:13 paddingLeft:21 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13, paddingLeft: 21 }}>
          {CARDS.map(card => (
            <div
              key={card.id}
              onClick={() => setSelectedId(card.id)}
              style={{
                position: 'relative', flexShrink: 0,
                width: 335, height: 87,
                border: selectedId === card.id ? '1.91px solid #ffe200' : '1.2px solid #d9d9d9',
                borderRadius: 16,
                background: '#fff',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border 0.15s ease',
              }}
            >
              {card.icon}

              {/* 제목 — 카드 상대 top:23, titleCenterX 기준 translateX(-50%) */}
              <p style={{
                position: 'absolute', left: card.titleCenterX, top: 23, margin: 0,
                transform: 'translateX(-50%)',
                fontSize: 18, fontWeight: 700, color: '#000',
                letterSpacing: -0.072, lineHeight: 1, whiteSpace: 'nowrap', textAlign: 'center',
              }}>{card.title}</p>

              {/* 설명 — 카드 상대 left:88 top:50 */}
              <p style={{
                position: 'absolute', left: 88, top: 50, margin: 0,
                fontSize: 13.99, fontWeight: 400, color: '#222',
                letterSpacing: -0.0924, lineHeight: 1, whiteSpace: 'nowrap',
              }}>{card.subtitle}</p>
            </div>
          ))}
        </div>

        <div style={{ height: 24 }} />
      </div>

      {/* ── 하단 다음 바 (frame top:698 h:113.55) ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 375, height: 113.55, background: '#fff' }}>
        <div
          onClick={handleNext}
          style={{
            position: 'absolute',
            left: (375 - 342.557) / 2,
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
