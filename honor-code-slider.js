// 아너코드 이미지 슬라이더
let currentSlide = 0;
let slideInterval;

const images = document.querySelectorAll(".slider-image");
const dots = document.querySelectorAll(".dot");
const totalSlides = images.length;

// 슬라이드 변경 함수
function showSlide(index) {
  // 모든 이미지와 도트에서 active 클래스 제거
  images.forEach((img) => img.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // 현재 슬라이드에 active 클래스 추가
  if (images[index]) {
    images[index].classList.add("active");
    // 이미지 이름 업데이트
    const imageName = images[index].getAttribute("data-name");
    const nameElement = document.getElementById("sliderImageName");
    if (nameElement && imageName) {
      nameElement.textContent = imageName;
    }
    // 출처 정보 업데이트
    const credit = images[index].getAttribute("data-credit");
    const creditLink = images[index].getAttribute("data-credit-link");
    const creditElement = document.getElementById("sliderImageCredit");
    if (creditElement) {
      if (credit && creditLink) {
        creditElement.innerHTML = `<a href="${creditLink}" target="_blank" rel="noopener noreferrer">${credit}</a>`;
        creditElement.style.display = "block";
      } else if (credit) {
        creditElement.textContent = credit;
        creditElement.style.display = "block";
      } else {
        creditElement.style.display = "none";
      }
    }
  }
  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

// 다음 슬라이드로 이동
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// 이전 슬라이드로 이동
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// 특정 슬라이드로 이동
function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
  resetInterval();
}

// 자동 슬라이드 시작
function startInterval() {
  slideInterval = setInterval(nextSlide, 1500); // 3초마다 변경
}

// 자동 슬라이드 중지
function stopInterval() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

// 자동 슬라이드 리셋
function resetInterval() {
  stopInterval();
  startInterval();
}

// 이미지 경로 설정 (한글 파일명 URL 인코딩 처리)
function setImageSources() {
  images.forEach((img) => {
    const src = img.getAttribute("data-src");
    if (src) {
      // 한글 파일명을 URL 인코딩하여 설정
      // 경로의 파일명 부분만 인코딩 (디렉토리는 그대로)
      const pathParts = src.split("/");
      const fileName = pathParts.pop();
      const encodedFileName = encodeURIComponent(fileName);
      const encodedPath = pathParts.length > 0 
        ? pathParts.join("/") + "/" + encodedFileName
        : encodedFileName;
      img.src = encodedPath;
    }
  });
}

// 초기화
document.addEventListener("DOMContentLoaded", function () {
  if (images.length > 0) {
    // 이미지 경로 설정 (한글 파일명 인코딩)
    setImageSources();
    
    // 첫 번째 이미지 표시
    showSlide(0);

    // 자동 슬라이드 시작
    startInterval();

    // 도트 클릭 이벤트
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });

    // 마우스 호버 시 자동 슬라이드 일시 정지
    const sliderContainer = document.querySelector(".image-slider");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopInterval);
      sliderContainer.addEventListener("mouseleave", startInterval);
    }
  }
});
