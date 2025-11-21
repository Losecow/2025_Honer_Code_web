// 언어 데이터
const translations = {
  ko: {
    nav: {
      page1: "Page #1",
      page2: "Page #2",
      page3: "Page #3",
      page4: "Page #4",
    },
    hero: {
      title: "Honer Code",
      subtitle: "부제",
    },
  },
  en: {
    nav: {
      page1: "Page #1",
      page2: "Page #2",
      page3: "Page #3",
      page4: "Page #4",
    },
    hero: {
      title: "Honer Code",
      subtitle: "Subtitle here",
    },
  },
};

// 현재 언어 상태 (기본값: 한국어)
let currentLang = "ko";

// 언어 전환 함수
function changeLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  // 네비게이션 메뉴 업데이트
  const navLinks = document.querySelectorAll("nav a");
  if (navLinks.length >= 4) {
    navLinks[0].textContent = t.nav.page1;
    navLinks[1].textContent = t.nav.page2;
    navLinks[2].textContent = t.nav.page3;
    navLinks[3].textContent = t.nav.page4;
  }

  // 히어로 섹션 업데이트
  const heroTitle = document.querySelector(".hero h1");
  const heroSubtitle = document.querySelector(".hero p");
  if (heroTitle) heroTitle.textContent = t.hero.title;
  if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;

  // HTML lang 속성 업데이트
  document.documentElement.lang = lang;

  // 활성 언어 표시 업데이트
  updateLangDisplay();
}

// 언어 표시 업데이트
function updateLangDisplay() {
  const langSpans = document.querySelectorAll(".lang span");
  if (langSpans.length >= 2) {
    // 모든 span에서 active 클래스 제거
    langSpans.forEach((span) => span.classList.remove("active"));

    // 현재 언어에 active 클래스 추가
    if (currentLang === "ko") {
      langSpans[0].classList.add("active");
    } else {
      langSpans[1].classList.add("active");
    }
  }
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 언어 전환 버튼에 이벤트 리스너 추가
  const langSpans = document.querySelectorAll(".lang span");
  if (langSpans.length >= 2) {
    langSpans[0].addEventListener("click", () => changeLanguage("ko"));
    langSpans[1].addEventListener("click", () => changeLanguage("en"));
  }

  // 초기 언어 표시 설정
  updateLangDisplay();
});
