// 피그마 node 45:1947 — 375×812 절대좌표, 원본 값 그대로
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import { useTransfers } from '../context/TransferContext';
import TransferBottomSheet from '../components/TransferBottomSheet';

const truncateName = (name) => name.length > 4 ? name.slice(0, 4) + '..' : name;
const A = (name) => `/assets/${name}`;

const css = `
  .plus-btn { transition: opacity 0.12s, transform 0.12s; }
  .plus-btn:hover { opacity: 0.8; }
  .plus-btn:active { opacity: 0.6; transform: scale(0.92); }
  .freq-row::-webkit-scrollbar { display: none; }
`;

export default function Home() {
  const navigate = useNavigate();
  const { savedTransfers } = useTransfers();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div style={{ position: 'relative', width: 375, height: 812, background: '#fff', overflow: 'hidden' }}>
      <style>{css}</style>

      {/* ── 상태바 ── */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <StatusBar />
      </div>

      {/* ── 닫기 아이콘 ── */}
      <div style={{ position: 'absolute', left: 33, top: 72, width: 13, height: 13 }}>
        <img src={A('icon-close.svg')} alt="닫기" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ── 이체 타이틀 ── */}
      <p style={{
        position: 'absolute', left: 23, top: 114, margin: 0,
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 20.263, fontWeight: 700, color: '#222',
        letterSpacing: -0.1228, lineHeight: '30.434px', whiteSpace: 'nowrap',
      }}>이체</p>

      {/* ── AI 이체하기 ── */}
      <div style={{ position: 'absolute', left: 239, top: 121, width: 14, height: 14 }}>
        <img src={A('ai-sparkle.png')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <p style={{
        position: 'absolute', left: 260.5, top: 121, margin: 0,
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 14, fontWeight: 600, color: '#666',
        lineHeight: 1, whiteSpace: 'nowrap',
      }}>AI로 이체하기</p>
      <div style={{ position: 'absolute', left: 346.5, top: 124, width: 4, height: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={A('icon-chevron-right.svg')} alt="" style={{ width: 4, height: 8, transform: 'rotate(180deg)', display: 'block' }} />
      </div>

      {/* ── 검색창 ── */}
      <div style={{ position: 'absolute', left: 29, top: 171, width: 13, height: 13 }}>
        <img src={A('icon-search.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{
        position: 'absolute', left: 73, top: 171, margin: 0,
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 14, fontWeight: 400, color: '#b1b1b1',
        lineHeight: 1, whiteSpace: 'nowrap',
      }}>받는 사람 이름 또는 계좌번호</p>
      <div style={{ position: 'absolute', left: 301, top: 160, width: 52, height: 36, borderRadius: 24, overflow: 'hidden' }}>
        <img src={A('camera-icon.png')} alt="카메라" style={{
          position: 'absolute',
          width: '721.15%', height: '2264.72%',
          left: '-578.85%', top: '-444.86%',
          maxWidth: 'none',
        }} />
      </div>
      {/* 검색 구분선 */}
      <div style={{ position: 'absolute', left: 19, top: 203.5, width: 277, height: 1, background: '#e8e8e8' }} />

      {/* ── 탭 ── */}
      <div style={{ position: 'absolute', left: 26, top: 228, width: 168, height: 25, background: '#f4f4f4', borderRadius: 100 }} />
      <p style={{
        position: 'absolute', left: 88, top: 230, margin: 0,
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 12.692, fontWeight: 600, color: '#000',
        letterSpacing: -0.0835, lineHeight: '20.682px', whiteSpace: 'nowrap',
      }}>계좌번호</p>
      <p style={{
        position: 'absolute', left: 237, top: 230, margin: 0,
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 12.692, fontWeight: 600, color: '#999',
        letterSpacing: -0.0835, lineHeight: '20.682px', whiteSpace: 'nowrap',
      }}>카카오톡 친구</p>

      {/* ── 내 계좌 ── */}
      <p style={{
        position: 'absolute', left: 23, top: 281, margin: 0,
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 15, fontWeight: 600, color: '#000',
        letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap',
      }}>내 계좌</p>
      <div style={{
        position: 'absolute', left: 301, top: 280,
        width: 52, background: '#f8f8f8', borderRadius: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '8px 14px',
      }}>
        <p style={{ margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 11.739, fontWeight: 600, color: '#333', letterSpacing: -0.0772, lineHeight: 1, whiteSpace: 'nowrap' }}>3개</p>
      </div>

      {/* 토스뱅크 통장 */}
      <div style={{ position: 'absolute', left: 20, top: 326, width: 39.846, height: 39 }}>
        <img src={A('logo-toss-circle.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', left: 29.8, top: 335.38, width: 20.243, height: 20.243 }}>
        <img src={A('toss-logo.png')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{ position: 'absolute', left: 74, top: 328, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>토스뱅크 통장</p>
      <p style={{ position: 'absolute', left: 74, top: 349.35, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>토스뱅크 100123456789</p>

      {/* 뱅크월렛 카카오통장 */}
      <div style={{ position: 'absolute', left: 20, top: 384, width: 39.846, height: 39 }}>
        <img src={A('logo-bankwallet.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{ position: 'absolute', left: 74, top: 385, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>뱅크월렛 카카오통장</p>
      <p style={{ position: 'absolute', left: 74, top: 406.35, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>하나 78912345678901</p>

      {/* 쏠편한 입출금통장 */}
      <div style={{ position: 'absolute', left: 20, top: 442, width: 39.846, height: 39 }}>
        <img src={A('logo-shinhan.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{ position: 'absolute', left: 74, top: 444, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>쏠편한 입출금통장</p>
      <p style={{ position: 'absolute', left: 74, top: 465.35, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>신한 110123456789</p>

      {/* ── 자주 하는 이체 ── */}
      <p style={{
        position: 'absolute', left: 23, top: 523, margin: 0,
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 15, fontWeight: 600, color: '#000',
        letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap',
      }}>자주 하는 이체</p>

      {/* 자주하는이체 가로 스크롤 — top:557, avatars at 568 (paddingTop:11) */}
      <div style={{
        position: 'absolute', left: 0, top: 557, width: 375, height: 93,
        overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none',
      }}>
        <div
          className="freq-row"
          style={{
            display: 'flex', alignItems: 'flex-start',
            paddingTop: 11, paddingLeft: 20, paddingRight: 20,
            gap: 20, width: 'max-content', height: '100%',
          }}
        >
          {[...savedTransfers].reverse().map((t, i) => (
            <div
              key={i}
              onClick={() => setSelectedItem(t)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#f0f0f0', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={t.avatar || t.recipient?.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
              <p style={{ margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 14.126, fontWeight: 400, color: '#222', lineHeight: '22.174px', letterSpacing: -0.0895, textAlign: 'center', whiteSpace: 'nowrap' }}>
                {truncateName(t.name)}
              </p>
            </div>
          ))}

          {/* + 버튼 */}
          <button
            className="plus-btn"
            onClick={() => navigate('/transfer/new')}
            style={{ position: 'relative', width: 50, height: 50, background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}
            aria-label="반복이체 추가"
          >
            <img src={A('icon-plus-circle.svg')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
            <div style={{ position: 'absolute', left: 16.5, top: 16.5, width: 17.073, height: 17.073, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={A('icon-plus.svg')} alt="" style={{ width: 12.072, height: 12.072, transform: 'rotate(45deg)', display: 'block' }} />
            </div>
          </button>
        </div>
      </div>

      {/* ── 최근 이체 ── */}
      <p style={{
        position: 'absolute', left: 24, top: 691, margin: 0,
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 15, fontWeight: 600, color: '#000',
        letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap',
      }}>최근 이체</p>

      {/* (주)뉴뉴 별 */}
      <div style={{ position: 'absolute', left: 336, top: 716, width: 18, height: 17 }}>
        <img src={A('icon-star-yellow.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* (주)뉴뉴 */}
      <div style={{ position: 'absolute', left: 21, top: 736, width: 39, height: 39 }}>
        <img src={A('recent-avatar-newnew.svg')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', left: 11, top: 11, width: 16, height: 17, overflow: 'hidden' }}>
          <img src={A('ibk-logo.png')} alt="" style={{ position: 'absolute', top: '4.4%', left: 0, width: '100%', height: '91.2%', objectFit: 'contain' }} />
        </div>
      </div>
      <p style={{ position: 'absolute', left: 75, top: 738, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>(주)뉴뉴</p>
      <p style={{ position: 'absolute', left: 75, top: 759.37, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>기업 04912345678910</p>

      {/* 최수진 별 */}
      <div style={{ position: 'absolute', left: 337, top: 805, width: 18, height: 17 }}>
        <img src={A('icon-star.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* 최수진 */}
      <div style={{ position: 'absolute', left: 21, top: 794, width: 39, height: 39 }}>
        <img src={A('logo-kakaobank.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{ position: 'absolute', left: 75, top: 795, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>최수진</p>
      <p style={{ position: 'absolute', left: 75, top: 816.37, margin: 0, fontFamily: 'Pretendard, sans-serif', fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>카카오뱅크 3333-12-1234567</p>

      {/* ── 바텀시트 (아바타 클릭 시 오버레이) ── */}
      {selectedItem && (
        <TransferBottomSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* ── 하단 플로팅 버튼 (DOM 마지막 → 위에 렌더링) ── */}
      <div style={{
        position: 'absolute',
        left: (375 - 342.557) / 2,
        top: 712,
        width: 342.557, height: 55.344,
        borderRadius: 13.359,
        background: '#fff',
        boxShadow: '0px 0px 25px 1px rgba(121,121,121,0.29)',
      }} />
      <div style={{ position: 'absolute', left: 124, top: 736, width: 8.201, height: 8.202 }}>
        <img src={A('icon-plus-small.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{
        position: 'absolute', left: 194.7, top: 732, margin: 0,
        transform: 'translateX(-50%)',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 16.221, fontWeight: 600, color: '#424242',
        letterSpacing: -0.4771, lineHeight: 1, whiteSpace: 'nowrap', textAlign: 'center',
      }}>계좌번호 직접입력</p>

    </div>
  );
}
