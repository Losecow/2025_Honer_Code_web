// 서명 기능

let isDrawing = false;
let canvas, ctx;

// 서명 모달 열기
window.openSignatureModal = function () {
  const modal = document.getElementById("signatureModal");
  if (modal) {
    modal.style.display = "flex";
    initCanvas();
  }
};

// 서명 모달 닫기
window.closeSignatureModal = function () {
  const modal = document.getElementById("signatureModal");
  if (modal) {
    modal.style.display = "none";
  }
};

// Canvas 초기화
function initCanvas() {
  canvas = document.getElementById("signatureCanvas");
  if (!canvas) return;

  ctx = canvas.getContext("2d");

  // Canvas 크기 설정
  canvas.width = 600;
  canvas.height = 200;

  // Canvas 스타일 설정
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Canvas 초기화 (투명 배경 - 누끼 처리)
  // 배경은 투명하게 유지하여 서명 부분만 저장되도록 함
  // CSS에서 시각적 배경색은 흰색으로 표시됨

  // 이벤트 리스너 추가
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  // 터치 이벤트 (모바일 지원)
  canvas.addEventListener("touchstart", handleTouch);
  canvas.addEventListener("touchmove", handleTouch);
  canvas.addEventListener("touchend", stopDrawing);
}

// 그리기 시작
function startDrawing(e) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

// 그리기 중
function draw(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
}

// 그리기 종료
function stopDrawing() {
  if (isDrawing) {
    isDrawing = false;
    ctx.beginPath();
  }
}

// 터치 이벤트 처리
function handleTouch(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent(
    e.type === "touchstart"
      ? "mousedown"
      : e.type === "touchmove"
      ? "mousemove"
      : "mouseup",
    {
      clientX: touch.clientX,
      clientY: touch.clientY,
    }
  );
  canvas.dispatchEvent(mouseEvent);
}

// 서명 지우기
window.clearSignature = function () {
  if (ctx && canvas) {
    // 투명으로 클리어 (누끼 처리)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

// 서명 저장
window.saveSignature = function () {
  if (!canvas) return;

  // Canvas가 비어있는지 확인 (투명 배경용 체크)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  let isEmpty = true;

  // 투명 또는 검은색 픽셀이 있는지 확인
  // RGBA: alpha 값이 0이 아닌 픽셀이 있고, R/G/B 중 하나라도 0에 가까우면 서명이 있는 것으로 판단
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // alpha 값이 있고, 색상이 검은색에 가까운 경우 (서명으로 판단)
    if (a > 0 && (r < 200 || g < 200 || b < 200)) {
      isEmpty = false;
      break;
    }
  }

  if (isEmpty) {
    alert("서명을 먼저 작성해주세요.");
    return;
  }

  // Canvas를 PNG 이미지로 변환 (투명 배경 포함)
  const signatureData = canvas.toDataURL("image/png");

  // localStorage에 저장
  let signatures = JSON.parse(localStorage.getItem("signatures")) || [];
  const newSignature = {
    id: Date.now(),
    data: signatureData,
    timestamp: new Date().toISOString(),
  };

  signatures.push(newSignature);
  localStorage.setItem("signatures", JSON.stringify(signatures));

  alert("서명이 완료되었습니다!");
  closeSignatureModal();

  // 메인 페이지에 서명 표시 (다음 단계에서 구현)
  displaySignatures();
};

// 메인 페이지에 서명 표시
function displaySignatures() {
  // 기존 서명 요소들 제거
  const existingSignatures = document.querySelectorAll(".signature-display");
  existingSignatures.forEach((sig) => sig.remove());

  // localStorage에서 서명 불러오기
  const signatures = JSON.parse(localStorage.getItem("signatures")) || [];

  if (signatures.length === 0) return;

  // 기존 서명 컨테이너 제거 및 재생성
  let signatureContainer = document.getElementById("signatureContainer");
  if (signatureContainer) {
    signatureContainer.remove();
  }

  // body에 서명 컨테이너를 오버레이로 생성 (레이아웃 영향 없음)
  signatureContainer = document.createElement("div");
  signatureContainer.id = "signatureContainer";
  signatureContainer.style.cssText =
    "position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;";

  // 각 서명을 랜덤 위치에 표시
  const usedPositions = []; // 겹침 방지를 위한 위치 저장

  signatures.forEach((signature) => {
    const signatureImg = document.createElement("img");
    signatureImg.src = signature.data;
    signatureImg.className = "signature-display";
    signatureImg.alt = "서명";

    // 랜덤 위치 생성 (겹침 방지)
    let position;
    let attempts = 0;
    const maxAttempts = 50;

    do {
      // 랜덤 위치 생성 (화면 크기 고려)
      const maxX = window.innerWidth - 200; // 서명 이미지 최대 너비 고려
      const maxY = window.innerHeight - 150; // 서명 이미지 최대 높이 고려
      const x = Math.random() * Math.max(maxX, 100) + 50;
      const y = Math.random() * Math.max(maxY, 100) + 100;

      position = { x, y };
      attempts++;

      // 겹침 체크 (간단한 거리 기반)
      const isOverlapping = usedPositions.some((pos) => {
        const distance = Math.sqrt(
          Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
        );
        return distance < 150; // 최소 거리 150px
      });

      if (!isOverlapping || attempts >= maxAttempts) {
        break;
      }
    } while (attempts < maxAttempts);

    usedPositions.push(position);

    // 랜덤 크기 (80% ~ 120%)
    const scale = 0.8 + Math.random() * 0.4;
    const width = 150 * scale;
    const height = 50 * scale;

    // 랜덤 회전 (-15도 ~ 15도)
    const rotation = (Math.random() - 0.5) * 30;

    // 스타일 적용
    signatureImg.style.cssText = `
      position: absolute;
      left: ${position.x}px;
      top: ${position.y}px;
      width: ${width}px;
      height: ${height}px;
      transform: rotate(${rotation}deg);
      opacity: 0.8;
      pointer-events: none;
      z-index: 1;
      transition: opacity 0.3s;
    `;

    signatureContainer.appendChild(signatureImg);
  });

  // body에 컨테이너 추가 (레이아웃에 영향 없음)
  document.body.appendChild(signatureContainer);
}

// 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 서명 버튼 클릭 이벤트
  const signatureBtn = document.getElementById("signatureBtn");
  if (signatureBtn) {
    signatureBtn.addEventListener("click", openSignatureModal);
  }

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", function (e) {
    const signatureModal = document.getElementById("signatureModal");
    if (e.target === signatureModal) {
      closeSignatureModal();
    }
  });

  // 페이지 로드 시 저장된 서명 표시
  displaySignatures();

  // 창 크기 변경 시 서명 위치 재조정
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      displaySignatures();
    }, 250);
  });
});
