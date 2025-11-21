// 정직 지수 온도계 기능

// localStorage에서 정직 지수 불러오기 (없으면 0으로 초기화)
let honestyScore = parseInt(localStorage.getItem("honestyScore")) || 0;

// 정직 지수 업데이트 함수
function updateHonestyMeter() {
  // 값이 100을 넘지 않도록 제한
  if (honestyScore > 100) {
    honestyScore = 100;
  }

  // localStorage에 저장
  localStorage.setItem("honestyScore", honestyScore.toString());

  // 온도계 채우기 너비 계산 (0~100%)
  const fillWidth = (honestyScore / 100) * 100;
  const fillElement = document.getElementById("honestyFill");
  if (fillElement) {
    fillElement.style.width = `${fillWidth}%`;
  }

  // 색상 결정 및 적용
  let fillColor;
  if (honestyScore <= 40) {
    // 0~40: 파랑
    fillColor = "#3182f6";
  } else if (honestyScore <= 70) {
    // 40~70: 초록
    fillColor = "#22c55e";
  } else {
    // 70~100: 주황~빨강 (그라데이션)
    const ratio = (honestyScore - 70) / 30; // 0~1 사이 값
    // 주황(#f59e0b)에서 빨강(#ef4444)로 그라데이션
    const r = Math.round(245 - ratio * 26); // 245 -> 219
    const g = Math.round(158 - ratio * 114); // 158 -> 44
    const b = Math.round(11 - ratio * 11); // 11 -> 0
    fillColor = `rgb(${r}, ${g}, ${b})`;
  }

  if (fillElement) {
    fillElement.style.backgroundColor = fillColor;
  }

  // 정직 지수 텍스트 업데이트
  const scoreText = document.getElementById("honestyScoreText");
  if (scoreText) {
    scoreText.textContent = `현재 정직 지수: ${honestyScore}`;
  }
}

// 정직 지수 증가 함수 (+5)
function increaseHonestyScore() {
  if (honestyScore < 100) {
    honestyScore += 5;
    // 100을 넘으면 100으로 제한
    if (honestyScore > 100) {
      honestyScore = 100;
    }
    updateHonestyMeter();
  } else {
    alert("정직 지수가 이미 최대치입니다!");
  }
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 버튼 이벤트 리스너 추가
  const increaseBtn = document.getElementById("increaseHonestyBtn");
  if (increaseBtn) {
    increaseBtn.addEventListener("click", increaseHonestyScore);
  }

  // 초기 온도계 업데이트
  updateHonestyMeter();
});
