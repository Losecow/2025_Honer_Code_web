// 지도 장소 정보 기능

// 장소 데이터
const locations = {
  1: {
    name: "장소 1",
    description: "장소 1에 대한 설명을 입력해주세요.",
    details: "추가 정보를 입력할 수 있습니다.",
  },
  2: {
    name: "장소 2",
    description: "장소 2에 대한 설명을 입력해주세요.",
    details: "추가 정보를 입력할 수 있습니다.",
  },
  3: {
    name: "장소 3",
    description: "장소 3에 대한 설명을 입력해주세요.",
    details: "추가 정보를 입력할 수 있습니다.",
  },
  4: {
    name: "장소 4",
    description: "장소 4에 대한 설명을 입력해주세요.",
    details: "추가 정보를 입력할 수 있습니다.",
  },
};

// 장소 모달 열기
function openLocationModal(locationId) {
  const location = locations[locationId];
  if (!location) return;

  const modal = document.getElementById("locationModal");
  const title = document.getElementById("locationTitle");
  const content = document.getElementById("locationContent");

  title.textContent = location.name;
  content.innerHTML = `
    <div class="location-info">
      <p class="location-description">${location.description}</p>
      <p class="location-details">${location.details}</p>
    </div>
  `;

  modal.style.display = "flex";
}

// 장소 모달 닫기
window.closeLocationModal = function () {
  const modal = document.getElementById("locationModal");
  if (modal) {
    modal.style.display = "none";
  }
};

// 모달 닫기 타이머
let modalCloseTimer = null;
let isModalHovered = false;
let isButtonHovered = false;

// 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 모든 장소 버튼에 이벤트 리스너 추가
  const locationButtons = document.querySelectorAll(".location-btn");
  locationButtons.forEach((btn) => {
    // 마우스 오버 시 모달 열기
    btn.addEventListener("mouseenter", function () {
      isButtonHovered = true;
      // 기존 타이머 취소
      if (modalCloseTimer) {
        clearTimeout(modalCloseTimer);
        modalCloseTimer = null;
      }
      
      const locationId = parseInt(this.getAttribute("data-location"));
      openLocationModal(locationId);
    });
    
    // 버튼에서 마우스가 벗어날 때
    btn.addEventListener("mouseleave", function () {
      isButtonHovered = false;
      // 모달 위에 마우스가 있으면 닫지 않음
      if (!isModalHovered) {
        modalCloseTimer = setTimeout(function() {
          if (!isButtonHovered && !isModalHovered) {
            closeLocationModal();
          }
        }, 100);
      }
    });
  });

  // 모달 이벤트 처리
  const locationModal = document.getElementById("locationModal");
  if (locationModal) {
    locationModal.addEventListener("mouseenter", function() {
      isModalHovered = true;
      // 타이머 취소
      if (modalCloseTimer) {
        clearTimeout(modalCloseTimer);
        modalCloseTimer = null;
      }
    });
    
    locationModal.addEventListener("mouseleave", function() {
      isModalHovered = false;
      // 버튼 위에 마우스가 있으면 닫지 않음
      if (!isButtonHovered) {
        modalCloseTimer = setTimeout(function() {
          if (!isButtonHovered && !isModalHovered) {
            closeLocationModal();
          }
        }, 100);
      }
    });
  }

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", function (e) {
    const locationModal = document.getElementById("locationModal");
    if (e.target === locationModal) {
      closeLocationModal();
    }
  });

  // 지도 이미지 로드 후 버튼 위치 조정 (반응형 대응)
  const mapImage = document.getElementById("mapImage");
  if (mapImage) {
    mapImage.addEventListener("load", function () {
      adjustButtonPositions();
      // 디버깅 모드 활성화 (개발 시에만 사용)
      // enableCoordinateDebug();
    });

    // 이미 로드된 경우
    if (mapImage.complete) {
      adjustButtonPositions();
      // enableCoordinateDebug();
    }
  }
});

// 반응형 버튼 위치 조정 (퍼센트 기반)
function adjustButtonPositions() {
  const mapImage = document.getElementById("mapImage");
  if (!mapImage) return;

  // 버튼 위치 조정 (퍼센트 기반 - 직접 퍼센트 값 사용)
  const buttons = document.querySelectorAll(".location-btn");
  buttons.forEach((btn) => {
    // data 속성에서 퍼센트 좌표 가져오기
    const percentX = parseFloat(btn.getAttribute("data-x-percent"));
    const percentY = parseFloat(btn.getAttribute("data-y-percent"));

    if (isNaN(percentX) || isNaN(percentY)) return;

    // 퍼센트로 위치 설정 (탭 크기와 무관하게 일정한 위치 유지)
    btn.style.left = `${percentX}%`;
    btn.style.top = `${percentY}%`;
  });
}

// 디버깅: 지도 위에서 클릭하면 좌표 출력
function enableCoordinateDebug() {
  const mapImage = document.getElementById("mapImage");
  if (!mapImage) return;

  mapImage.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // 원본 이미지 크기
    const originalWidth = this.naturalWidth;
    const originalHeight = this.naturalHeight;

    // 표시 크기
    const displayWidth = this.offsetWidth;
    const displayHeight = this.offsetHeight;

    // 원본 이미지 기준 좌표 계산
    const originalX = (clickX / displayWidth) * originalWidth;
    const originalY = (clickY / displayHeight) * originalHeight;

    // 퍼센트 계산
    const percentX = (clickX / displayWidth) * 100;
    const percentY = (clickY / displayHeight) * 100;

    // 버튼 위치는 조금 위에 (화살표가 위치를 가리지 않도록)
    const buttonY = percentY - 3; // 3% 위로

    // 콘솔에 출력
    console.log("=== 클릭 좌표 정보 ===");
    console.log(`원본 이미지 좌표: (${Math.round(originalX)}, ${Math.round(originalY)})`);
    console.log(`퍼센트 좌표: (${percentX.toFixed(2)}%, ${percentY.toFixed(2)}%)`);
    console.log(`버튼 위치 (위로 조정): (${percentX.toFixed(2)}%, ${buttonY.toFixed(2)}%)`);
    console.log(`표시 좌표: (${Math.round(clickX)}, ${Math.round(clickY)})`);
    console.log(`원본 이미지 크기: ${originalWidth} x ${originalHeight}`);
    console.log(`표시 이미지 크기: ${displayWidth} x ${displayHeight}`);
    console.log("====================");

    // 화면에 임시로 표시
    alert(
      `퍼센트 좌표: (${percentX.toFixed(2)}%, ${percentY.toFixed(2)}%)\n` +
        `버튼 위치 (위로 조정): (${percentX.toFixed(2)}%, ${buttonY.toFixed(2)}%)`
    );
  });

  console.log("좌표 디버깅 모드 활성화: 지도 이미지를 클릭하면 좌표가 표시됩니다.");
}

// 창 크기 변경 시 버튼 위치 재조정
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    adjustButtonPositions();
  }, 250);
});

