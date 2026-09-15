// 피그마 node 10:1074 — 375×812 절대좌표, 원본 값 그대로
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import { useTransfers } from '../context/TransferContext';

const A = (n) => `/assets/${n}`;

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
  const { draft, commitDraft } = useTransfers();

  const recipient = draft.recipient ?? { name: '', account: '', logo: '' };
  const displayName = draft.name?.trim() || draft.category || '이체';
  const amountLabel = draft.amount > 0
    ? `${draft.amount.toLocaleString('ko-KR')}원`
    : '0원';
  const dateLabel =
    draft.scheduleType === 'onDemand' ? '필요할 때' :
    draft.scheduleType === 'weekly'
      ? (draft.weekdays?.length > 0 ? '매주 ' + draft.weekdays.join('·') : '매주')
      : `매월 ${draft.day ?? 25}일`;
  const ptcl = particle(displayName);

  const handleConfirm = () => {
    commitDraft();
    navigate('/home');
  };

  return (
    <div style={{ position: 'relative', width: 375, height: 812, background: '#fff', overflow: 'hidden' }}>

      {/* ── 상태바 ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 375, zIndex: 10 }}>
        <StatusBar />
      </div>

      {/* ── 체크 아이콘 ── */}
      <div style={{ position: 'absolute', left: 157, top: 178, width: 61, height: 61 }}>
        <img alt="" src={A('tc-check-icon.svg')} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>

      {/* ── 제목 ── */}
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
          <span style={{ color: '#005a96' }}>{displayName}</span>
          <span style={{ color: '#000' }}>{ptcl}</span>
        </p>
        <p style={{ margin: 0, color: '#000' }}>저정했어요</p>
      </div>

      {/* ── 안내 문구 ── */}
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

      {/* ── 요약 카드 ── */}
      <div style={{
        position: 'absolute', left: 20, top: 448,
        width: 335, height: 175,
        border: '1px solid #d9d9d9', borderRadius: 15,
        background: '#fff',
      }}>
        {/* 아바타 */}
        <div style={{ position: 'absolute', left: 28, top: 27, width: 37, height: 37 }}>
          {recipient.logo ? (
            <img alt="" src={recipient.logo} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : null}
        </div>

        {/* 수신자 이름 */}
        <p style={{
          position: 'absolute', left: 80, top: 25, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: '#222',
          lineHeight: 1.3, letterSpacing: -0.3256, whiteSpace: 'nowrap',
        }}>{recipient.name}</p>

        {/* 계좌 */}
        <p style={{
          position: 'absolute', left: 80, top: 47, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: '#9a9a9a',
          lineHeight: 1.3, letterSpacing: -0.3256, whiteSpace: 'nowrap',
        }}>{recipient.account}</p>

        {/* 금액 라벨 */}
        <p style={{
          position: 'absolute', left: 30, top: 88, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: '#8d8d8d',
          lineHeight: 1, letterSpacing: -0.3256, whiteSpace: 'nowrap',
        }}>금액</p>

        {/* 금액 값 */}
        <p style={{
          position: 'absolute', right: 30, top: 88, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: 'rgba(34,34,34,0.74)',
          lineHeight: 1, letterSpacing: -0.0924,
          textAlign: 'right', whiteSpace: 'nowrap',
        }}>{amountLabel}</p>

        {/* 이체 일정 라벨 */}
        <p style={{
          position: 'absolute', left: 30, top: 126, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: '#8d8d8d',
          lineHeight: 1, letterSpacing: -0.3256, whiteSpace: 'nowrap',
        }}>이체 일정</p>

        {/* 이체 일정 값 */}
        <p style={{
          position: 'absolute', right: 30, top: 126, margin: 0,
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 14.5, fontWeight: 500, color: 'rgba(34,34,34,0.74)',
          lineHeight: 1, letterSpacing: -0.0924,
          textAlign: 'right', whiteSpace: 'nowrap',
        }}>{dateLabel}</p>
      </div>

      {/* ── 확인 버튼 바 ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 375, height: 113.55, background: '#fff' }}>
        <div
          onClick={handleConfirm}
          style={{
            position: 'absolute',
            left: (375 - 342.557) / 2,
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
