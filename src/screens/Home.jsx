// 피그마 node 2:64 — 375×812 절대좌표 재현
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import { useTransfers } from '../context/TransferContext';

// 이름 최대 4글자 표시 (5글자 이상 → slice(0,4) + "..")
const truncateName = (name) => name.length > 4 ? name.slice(0, 4) + '..' : name;

const A = (name) => `/assets/${name}`;

// + 버튼에만 hover/active 효과를 주기 위한 CSS
const plusBtnStyle = `
  .plus-btn { transition: opacity 0.12s, transform 0.12s; }
  .plus-btn:hover { opacity: 0.8; }
  .plus-btn:active { opacity: 0.6; transform: scale(0.92); }
`;

export default function Home() {
  const navigate = useNavigate();
  const { savedTransfers } = useTransfers();

  return (
    <div style={{ position: 'relative', width: 375, height: 812, background: '#fff', overflow: 'hidden' }}>
      <style>{plusBtnStyle}</style>

      {/* ── 상태바 (공용 StatusBar) ── */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <StatusBar />
      </div>

      {/* ── 헤더 ── */}
      <div style={{ position: 'absolute', left: 33, top: 72, width: 13, height: 13 }}>
        <img src={A('icon-close.svg')} alt="닫기" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      <p style={{
        position: 'absolute', left: 23, top: 114,
        fontSize: 20.263, fontWeight: 700, color: '#222',
        letterSpacing: -0.1228, lineHeight: '30.434px', whiteSpace: 'nowrap',
      }}>이체</p>

      <div style={{ position: 'absolute', left: 239, top: 121, width: 14, height: 14 }}>
        <img src={A('ai-sparkle.png')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      <p style={{
        position: 'absolute', left: 260.5, top: 121,
        fontSize: 14, fontWeight: 600, color: '#666',
        lineHeight: 1, whiteSpace: 'nowrap',
      }}>AI로 이체하기</p>

      <div style={{ position: 'absolute', left: 346.5, top: 124, width: 4, height: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={A('icon-chevron-right.svg')} alt="" style={{ width: 4, height: 8, transform: 'rotate(180deg)', display: 'block' }} />
      </div>

      {/* ── 검색창 (투명 + 하단 선) ── */}
      <div style={{ position: 'absolute', left: 29, top: 171, width: 13, height: 13 }}>
        <img src={A('icon-search.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      <p style={{
        position: 'absolute', left: 73, top: 171,
        fontSize: 14, fontWeight: 400, color: '#b1b1b1',
        lineHeight: 1, whiteSpace: 'nowrap',
      }}>받는 사람 이름 또는 계좌번호</p>

      {/* 카메라 아이콘 — 피그마 원본 PNG 크롭 */}
      <div style={{
        position: 'absolute', left: 301, top: 160, width: 52, height: 36,
        borderRadius: 24, overflow: 'hidden',
      }}>
        <img src={A('camera-icon.png')} alt="카메라" style={{
          position: 'absolute',
          width: '721.15%', height: '2264.72%',
          left: '-578.85%', top: '-444.86%',
          maxWidth: 'none',
        }} />
      </div>

      {/* 검색 하단 구분선 */}
      <div style={{ position: 'absolute', left: 19, top: 203.5, width: 277, height: 1, background: '#e8e8e8' }} />

      {/* ── 탭 (정적 — 계좌번호 활성 고정) ── */}
      <div style={{ position: 'absolute', left: 26, top: 228, width: 168, height: 25, background: '#f4f4f4', borderRadius: 100 }} />
      <p style={{
        position: 'absolute', left: 88, top: 230,
        fontSize: 12.692, fontWeight: 600, color: '#000',
        letterSpacing: -0.0835, lineHeight: '20.682px', whiteSpace: 'nowrap',
      }}>계좌번호</p>
      <p style={{
        position: 'absolute', left: 237, top: 230,
        fontSize: 12.692, fontWeight: 600, color: '#999',
        letterSpacing: -0.0835, lineHeight: '20.682px', whiteSpace: 'nowrap',
      }}>카카오톡 친구</p>

      {/* ── 내 계좌 ── */}
      <p style={{
        position: 'absolute', left: 23, top: 281,
        fontSize: 15, fontWeight: 600, color: '#000',
        letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap',
      }}>내 계좌</p>

      <div style={{
        position: 'absolute', left: 301, top: 280,
        width: 52, background: '#f8f8f8', borderRadius: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '8px 14px',
      }}>
        <p style={{ fontSize: 11.739, fontWeight: 600, color: '#333', letterSpacing: -0.0772, lineHeight: 1, whiteSpace: 'nowrap' }}>3개</p>
      </div>

      {/* 토스뱅크 통장 */}
      <div style={{ position: 'absolute', left: 20, top: 326, width: 39.846, height: 39 }}>
        <img src={A('logo-toss-circle.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', left: 29.8, top: 335.38, width: 20.243, height: 20.243 }}>
        <img src={A('toss-logo.png')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{ position: 'absolute', left: 74, top: 328, fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>토스뱅크 통장</p>
      <p style={{ position: 'absolute', left: 74, top: 349.35, fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>토스뱅크 100123456789</p>

      {/* 뱅크월렛 카카오통장 */}
      <div style={{ position: 'absolute', left: 20, top: 384, width: 39.846, height: 39 }}>
        <img src={A('logo-bankwallet.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{ position: 'absolute', left: 74, top: 385, fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>뱅크월렛 카카오통장</p>
      <p style={{ position: 'absolute', left: 74, top: 406.35, fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>신한 78912345678901</p>

      {/* 쏠편한 입출금통장 */}
      <div style={{ position: 'absolute', left: 20, top: 442, width: 39.846, height: 39 }}>
        <img src={A('logo-shinhan.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{ position: 'absolute', left: 74, top: 444, fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>쏠편한 입출금통장</p>
      <p style={{ position: 'absolute', left: 74, top: 465.35, fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>신한 110123456789</p>

      {/* ── 자주하는 이체 ── */}
      <p style={{
        position: 'absolute', left: 23, top: 523,
        fontSize: 15, fontWeight: 600, color: '#000',
        letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap',
      }}>자주 하는 이체</p>

      {/* ── 자주 하는 이체 아이템 + + 버튼 (가로 스크롤) ── */}
      {/* 저장된 항목이 + 버튼 왼쪽에 쌓임 */}
      <div style={{
        position: 'absolute', left: 0, top: 557, width: 375, height: 88,
        overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none',
      }}>
        <style>{'.freq-row::-webkit-scrollbar{display:none}'}</style>
        <div
          className="freq-row"
          style={{ display: 'flex', alignItems: 'flex-start', paddingLeft: 20, paddingRight: 20, gap: 16, width: 'max-content', height: '100%' }}
        >
          {/* 저장된 이체 항목 (최신 순, + 버튼 왼쪽에 쌓임) */}
          {[...savedTransfers].reverse().map((t, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingTop: 4 }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#f0f0f0', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={t.recipient.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 400, color: '#222', lineHeight: 1, textAlign: 'center', whiteSpace: 'nowrap' }}>
                {truncateName(t.name)}
              </p>
            </div>
          ))}

          {/* + 버튼 */}
          <button
            className="plus-btn"
            onClick={() => navigate('/transfer/new')}
            style={{ position: 'relative', width: 50, height: 50, background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0, marginTop: 4 }}
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
        position: 'absolute', left: 23, top: 660,
        fontSize: 15, fontWeight: 600, color: '#000',
        letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap',
      }}>최근 이체</p>

      {/* (주)뉴뉴 */}
      <div style={{ position: 'absolute', left: 20, top: 705, width: 39, height: 39 }}>
        <img src={A('recent-avatar-newnew.svg')} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', left: 11, top: 11, width: 16, height: 17, overflow: 'hidden' }}>
          <img src={A('ibk-logo.png')} alt="" style={{ position: 'absolute', top: '4.4%', left: 0, width: '100%', height: '91.2%', objectFit: 'contain' }} />
        </div>
      </div>
      <p style={{ position: 'absolute', left: 74, top: 707, fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>(주)뉴뉴</p>
      <p style={{ position: 'absolute', left: 74, top: 728.37, fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>기업 04912345678910</p>

      {/* (주)뉴뉴 별 (정적 — 채워진 별) */}
      <div style={{
        position: 'absolute',
        top: Math.round(0.8818 * 812), left: Math.round(0.896 * 375),
        width: Math.round(375 * (1 - 0.056 - 0.896)),
        height: Math.round(812 * (1 - 0.0971 - 0.8818)),
      }}>
        <img src={A('icon-star-yellow.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* 최수진 */}
      <div style={{ position: 'absolute', left: 20, top: 763, width: 38.923, height: 39 }}>
        <img src={A('logo-kakaobank.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <p style={{ position: 'absolute', left: 74, top: 764, fontSize: 15.25, fontWeight: 400, color: '#222', lineHeight: 1.3, whiteSpace: 'nowrap' }}>최수진</p>
      <p style={{ position: 'absolute', left: 74, top: 785.37, fontSize: 11.292, fontWeight: 400, color: '#9a9a9a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>카카오뱅크 3333-12-1234567</p>

      {/* 최수진 별 (정적 — 빈 별) */}
      <div style={{
        position: 'absolute',
        top: Math.round(0.9532 * 812), left: Math.round(0.896 * 375),
        width: Math.round(375 * (1 - 0.056 - 0.896)),
        height: Math.round(812 * (1 - 0.0257 - 0.9532)),
      }}>
        <img src={A('icon-star.svg')} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ── 하단 플로팅 버튼 ── */}
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
        position: 'absolute', left: 194.7, top: 732,
        transform: 'translateX(-50%)',
        fontSize: 16.221, fontWeight: 600, color: '#424242',
        letterSpacing: -0.4771, lineHeight: 1, whiteSpace: 'nowrap', textAlign: 'center',
      }}>계좌번호 직접입력</p>

    </div>
  );
}
