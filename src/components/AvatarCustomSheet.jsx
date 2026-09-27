// 아바타 커스텀 시트 — 색상 탭 48:3257 / 이모지 탭 48:3006
// 시트 top:437, visible height:375 (812-437)
import { useState } from 'react';

const COLORS = [
  ['#CCEFFF', '#C0E1FE', '#FEEDA6', '#FEF8C0'],
  ['#FED3D4', '#F5BFC9', '#DED3FD', '#EDE0D0'],
  ['#FED5B8', '#C8F2D1', '#E3E6E9', '#FCE7E1'],
];

const EMOJIS = [
  [
    { src: '/assets/ac-emoji-cake.png',      scale: 1   },
    { src: '/assets/ac-emoji-girl.png',      scale: 1   },
    { src: '/assets/ac-emoji-house.png',     scale: 1   },
    { src: '/assets/ac-emoji-golf.png',      scale: 1   },
  ],
  [
    { src: '/assets/ac-emoji-nail.png',      scale: 1.2 },
    { src: '/assets/ac-emoji-airplane.png',  scale: 1.2 },
    { src: '/assets/ac-emoji-taekwondo.png', scale: 1   },
    { src: '/assets/ac-emoji-basketball.png', scale: 1  },
  ],
  [
    { src: '/assets/ac-emoji-ambulance.png', scale: 1   },
    { src: '/assets/ac-emoji-hospital.png',  scale: 1   },
    { src: '/assets/ac-emoji-hotpot.png',    scale: 1   },
    { src: '/assets/ac-emoji-dog.png',       scale: 1   },
  ],
];

const COLS      = [26, 117, 208, 299];
const COL_ROWS  = [107, 185, 263];
const EMO_COLS  = [17, 107, 197, 287];
const EMO_ROWS  = [101, 192, 283];

const css = `
  @keyframes ac-sheet-up   { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @keyframes ac-sheet-fade { from { opacity: 0; }                  to { opacity: 1; } }
  .ac-sheet-slide { animation: ac-sheet-up   0.25s ease-out forwards; }
  .ac-sheet-fade  { animation: ac-sheet-fade 0.2s  ease-out forwards; }
`;

const pre = { margin: 0, fontFamily: 'Pretendard, sans-serif', whiteSpace: 'nowrap' };

export default function AvatarCustomSheet({ initialColor, initialEmoji, onConfirm, onClose }) {
  const [tab,      setTab]      = useState('color');
  const [selColor, setSelColor] = useState(initialColor || '#CCEFFF');
  const [selEmoji, setSelEmoji] = useState(initialEmoji || '/assets/ac-emoji-girl.png');

  return (
    <>
      <style>{css}</style>

      {/* 딤 오버레이 */}
      <div
        className="ac-sheet-fade"
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 210 }}
      />

      {/* 시트 본체 — bottom:0, height:375 (frame 437→812) */}
      <div
        className="ac-sheet-slide"
        style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 375, height: 375,
          background: '#fff',
          borderRadius: '28.626px 28.626px 0 0',
          zIndex: 211,
        }}
      >
        {/* 핸들 */}
        <div style={{
          position: 'absolute', left: '50%', top: 13, transform: 'translateX(-50%)',
          width: 33.3, height: 4, borderRadius: 100, background: '#e0e0e0',
        }} />

        {/* ── 탭 행 ── */}
        {/* 색상 */}
        <p
          onClick={() => setTab('color')}
          style={{
            ...pre,
            position: 'absolute', left: 26, top: 49,
            fontSize: 19, fontWeight: tab === 'color' ? 700 : 600,
            color: tab === 'color' ? '#222' : '#b2b2b2',
            lineHeight: 1, cursor: 'pointer',
          }}
        >색상</p>

        {/* 이모지 */}
        <p
          onClick={() => setTab('emoji')}
          style={{
            ...pre,
            position: 'absolute', left: 78, top: 49,
            fontSize: 19, fontWeight: tab === 'emoji' ? 700 : 600,
            color: tab === 'emoji' ? '#222' : '#b2b2b2',
            lineHeight: 1, cursor: 'pointer',
          }}
        >이모지</p>

        {/* 확인 (우측) */}
        <p
          onClick={() => onConfirm(selColor, selEmoji)}
          style={{
            ...pre,
            position: 'absolute', left: 335, top: 49,
            fontSize: 19, fontWeight: 600, color: '#222',
            lineHeight: 1, cursor: 'pointer',
          }}
        >확인</p>

        {/* 구분선 */}
        <div style={{ position: 'absolute', left: 0, top: 82, width: 375, height: 1, background: '#f0f0f0' }} />

        {/* ── 색상 그리드 ── */}
        {tab === 'color' && COL_ROWS.map((rowTop, ri) =>
          COLS.map((colLeft, ci) => {
            const hex = COLORS[ri][ci];
            const sel = selColor === hex;
            return (
              <div
                key={`c${ri}${ci}`}
                onClick={() => setSelColor(hex)}
                style={{
                  position: 'absolute', left: colLeft, top: rowTop,
                  width: 50, height: 50, borderRadius: '50%',
                  background: hex,
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  boxShadow: sel ? '0 0 0 2.5px #fff, 0 0 0 4.5px #222' : 'none',
                  transition: 'box-shadow 0.12s ease',
                }}
              />
            );
          })
        )}

        {/* ── 이모지 그리드 ── */}
        {tab === 'emoji' && EMO_ROWS.map((rowTop, ri) =>
          EMO_COLS.map((colLeft, ci) => {
            const { src, scale } = EMOJIS[ri][ci];
            const sel = selEmoji === src;
            return (
              <div
                key={`e${ri}${ci}`}
                onClick={() => setSelEmoji(src)}
                style={{
                  position: 'absolute', left: colLeft, top: rowTop,
                  width: 72, height: 72, borderRadius: '50%',
                  background: sel ? '#f0f0f0' : 'transparent',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: sel ? '0 0 0 2.5px #fff, 0 0 0 4.5px #222' : 'none',
                  transition: 'box-shadow 0.12s ease, background 0.12s ease',
                }}
              >
                <img src={src} alt="" style={{ width: 48, height: 48, objectFit: 'contain', display: 'block', transform: `scale(${scale})` }} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
