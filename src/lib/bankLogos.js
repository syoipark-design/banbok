// 계좌 문자열 앞부분 은행명 → pill 로고 경로 매핑
// 순서 중요: 더 긴 키('토스뱅크')가 짧은 키('토스')보다 앞에 위치
const BANK_MAP = [
  ['토스뱅크', '/assets/logo-toss-pill.png'],
  ['신한',    '/assets/logo-shinhan-pill.svg'],
  ['하나',    '/assets/logo-hana-pill.svg'],
  ['기업',    '/assets/logo-ibk-pill.png'],
  ['카카오뱅크', '/assets/logo-kakaobank.svg'],
];

export function getBankLogo(account) {
  if (!account) return '';
  for (const [bank, logo] of BANK_MAP) {
    if (account.startsWith(bank)) return logo;
  }
  return '';
}
