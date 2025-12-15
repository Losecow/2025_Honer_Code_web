// 지도 장소 정보 기능

const locationTranslations = {
  ko: {
    serviceTitle: "이곳에서 할 수 있는 섬김",
    locations: {
      1: {
        name: "학관 쓰레기통",
        service:
          "• 올바른 분리수거 실천하기<br>• 쓰레기통 주변 정리 및 청소하기<br>• 넘친 쓰레기 정리하기<br>• 환경 보호 캠페인 참여하기",
        description:
          "학관 근처에 위치한 쓰레기통입니다. 캠퍼스 환경을 깨끗하게 유지하기 위해 올바른 분리수거와 쓰레기 배출이 이루어지는 공간입니다.",
        image: "사진/장소1.jpeg",
      },
      2: {
        name: "바베큐장",
        service:
          "• 사용 후 그릴과 시설 청소하기<br>• 쓰레기 정리 및 분리수거하기<br>• 식사 준비와 정리를 함께 나누기<br>• 다음 이용자를 위한 공간 정돈하기",
        description:
          "학생들이 함께 모여 식사를 나누고 교제할 수 있는 바베큐 시설입니다. 다양한 모임과 행사에서 활용되는 공간으로, 공동체의 화합을 도모하는 장소입니다.",
        images: ["사진/장소2.jpeg", "사진/장소2_1.jpeg"],
      },
      3: {
        name: "농구장",
        service:
          "• 사용 후 코트와 주변 정리하기<br>• 농구 장비 정리 및 관리하기<br>• 시설 청소 및 환경 정돈하기<br>• 다른 이용자들을 위한 공간 준비하기",
        description:
          "학생들이 농구를 즐길 수 있는 운동 시설입니다. 건강한 신체 활동과 여가 시간을 보낼 수 있는 공간으로, 학생들의 건강한 생활을 지원합니다.",
        image: "사진/장소3.jpeg",
      },
      4: {
        name: "농구장&풋살장 전원분배함",
        service:
          "• 전원분배함 주변 정리 및 청소하기<br>• 이상 징후 발견 시 신고하기<br>• 시설 보호 및 관리에 관심 갖기<br>• 안전한 전기 사용 실천하기",
        description:
          "농구장과 풋살장에 전력을 공급하는 전원분배함 시설입니다. 운동 시설의 안전한 전기 공급을 담당하며, 학생들이 안심하고 운동할 수 있도록 지원하는 중요한 인프라입니다.",
        image: "사진/장소4.jpeg",
      },
      5: {
        name: "오석관",
        service:
          "• 강의실과 복도 정리 및 청소하기<br>• 학습 공간 환경 정돈하기<br>• 쓰레기 분리수거 실천하기<br>• 조용한 학습 환경 유지하기",
        description:
          "한동대학교의 주요 건물 중 하나인 오석관입니다. 강의실, 연구실, 사무실 등이 위치한 건물로, 학생들의 학습과 연구 활동이 이루어지는 핵심 공간입니다.",
        image: "사진/장소5.jpeg",
      },
      6: {
        name: "느혜미야 주차장",
        service:
          "• 주차 공간 정리 및 청소하기<br>• 올바른 주차 질서 지키기<br>• 쓰레기 정리 및 환경 정돈하기<br>• 다른 이용자들을 위한 공간 배려하기",
        description:
          "느혜미야 건물 인근에 위치한 주차장 시설입니다. 학생과 교직원들의 편리한 주차를 위한 공간으로, 캠퍼스 내 교통 흐름을 원활하게 하는 중요한 인프라입니다.",
        image: "사진/장소6.jpeg",
      },
    },
  },
  en: {
    serviceTitle: "Ways to Serve Here",
    locations: {
      1: {
        name: "Student Hall Trash Bins",
        service:
          "• Practice proper recycling<br>• Tidy and clean around the bins<br>• Clear any overflowing trash<br>• Join environmental protection efforts",
        description:
          "Trash bins near the student hall. A place to keep the campus clean through correct waste sorting and disposal.",
        image: "사진/장소1.jpeg",
      },
      2: {
        name: "BBQ Area",
        service:
          "• Clean grills and facilities after use<br>• Sort and dispose of trash properly<br>• Share meal prep and cleanup together<br>• Leave the space ready for the next users",
        description:
          "A barbecue facility where students gather to share meals and fellowship. A space that fosters community through various events and gatherings.",
        images: ["사진/장소2.jpeg", "사진/장소2_1.jpeg"],
      },
      3: {
        name: "Basketball Court",
        service:
          "• Clean the court and surroundings after use<br>• Organize and care for basketball equipment<br>• Keep the facility tidy<br>• Prepare the space considerately for others",
        description:
          "An athletic facility where students enjoy basketball. A space that supports healthy activity and leisure for students.",
        image: "사진/장소3.jpeg",
      },
      4: {
        name: "Basketball & Futsal Power Box",
        service:
          "• Keep the power box area clean<br>• Report any abnormal signs<br>• Care for and protect the facility<br>• Practice safe electricity use",
        description:
          "The power distribution box supplying electricity to the basketball and futsal courts. It supports safe power so students can enjoy sports with peace of mind.",
        image: "사진/장소4.jpeg",
      },
      5: {
        name: "Oseok Hall",
        service:
          "• Clean and organize classrooms and hallways<br>• Keep study spaces tidy<br>• Practice waste sorting<br>• Maintain a quiet learning environment",
        description:
          "One of Handong’s main buildings, housing classrooms, labs, and offices. A core space for students’ learning and research activities.",
        image: "사진/장소5.jpeg",
      },
      6: {
        name: "Nehemiah Parking Lot",
        service:
          "• Clean and organize the parking area<br>• Follow proper parking order<br>• Keep the environment tidy and litter-free<br>• Be considerate to other users",
        description:
          "A parking facility near Nehemiah building. It supports convenient parking for students and staff and smooth traffic flow on campus.",
        image: "사진/장소6.jpeg",
      },
    },
  },
};

let currentMapLang = localStorage.getItem("preferredLanguage") || "ko";

// 장소 모달 열기
function openLocationModal(locationId) {
  const lang = currentMapLang || "ko";
  const langPack = locationTranslations[lang] || locationTranslations.ko;
  const location = langPack.locations[locationId];
  if (!location) return;

  const modal = document.getElementById("locationModal");
  const title = document.getElementById("locationTitle");
  const content = document.getElementById("locationContent");

  title.textContent = location.name;

  // 이미지 처리: 여러 이미지가 있으면 슬라이더, 하나면 단일 이미지
  let imageHtml = "";
  if (location.images && location.images.length > 1) {
    // 여러 이미지 슬라이더
    const imageItems = location.images
      .map(
        (img, index) =>
          `<div class="location-slide ${index === 0 ? "active" : ""}">
        <img src="${img}" alt="${location.name} ${
            index + 1
          }" class="location-image" />
      </div>`
      )
      .join("");

    imageHtml = `
      <div class="location-image-slider">
        <div class="location-slides-container">
          ${imageItems}
        </div>
        <button class="slider-btn prev-btn" onclick="changeLocationSlide(-1)">‹</button>
        <button class="slider-btn next-btn" onclick="changeLocationSlide(1)">›</button>
        <div class="slider-dots-container">
          ${location.images
            .map(
              (_, index) =>
                `<span class="slider-dot ${
                  index === 0 ? "active" : ""
                }" onclick="goToLocationSlide(${index})"></span>`
            )
            .join("")}
        </div>
      </div>
    `;
  } else {
    // 단일 이미지
    const imageSrc = location.images ? location.images[0] : location.image;
    if (imageSrc) {
      imageHtml = `<div class="location-image-container">
        <img src="${imageSrc}" alt="${location.name}" class="location-image" />
      </div>`;
    }
  }

  content.innerHTML = `
    ${imageHtml}
    <div class="location-info">
      <div class="location-service">
        <h3 class="service-title">${langPack.serviceTitle}</h3>
        <div class="service-content">${location.service}</div>
      </div>
      <p class="location-description">${location.description}</p>
    </div>
  `;

  // 슬라이더가 있으면 현재 슬라이드 인덱스 저장
  if (location.images && location.images.length > 1) {
    const modal = document.getElementById("locationModal");
    modal.setAttribute("data-current-slide", "0");
    modal.setAttribute("data-total-slides", location.images.length.toString());
  }

  modal.setAttribute("data-location", locationId.toString());
  modal.style.display = "flex";
}

// 장소 이미지 슬라이더 함수
window.changeLocationSlide = function (direction) {
  const modal = document.getElementById("locationModal");
  const currentSlide = parseInt(modal.getAttribute("data-current-slide")) || 0;
  const totalSlides = parseInt(modal.getAttribute("data-total-slides")) || 0;

  if (totalSlides === 0) return;

  let newSlide = currentSlide + direction;
  if (newSlide < 0) {
    newSlide = totalSlides - 1;
  } else if (newSlide >= totalSlides) {
    newSlide = 0;
  }

  goToLocationSlide(newSlide);
};

window.goToLocationSlide = function (index) {
  const modal = document.getElementById("locationModal");
  const slides = modal.querySelectorAll(".location-slide");
  const dots = modal.querySelectorAll(".slider-dot");
  const totalSlides = parseInt(modal.getAttribute("data-total-slides")) || 0;

  if (index < 0 || index >= totalSlides) return;

  // 모든 슬라이드와 도트에서 active 제거
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // 선택된 슬라이드와 도트에 active 추가
  if (slides[index]) slides[index].classList.add("active");
  if (dots[index]) dots[index].classList.add("active");

  modal.setAttribute("data-current-slide", index.toString());
};

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
        modalCloseTimer = setTimeout(function () {
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
    locationModal.addEventListener("mouseenter", function () {
      isModalHovered = true;
      // 타이머 취소
      if (modalCloseTimer) {
        clearTimeout(modalCloseTimer);
        modalCloseTimer = null;
      }
    });

    locationModal.addEventListener("mouseleave", function () {
      isModalHovered = false;
      // 버튼 위에 마우스가 있으면 닫지 않음
      if (!isButtonHovered) {
        modalCloseTimer = setTimeout(function () {
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

function updateMapTranslations(lang) {
  currentMapLang = lang || "ko";
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("preferredLanguage", currentMapLang);
  }

  const modal = document.getElementById("locationModal");
  if (modal && modal.style.display === "flex") {
    const currentLocationId = parseInt(modal.getAttribute("data-location"), 10);
    if (currentLocationId) {
      openLocationModal(currentLocationId);
    }
  }
}

window.updateMapTranslations = updateMapTranslations;

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
    console.log(
      `원본 이미지 좌표: (${Math.round(originalX)}, ${Math.round(originalY)})`
    );
    console.log(
      `퍼센트 좌표: (${percentX.toFixed(2)}%, ${percentY.toFixed(2)}%)`
    );
    console.log(
      `버튼 위치 (위로 조정): (${percentX.toFixed(2)}%, ${buttonY.toFixed(2)}%)`
    );
    console.log(`표시 좌표: (${Math.round(clickX)}, ${Math.round(clickY)})`);
    console.log(`원본 이미지 크기: ${originalWidth} x ${originalHeight}`);
    console.log(`표시 이미지 크기: ${displayWidth} x ${displayHeight}`);
    console.log("====================");

    // 화면에 임시로 표시
    alert(
      `퍼센트 좌표: (${percentX.toFixed(2)}%, ${percentY.toFixed(2)}%)\n` +
        `버튼 위치 (위로 조정): (${percentX.toFixed(2)}%, ${buttonY.toFixed(
          2
        )}%)`
    );
  });

  console.log(
    "좌표 디버깅 모드 활성화: 지도 이미지를 클릭하면 좌표가 표시됩니다."
  );
}

// 창 크기 변경 시 버튼 위치 재조정
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    adjustButtonPositions();
  }, 250);
});
