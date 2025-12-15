// 하드코딩 번역 데이터
function translateNameLine(el, lang) {
  const nameField =
    el.querySelector("#nameField") || el.querySelector(".name-field");
  if (!el.dataset.originalStructure && el.innerHTML) {
    el.dataset.originalStructure = el.innerHTML;
  }
  if (nameField && !nameField.dataset.originalPlaceholder) {
    nameField.dataset.originalPlaceholder =
      nameField.getAttribute("placeholder") || "";
  }

  if (!nameField) {
    // fallback: just restore or set simple text
    if (lang === "ko" && el.dataset.originalStructure) {
      el.innerHTML = el.dataset.originalStructure;
    } else {
      el.textContent = lang === "en" ? "I, ______, hereby" : el.textContent;
    }
    return;
  }

  const placeholderKo =
    nameField.dataset.originalPlaceholder ||
    nameField.getAttribute("placeholder") ||
    "";
  const placeholderEn = "Name";

  // preserve existing element to keep 이벤트 핸들러
  nameField.setAttribute(
    "placeholder",
    lang === "en" ? placeholderEn : placeholderKo
  );

  // 재배치
  nameField.remove();
  el.textContent = "";
  if (lang === "en") {
    el.append("I, ");
    el.appendChild(nameField);
    el.append(", hereby");
  } else {
    el.append("나 ");
    el.appendChild(nameField);
    el.append("은(는)");
  }
}

function makePrefixTranslator(enText) {
  return function (el, lang) {
    if (!el.dataset.originalPrefix) {
      el.dataset.originalPrefix =
        el.childNodes[0]?.textContent || el.textContent || "";
    }
    const prefix = lang === "en" ? enText : el.dataset.originalPrefix;
    if (el.firstChild) {
      el.firstChild.textContent = prefix;
    } else {
      el.textContent = prefix;
    }
  };
}

const translationEntries = {
  common: [
    { selector: 'nav a[href="page1.html"]', type: "text", en: "Honor Pledge" },
    { selector: 'nav a[href="page2.html"]', type: "text", en: "Servant Map" },
    { selector: 'nav a[href="page3.html"]', type: "text", en: "Honor Board" },
    {
      selector: 'nav a[href="page4.html"]',
      type: "text",
      en: "Honor Level Test",
    },
    { selector: ".lang span:first-child", type: "text", en: "KOR" },
    { selector: ".lang span:last-child", type: "text", en: "ENG" },
  ],
  index: [
    { selector: ".hero h1", type: "text", en: "Honor Code" },
    {
      selector: ".hero p",
      type: "text",
      en: "Honest and responsible Handong community",
    },
    { selector: "#signatureBtn", type: "text", en: "Sign" },
    {
      selector: ".verse-text",
      type: "text",
      en: '"Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will."',
    },
    { selector: ".verse-reference", type: "text", en: "[Romans 12:2]" },
    {
      selector: ".honor-code-title",
      type: "text",
      en: "What is the Honor Code?",
    },
    {
      selector: ".honor-code-text",
      type: "text",
      en: "The Honor Code, also known as the Handong Honor System, is a proud culture established voluntarily by Handong members since the university’s founding in 1995. It is a commitment before God, others, and oneself to uphold honesty and responsibility in daily life.",
    },
    {
      selector: ".copyright-notice",
      type: "text",
      en: "Some images on this page are captured from YouTube videos, and all copyrights belong to the original creators.",
    },
  ],
  page1: [
    { selector: ".declaration-header h2", type: "text", en: "Honor Pledge" },
    {
      selector: ".declaration-text:nth-of-type(1)",
      type: "custom",
      apply: translateNameLine,
    },
    {
      selector: ".declaration-text:nth-of-type(2)",
      type: "text",
      en: "as a member of Handong Global University, will uphold honesty and responsibility,",
    },
    {
      selector: ".declaration-text:nth-of-type(3)",
      type: "text",
      en: "and practice the spirit of the Honor Code in my daily life.",
    },
    {
      selector: ".declaration-text:nth-of-type(4)",
      type: "text",
      en: "I will not engage in cheating, proxy actions, plagiarism, or any behavior that undermines the trust of our community in any academic activity.",
    },
    {
      selector: ".declaration-text:nth-of-type(5)",
      type: "text",
      en: "I remember that honest choices keep our community healthy,",
    },
    {
      selector: ".declaration-text:nth-of-type(6)",
      type: "text",
      en: "and I will respect the efforts of my peers and choose actions that are not shameful before myself.",
    },
    { selector: 'label[for="studentIdInput"]', type: "text", en: "Student ID" },
    {
      selector: "#studentIdInput",
      type: "placeholder",
      en: "Enter student ID",
    },
    { selector: 'label[for="majorInput"]', type: "text", en: "Major" },
    {
      selector: "#majorInput",
      type: "placeholder",
      en: "Enter your major",
    },
    { selector: ".signature-section h3", type: "text", en: "Signature" },
    { selector: ".clear-btn", type: "text", en: "Clear" },
    { selector: "#confirmBtn", type: "text", en: "Confirm" },
    { selector: "#pdfDownloadBtn", type: "text", en: "Download PDF" },
  ],
  page2: [
    { selector: "#locationTitle", type: "text", en: "Location Info" },
    { selector: ".close-btn-modal", type: "text", en: "Close" },
    { selector: ".modal-header .close-btn", type: "text", en: "×" },
  ],
  page3: [
    { selector: ".board-header h1", type: "text", en: "Honor Board" },
    { selector: ".write-btn", type: "text", en: "Write Post" },
    {
      selector: '.search-select option[value="title"]',
      type: "text",
      en: "Title",
    },
    {
      selector: '.search-select option[value="author"]',
      type: "text",
      en: "Author",
    },
    {
      selector: '.search-select option[value="content"]',
      type: "text",
      en: "Content",
    },
    {
      selector: ".search-input",
      type: "placeholder",
      en: "Enter search keyword",
    },
    { selector: ".search-btn", type: "text", en: "Search" },
    {
      selector: "#writeModal .modal-header h2",
      type: "text",
      en: "Write Post",
    },
    {
      selector: '#writeModal label[for="postTitle"]',
      type: "text",
      en: "Title",
    },
    {
      selector: "#postTitle",
      type: "placeholder",
      en: "Enter the title",
    },
    {
      selector: '#writeModal label[for="postAuthor"]',
      type: "text",
      en: "Author",
    },
    {
      selector: "#postAuthor",
      type: "placeholder",
      en: "Enter the author",
    },
    {
      selector: "#writeModal .checkbox-label span",
      type: "text",
      en: "Post anonymously",
    },
    {
      selector: '#writeModal label[for="postContent"]',
      type: "text",
      en: "Content",
    },
    {
      selector: "#postContent",
      type: "placeholder",
      en: "Enter the content",
    },
    { selector: "#writeModal .cancel-btn", type: "text", en: "Cancel" },
    { selector: "#writeModal .submit-btn", type: "text", en: "Submit" },
    {
      selector: "#viewModal .post-info span:nth-child(1)",
      type: "custom",
      apply: makePrefixTranslator("Author: "),
    },
    {
      selector: "#viewModal .post-info span:nth-child(2)",
      type: "custom",
      apply: makePrefixTranslator("Date: "),
    },
    {
      selector: "#viewModal .post-info span:nth-child(3)",
      type: "custom",
      apply: makePrefixTranslator("Views: "),
    },
    {
      selector: "#viewModal .post-info span:nth-child(4)",
      type: "custom",
      apply: makePrefixTranslator("Likes: "),
    },
    { selector: "#likeBtn", type: "text", en: "🤍 Like" },
    {
      selector: ".comments-title",
      type: "custom",
      apply: makePrefixTranslator("Comments ("),
    },
    {
      selector: '#viewModal label[for="commentAuthor"]',
      type: "text",
      en: "Author",
    },
    {
      selector: "#commentAuthor",
      type: "placeholder",
      en: "Enter the author",
    },
    {
      selector: "#viewModal .checkbox-label span",
      type: "text",
      en: "Post anonymously",
    },
    {
      selector: '#viewModal label[for="commentContent"]',
      type: "text",
      en: "Comment",
    },
    {
      selector: "#commentContent",
      type: "placeholder",
      en: "Enter a comment",
    },
    { selector: "#commentSubmitBtn", type: "text", en: "Submit Comment" },
    { selector: "#viewModal .close-btn-modal", type: "text", en: "Close" },
  ],
  page4: [
    { selector: ".quiz-title", type: "text", en: "Honor Level Test" },
    {
      selector: ".quiz-subtitle",
      type: "html",
      en: "How high is your honor level?<br />Check your integrity with the Honor Level Test!",
    },
    {
      selector: ".info-item:nth-child(1) .info-text",
      type: "text",
      en: "The Honor Code is not just a rule—it is a culture built on small daily choices that show our integrity.",
    },
    {
      selector: ".info-item:nth-child(2) .info-text",
      type: "text",
      en: "This test examines your choices in real-life situations like dorms, exams, money, chapel, and study rooms.",
    },
    {
      selector: ".info-item:nth-child(3) .info-text",
      type: "text",
      en: "Results include personalized advice and practical guides you can apply right away.",
    },
    { selector: ".quiz-start-btn", type: "text", en: "Start" },
    { selector: "#quizResult .quiz-title", type: "text", en: "Result" },
    { selector: "#quizResult h3:nth-of-type(1)", type: "text", en: "Traits" },
    { selector: "#quizResult h3:nth-of-type(2)", type: "text", en: "Advice" },
    { selector: "#quizResult .quiz-start-btn", type: "text", en: "Restart" },
  ],
};

let currentLang = "ko";

const navTextMap = {
  "page1.html": { ko: "명예서약서", en: "Honor Pledge" },
  "page2.html": { ko: "섬김이 지도", en: "Servant Map" },
  "page3.html": { ko: "명예 게시판", en: "Honor Board" },
  "page4.html": { ko: "아너 레벨 테스트", en: "Honor Level Test" },
  // Netlify에서 /page1.html 식으로 변형될 수 있으므로 basename 기준으로 매칭
};

function normalizeHref(href) {
  if (!href) return "";
  try {
    const u = new URL(href, window.location.href);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || "";
  } catch (e) {
    return href.replace(/^\.?\//, "");
  }
}

function applyNavTexts(lang) {
  // 방법 1: href로 찾기
  const navLinks = Array.from(document.querySelectorAll("nav a"));
  navLinks.forEach((el) => {
    const href = normalizeHref(el.getAttribute("href"));
    const textObj = navTextMap[href];
    if (textObj) {
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.textContent.trim();
      }
      if (lang === "en") {
        el.textContent = textObj.en;
      } else {
        el.textContent = el.dataset.originalText || textObj.ko;
      }
      return;
    }
  });

  // 방법 2: 텍스트로 직접 찾기 (href 매칭 실패 시)
  navLinks.forEach((el) => {
    const currentText = el.textContent.trim();
    for (const [key, textObj] of Object.entries(navTextMap)) {
      if (currentText === textObj.ko || currentText === textObj.en) {
        if (!el.dataset.originalText) {
          el.dataset.originalText = textObj.ko;
        }
        if (lang === "en") {
          el.textContent = textObj.en;
        } else {
          el.textContent = el.dataset.originalText || textObj.ko;
        }
        break;
      }
    }
  });

  // 방법 3: 순서대로 매칭 (마지막 수단)
  const navLinksOrdered = Array.from(document.querySelectorAll("nav a"));
  const navKeys = ["page1.html", "page2.html", "page3.html", "page4.html"];
  navLinksOrdered.forEach((el, index) => {
    if (index < navKeys.length) {
      const textObj = navTextMap[navKeys[index]];
      if (textObj) {
        if (!el.dataset.originalText) {
          el.dataset.originalText = el.textContent.trim() || textObj.ko;
        }
        if (lang === "en") {
          el.textContent = textObj.en;
        } else {
          el.textContent = el.dataset.originalText || textObj.ko;
        }
      }
    }
  });

  const langSpans = document.querySelectorAll(".lang span");
  if (langSpans.length >= 2) {
    langSpans[0].textContent = "KOR";
    langSpans[1].textContent = "ENG";
  }
}

function getPageKey() {
  const path = window.location.pathname;
  if (path.includes("page1")) return "page1";
  if (path.includes("page2")) return "page2";
  if (path.includes("page3")) return "page3";
  if (path.includes("page4")) return "page4";
  return "index";
}

function storeOriginal(el, type) {
  const keyMap = {
    text: "originalText",
    html: "originalHtml",
    placeholder: "originalPlaceholder",
    value: "originalValue",
  };
  const dataKey = keyMap[type] || "originalText";
  if (el.dataset[dataKey]) return;

  switch (type) {
    case "html":
      el.dataset[dataKey] = el.innerHTML;
      break;
    case "placeholder":
      el.dataset[dataKey] = el.getAttribute("placeholder") || "";
      break;
    case "value":
      el.dataset[dataKey] = el.value || "";
      break;
    default:
      el.dataset[dataKey] = el.textContent;
  }
}

function restoreOriginal(el, type) {
  const keyMap = {
    text: "originalText",
    html: "originalHtml",
    placeholder: "originalPlaceholder",
    value: "originalValue",
  };
  const dataKey = keyMap[type] || "originalText";
  if (!el.dataset[dataKey]) return;

  switch (type) {
    case "html":
      el.innerHTML = el.dataset[dataKey];
      break;
    case "placeholder":
      el.setAttribute("placeholder", el.dataset[dataKey]);
      break;
    case "value":
      el.value = el.dataset[dataKey];
      break;
    default:
      el.textContent = el.dataset[dataKey];
  }
}

function applyTranslations(lang) {
  const pageKey = getPageKey();
  const targets = [
    ...(translationEntries.common || []),
    ...(translationEntries[pageKey] || []),
  ];

  targets.forEach((entry) => {
    const type = entry.type || "text";
    const nodes = document.querySelectorAll(entry.selector);
    nodes.forEach((el) => {
      if (typeof entry.apply === "function") {
        entry.apply(el, lang);
        return;
      }
      storeOriginal(el, type);
      if (lang === "ko") {
        restoreOriginal(el, type);
        return;
      }
      const value = entry.en;
      if (value === undefined) return;
      if (type === "html") {
        el.innerHTML = value;
      } else if (type === "placeholder") {
        el.setAttribute("placeholder", value);
      } else if (type === "value") {
        el.value = value;
      } else {
        el.textContent = value;
      }
    });
  });
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("preferredLanguage", lang);

  if (lang === "ko") {
    applyTranslations("ko");
  } else {
    applyTranslations("en");
  }

  // 네비게이션 텍스트 적용 (즉시 + 지연 후 재시도)
  applyNavTexts(lang);
  setTimeout(() => applyNavTexts(lang), 100);
  setTimeout(() => applyNavTexts(lang), 500);

  if (typeof updateMapTranslations === "function") {
    updateMapTranslations(lang);
  }
  if (typeof updateQuizTranslations === "function") {
    updateQuizTranslations(lang);
  }
  if (typeof updateBoardTranslations === "function") {
    updateBoardTranslations(lang);
  }

  document.documentElement.lang = lang;
  updateLangDisplay();
}

function updateLangDisplay() {
  const langSpans = document.querySelectorAll(".lang span");
  langSpans.forEach((span) => span.classList.remove("active"));
  if (langSpans.length >= 2) {
    if (currentLang === "ko") {
      langSpans[0].classList.add("active");
    } else {
      langSpans[1].classList.add("active");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const langSpans = document.querySelectorAll(".lang span");
  if (langSpans.length >= 2) {
    langSpans[0].addEventListener("click", () => changeLanguage("ko"));
    langSpans[1].addEventListener("click", () => changeLanguage("en"));
  }

  const savedLang = localStorage.getItem("preferredLanguage") || "ko";
  currentLang = savedLang;
  changeLanguage(savedLang);
  updateLangDisplay();

  // DOMContentLoaded 후에도 한 번 더 확인
  setTimeout(() => applyNavTexts(currentLang), 200);
});

// window.load 이벤트에서도 한 번 더 확인 (모든 리소스 로드 완료 후)
window.addEventListener("load", function () {
  if (currentLang) {
    setTimeout(() => applyNavTexts(currentLang), 100);
  }
});
