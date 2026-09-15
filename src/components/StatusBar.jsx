// 케이스 A: statusbar.svg는 콘텐츠만(~308px) 담긴 파일
// 피그마 기준: X 35.31, Y 18.76, W 307.33, H 20.36 (375×812 프레임 내)
// 컨테이너는 표준 iOS 높이 44px 고정 — 기존 화면 header 104(=44+60) 레이아웃 유지
import statusbarSvg from '../assets/statusbar.svg';

export default function StatusBar() {
  return (
    <div style={{ position: 'relative', width: 375, height: 44, flexShrink: 0 }}>
      <img
        src={statusbarSvg}
        alt=""
        style={{
          position: 'absolute',
          left: 35.31,
          top: 18.76,
          width: 307.33,
          height: 20.36,
          display: 'block',
        }}
      />
    </div>
  );
}
