// 피그마 10:880(매월) / 10:977(매주) — 두 상태 통합, 375×812
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import girlSvg from '../assets/girl.svg';
import { useTransfers } from '../context/TransferContext';

const A = (n) => `/assets/${n}`;
const MAX_AMOUNT = 100_000_000; // 1억 한도

const DAY_BTNS = [
  { day: '월', left: 21, top: 543 },
  { day: '화', left: 92, top: 543 },
  { day: '수', left: 163, top: 543 },
  { day: '목', left: 234, top: 543 },
  { day: '금', left: 305, top: 543 },
  { day: '토', left: 21, top: 608 },
  { day: '일', left: 92, top: 608 },
];

export default function TransferAmount() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useTransfers();
  const category = draft.category || '이체';
  const recipient = draft.recipient ?? { name: '', account: '', logo: '' };

  const [period, setPeriod] = useState(null);       // null | 'monthly' | 'weekly'
  const [selectedDay, setSelectedDay] = useState(null); // null | 1-31
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState(new Set());
  // 금액: raw digit string으로 저장 → backspace/삭제 정상 동작, 포맷은 파생값
  const [amountStr, setAmountStr] = useState('');
  const [nameStr, setNameStr] = useState('');
  const [needWhen, setNeedWhen] = useState(false);

  // 1억 한도 피드백
  const [shaking, setShaking] = useState(false);
  const [amountIsRed, setAmountIsRed] = useState(false);
  const [showLimitMsg, setShowLimitMsg] = useState(false);

  const isWeekly = period === 'weekly';

  const toggleDay = (day) =>
    setSelectedDays(prev => {
      const next = new Set(prev);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });

  const triggerShake = () => {
    if (shaking) return;
    setShaking(true);
    setAmountIsRed(true);
    setShowLimitMsg(true);
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
    setTimeout(() => { setShaking(false); setAmountIsRed(false); }, 380);
    setTimeout(() => setShowLimitMsg(false), 1500);
  };

  // 금액 파생값
  const amountNum = amountStr ? parseInt(amountStr, 10) : 0;

  // 한글 힌트 (원 없음: "50만", "12만 8천")
  const toKoreanAmount = (n) => {
    if (!n || n <= 0) return null;
    const man = Math.floor(n / 10000);
    const cheon = Math.floor((n % 10000) / 1000);
    if (man === 0 && cheon === 0) return null;
    let r = '';
    if (man > 0) { r += `${man}만`; if (cheon > 0) r += ` ${cheon}천`; }
    else r += `${cheon}천`;
    return r; // 원 없음
  };
  const koreanHint = toKoreanAmount(amountNum);

  // 금액 input onChange: raw digits만 저장 (콤마/원 strip)
  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const n = raw === '' ? 0 : parseInt(raw, 10);
    if (n > MAX_AMOUNT) { triggerShake(); return; }
    setAmountStr(raw);
  };

  // +버튼: 현재 raw string을 숫자로 파싱 후 더함
  const addAmount = (n) => {
    const next = amountNum + n;
    if (next > MAX_AMOUNT) { triggerShake(); return; }
    setAmountStr(next.toString());
  };

  // 금액 표시 (포맷, "원" 포함) — 오버레이용
  const amountDisplay = amountStr ? `${amountNum.toLocaleString('ko-KR')}원` : '';

  const checkSr = isWeekly ? 583 : 447;
  // needWhen=true: pill 자리(top 372 = screen 476)로 올라옴
  const needWhenTop = needWhen ? 372 : checkSr;
  const contentH = needWhen
    ? (isWeekly ? 515 : 450)
    : (isWeekly ? 660 : 520);

  // 저장 가능 조건: needWhen이거나, 주기+날짜/요일 모두 선택
  const canSave = needWhen
    || (period === 'monthly' && selectedDay !== null)
    || (period === 'weekly' && selectedDays.size > 0);

  const handleSave = () => {
    if (!canSave) return;
    updateDraft({
      name: nameStr.trim() || category,
      amount: amountNum,
      scheduleType: needWhen ? 'onDemand' : (isWeekly ? 'weekly' : 'monthly'),
      weekdays: [...selectedDays],
      day: selectedDay ?? 25,
    });
    navigate('/transfer/complete');
  };

  return (
    <div style={{ position: 'relative', width: 375, height: 812, background: '#fff', overflow: 'hidden' }}>
      <style>{`
        .ta-scroll::-webkit-scrollbar { display: none; }
        .ta-input::placeholder { color: #bbb; font-weight: 400; }
        @keyframes ta-shake {
          0%   { transform: translateX(0); }
          15%  { transform: translateX(-6px); }
          30%  { transform: translateX(6px); }
          45%  { transform: translateX(-4px); }
          60%  { transform: translateX(4px); }
          75%  { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
        .ta-amount-shake { animation: ta-shake 0.35s ease-out; }
        @media (prefers-reduced-motion: reduce) { .ta-amount-shake { animation: none; } }
      `}</style>

      {/* ── 주기 드롭다운 오버레이 ── */}
      {showDropdown && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 99 }} onClick={() => setShowDropdown(false)} />
          <div style={{
            position: 'absolute', left: 21, top: 529, width: 126,
            background: '#fff', borderRadius: 12, zIndex: 100,
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)', overflow: 'hidden',
          }}>
            {[{ value: 'monthly', label: '매월' }, { value: 'weekly', label: '매주' }].map(opt => (
              <div
                key={opt.value}
                onClick={() => {
                  if (opt.value !== period) { setSelectedDay(null); setSelectedDays(new Set()); }
                  setPeriod(opt.value);
                  setShowDropdown(false);
                  setShowDayPicker(false);
                }}
                style={{
                  height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', background: period === opt.value ? '#f7f9fc' : '#fff',
                }}
              >
                <p style={{ margin: 0, fontSize: 16, fontWeight: period === opt.value ? 600 : 400, color: '#000', letterSpacing: -0.0986 }}>{opt.label}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── 날짜 선택 드롭다운 오버레이 (매월 전용) ── */}
      {showDayPicker && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 99 }} onClick={() => setShowDayPicker(false)} />
          <div style={{
            position: 'absolute', left: 158, top: 529, width: 110,
            background: '#fff', borderRadius: 12, zIndex: 100,
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            maxHeight: 192, overflowY: 'auto',
          }}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
              <div
                key={d}
                onClick={() => { setSelectedDay(d); setShowDayPicker(false); }}
                style={{
                  height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', background: selectedDay === d ? '#f7f9fc' : '#fff',
                }}
              >
                <p style={{ margin: 0, fontSize: 16, fontWeight: selectedDay === d ? 600 : 400, color: '#000', letterSpacing: -0.0986 }}>{d}일</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── 고정 헤더 ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 375, height: 104, background: '#fff', zIndex: 10 }}>
        <StatusBar />
        <button
          onClick={() => navigate('/transfer/purpose')}
          style={{ position: 'absolute', left: 35, top: 70, width: 9, height: 18, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={A('fs-back-arrow.svg')} />
        </button>
        <p style={{
          position: 'absolute', left: '50%', top: 66, margin: 0, transform: 'translateX(-50%)',
          fontSize: 16, fontWeight: 600, color: '#000', letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap',
        }}>{category}</p>
      </div>

      {/* ── 스크롤 영역 ── */}
      <div className="ta-scroll" style={{ position: 'absolute', top: 104, left: 0, right: 0, bottom: 113.55, overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ position: 'relative', height: contentH }}>

          {/* ── 이름 섹션 ── */}
          <div style={{ position: 'absolute', left: 21, top: 22, width: 61, height: 61, background: '#ccefff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img alt="" style={{ display: 'block', width: 33, height: 35, objectFit: 'contain' }} src={girlSvg} />
          </div>
          <div style={{ position: 'absolute', left: 92, top: 22, width: 262, height: 61, background: '#f7f9fc', borderRadius: 6 }}>
            <input
              className="ta-input"
              type="text"
              value={nameStr}
              onChange={e => setNameStr(e.target.value)}
              placeholder="이체 이름을 설정해보세요"
              style={{
                position: 'absolute', left: 18, top: 0, bottom: 0, right: 12,
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 18, fontWeight: 500, color: '#222',
                letterSpacing: 0, fontFamily: 'Pretendard, sans-serif',
              }}
            />
          </div>

          {/* ── 금액 섹션 ── */}
          <p style={{ position: 'absolute', left: 21, top: 125, margin: 0, fontSize: 16, fontWeight: 500, color: '#8c8c8c', letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap' }}>얼마를 보낼까요?</p>

          {/* 금액 박스 — ghost input 패턴: raw digit input(투명) + 포맷 오버레이 */}
          <div
            className={shaking ? 'ta-amount-shake' : ''}
            style={{ position: 'absolute', left: 21, top: 166, width: 333, height: 70, background: '#f7f9fc', borderRadius: 6, cursor: 'text' }}
            onClick={() => document.getElementById('ta-amt-input')?.focus()}
          >
            {/* 투명 raw input — 키 이벤트 처리 전용, caretColor로 커서만 표시 */}
            <input
              id="ta-amt-input"
              type="tel"
              inputMode="numeric"
              value={amountStr}
              onChange={handleAmountChange}
              style={{
                position: 'absolute', left: 26, top: 0, bottom: 0, right: 90,
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 24, fontWeight: 500, letterSpacing: 0,
                fontFamily: 'Pretendard, sans-serif',
                color: 'transparent',
                caretColor: amountIsRed ? '#ff3b30' : '#222',
                zIndex: 1,
              }}
            />
            {/* 포맷 오버레이 (포인터 이벤트 없음) */}
            <p style={{
              position: 'absolute', left: 26, top: '50%', transform: 'translateY(-50%)',
              margin: 0, pointerEvents: 'none',
              fontSize: 24, fontWeight: 500, whiteSpace: 'nowrap',
              color: amountIsRed ? '#ff3b30' : (amountStr ? '#222' : '#bbb'),
              letterSpacing: 0, fontFamily: 'Pretendard, sans-serif',
              transition: 'color 0.15s ease',
            }}>
              {amountDisplay || '0원'}
            </p>
            {/* 우측 힌트: 1억 초과 메시지 or 한글 단위 (원 없음) */}
            {showLimitMsg ? (
              <p style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', margin: 0, fontSize: 11, fontWeight: 500, color: '#ff3b30', whiteSpace: 'nowrap' }}>최대 1억원</p>
            ) : koreanHint ? (
              <p style={{ position: 'absolute', right: 26, top: 23, margin: 0, fontSize: 16, fontWeight: 500, color: '#8c8c8c', letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap' }}>{koreanHint}</p>
            ) : null}
          </div>

          {/* 1억 초과 안내 문구 */}
          {showLimitMsg && (
            <p style={{ position: 'absolute', left: 21, top: 242, margin: 0, fontSize: 12, fontWeight: 500, color: '#ff3b30', lineHeight: 1, whiteSpace: 'nowrap' }}>
              최대 1억원까지 설정할 수 있어요
            </p>
          )}

          {/* ── 금액 추가 버튼 ── */}
          {[
            { label: '+1만',  left: 21,  w: 76,  amt: 10000 },
            { label: '+5만',  left: 105, w: 76,  amt: 50000 },
            { label: '+10만', left: 191, w: 76,  amt: 100000 },
            { label: '+50만', left: 275, w: 79,  amt: 500000 },
          ].map(({ label, left, w, amt }) => (
            <div
              key={label}
              onClick={() => addAmount(amt)}
              style={{ position: 'absolute', left, top: 263, width: w, height: 40, background: '#f1f2f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#666', lineHeight: 1.3, whiteSpace: 'nowrap' }}>{label}</p>
            </div>
          ))}

          {/* ── "언제 보낼까요?" 라벨 — 항상 표시 (screen top 435 = content top 331) ── */}
          <p style={{ position: 'absolute', left: 21, top: 331, margin: 0, fontSize: 16, fontWeight: 500, color: '#8c8c8c', letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap' }}>언제 보낼까요?</p>

          {/* ── pill / 요일 버튼 — needWhen=true 시 opacity 0 숨김 ── */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0,
            opacity: needWhen ? 0 : 1,
            pointerEvents: needWhen ? 'none' : 'auto',
            transition: 'opacity 0.2s ease',
          }}>
            {/* 주기 pill */}
            <div
              onClick={() => { setShowDropdown(d => !d); setShowDayPicker(false); }}
              style={{ position: 'absolute', left: 21, top: 372, width: 126, height: 49, background: '#f7f9fc', borderRadius: 100, cursor: 'pointer' }}
            >
              <p style={{ position: 'absolute', left: 20, top: 12, margin: 0, fontSize: 16, fontWeight: 500, letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap', color: period ? '#000' : '#8c8c8c' }}>
                {period === 'weekly' ? '매주' : period === 'monthly' ? '매월' : '주기 선택'}
              </p>
              <div style={{ position: 'absolute', right: 12, top: 22, width: 11, height: 5.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flexShrink: 0, transform: 'rotate(-90deg)' }}>
                  <div style={{ position: 'relative', width: 5.5, height: 11 }}>
                    <div style={{ position: 'absolute', inset: '-5% -10%' }}>
                      <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={A('ta-chevron-down.svg')} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 매월: 날짜 pill */}
            {period === 'monthly' && (
              <div
                onClick={() => { setShowDayPicker(d => !d); setShowDropdown(false); }}
                style={{ position: 'absolute', left: 158, top: 372, width: 110, height: 49, background: '#f7f9fc', borderRadius: 100, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <p style={{ margin: 0, fontSize: 16, fontWeight: 500, letterSpacing: -0.0986, lineHeight: '24.443px', whiteSpace: 'nowrap', color: selectedDay ? '#000' : '#8c8c8c' }}>
                  {selectedDay ? `${selectedDay}일` : '날짜 선택'}
                </p>
              </div>
            )}

            {/* 매주: 요일 버튼 */}
            {isWeekly && DAY_BTNS.map(({ day, left, top }) => {
              const sr = top - 104;
              const active = selectedDays.has(day);
              return (
                <div
                  key={day}
                  onClick={() => toggleDay(day)}
                  style={{ position: 'absolute', left, top: sr, width: 49, height: 49, borderRadius: '50%', background: active ? '#ffe200' : '#f7f9fc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: active ? '#222' : '#000', letterSpacing: -0.0986, lineHeight: '24.443px' }}>{day}</p>
                </div>
              );
            })}
          </div>

          {/* ── "필요할 때 보낼게요" — 선택 시 pill 자리(top 372=screen 476)로 이동 ── */}
          <div style={{
            position: 'absolute', left: 21,
            top: needWhenTop,
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'top 0.2s ease',
          }}>
            <div
              onClick={() => setNeedWhen(prev => !prev)}
              style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: needWhen ? '#ffe200' : 'transparent',
                border: needWhen ? '1.5px solid transparent' : '1.5px solid rgba(140,140,140,0.45)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s ease, border-color 0.15s ease',
              }}
            >
              {needWhen && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4.5L4 7.5L10 1.5" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <p
              onClick={() => setNeedWhen(prev => !prev)}
              style={{
                margin: 0, fontSize: 15, fontWeight: 500,
                color: needWhen ? '#222' : 'rgba(140,140,140,0.6)',
                lineHeight: 'normal', whiteSpace: 'nowrap', cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
            >필요할 때 보낼게요</p>
          </div>

        </div>
      </div>

      {/* ── 하단 저장하기 바 ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 375, height: 113.55, background: '#fff' }}>
        <div
          onClick={handleSave}
          style={{
            position: 'absolute', left: (375 - 342.557) / 2, top: 20.99,
            width: 342.557, height: 55.344, borderRadius: 13.359,
            background: canSave ? '#ffe200' : '#e6e6e6',
            cursor: canSave ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s ease',
          }}
        >
          <p style={{ margin: 0, fontSize: 16.221, fontWeight: 600, color: canSave ? '#222' : '#999', letterSpacing: -0.4771, lineHeight: 1, whiteSpace: 'nowrap', transition: 'color 0.2s ease' }}>저장하기</p>
        </div>
      </div>
    </div>
  );
}
