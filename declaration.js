// 정직 선언문 기능

let isDrawing = false;
let declarationCanvas, declarationCtx;
let hasSigned = false;

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  initDeclarationPage();
});

// 선언문 페이지 초기화
function initDeclarationPage() {
  // 날짜 자동 입력
  setCurrentDate();
  
  // Canvas 초기화
  initDeclarationCanvas();
  
  // 빈칸 필드 이벤트 리스너
  setupBlankFields();
  
  // 확인 버튼 활성화 체크
  setupFormValidation();
}

// 현재 날짜 설정
function setCurrentDate() {
  const dateField = document.getElementById("dateField");
  if (dateField) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    dateField.textContent = `${year}년 ${month}월 ${day}일`;
  }
}

// Canvas 초기화
function initDeclarationCanvas() {
  declarationCanvas = document.getElementById("declarationCanvas");
  if (!declarationCanvas) return;

  declarationCtx = declarationCanvas.getContext("2d");

  // Canvas 크기 설정
  declarationCanvas.width = 600;
  declarationCanvas.height = 200;

  // Canvas 스타일 설정
  declarationCtx.strokeStyle = "#1a1a1a";
  declarationCtx.lineWidth = 2;
  declarationCtx.lineCap = "round";
  declarationCtx.lineJoin = "round";

  // 이벤트 리스너 추가
  declarationCanvas.addEventListener("mousedown", startDeclarationDrawing);
  declarationCanvas.addEventListener("mousemove", drawDeclaration);
  declarationCanvas.addEventListener("mouseup", stopDeclarationDrawing);
  declarationCanvas.addEventListener("mouseout", stopDeclarationDrawing);

  // 터치 이벤트 (모바일 지원)
  declarationCanvas.addEventListener("touchstart", handleDeclarationTouch);
  declarationCanvas.addEventListener("touchmove", handleDeclarationTouch);
  declarationCanvas.addEventListener("touchend", stopDeclarationDrawing);
}

// 그리기 시작
function startDeclarationDrawing(e) {
  isDrawing = true;
  const rect = declarationCanvas.getBoundingClientRect();
  declarationCtx.beginPath();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  declarationCtx.moveTo(x, y);
  
  // 서명이 있으면 버튼 활성화
  checkButtonsEnabled();
}

// 그리기 중
function drawDeclaration(e) {
  if (!isDrawing) return;

  const rect = declarationCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  declarationCtx.lineTo(x, y);
  declarationCtx.stroke();
  
  // 서명이 있으면 버튼 활성화
  checkButtonsEnabled();
}

// 그리기 종료
function stopDeclarationDrawing() {
  if (isDrawing) {
    isDrawing = false;
    declarationCtx.beginPath();
    checkButtonsEnabled();
    saveDeclarationSignature();
  }
}

// 터치 이벤트 처리
function handleDeclarationTouch(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = declarationCanvas.getBoundingClientRect();
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
  declarationCanvas.dispatchEvent(mouseEvent);
}

// 선언문 서명 지우기
window.clearDeclarationSignature = function () {
  if (declarationCtx && declarationCanvas) {
    declarationCtx.clearRect(0, 0, declarationCanvas.width, declarationCanvas.height);
    hasSigned = false;
    checkButtonsEnabled();
  }
};

// 서명 존재 여부 확인
function checkSignatureExists() {
  if (!declarationCanvas || !declarationCtx) return false;

  const imageData = declarationCtx.getImageData(0, 0, declarationCanvas.width, declarationCanvas.height);
  const data = imageData.data;

  // 서명이 있는지 확인
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a > 0 && (r < 200 || g < 200 || b < 200)) {
      return true;
    }
  }

  return false;
}

// 버튼 활성화 체크
function checkButtonsEnabled() {
  hasSigned = checkSignatureExists();
  
  const nameField = document.getElementById("nameField");
  const studentIdInput = document.getElementById("studentIdInput");
  const majorInput = document.getElementById("majorInput");
  
  const name = nameField?.textContent.trim() || "";
  const studentId = studentIdInput?.value.trim() || "";
  const major = majorInput?.value.trim() || "";
  
  const isNameFilled = name !== "" && name !== "____________";
  const isFormComplete = isNameFilled && studentId !== "" && major !== "" && hasSigned;
  
  // 확인 버튼 활성화 (서명만 있으면 됨)
  const confirmBtn = document.getElementById("confirmBtn");
  if (confirmBtn) {
    confirmBtn.disabled = !hasSigned;
  }
  
  // PDF 버튼 활성화 (모든 필드 완료)
  const pdfBtn = document.getElementById("pdfDownloadBtn");
  if (pdfBtn) {
    pdfBtn.disabled = !isFormComplete;
  }
}

// 폼 검증 설정
function setupFormValidation() {
  const nameField = document.getElementById("nameField");
  const studentIdInput = document.getElementById("studentIdInput");
  const majorInput = document.getElementById("majorInput");
  
  // 이름 필드 변경 시
  if (nameField) {
    nameField.addEventListener("input", checkButtonsEnabled);
    nameField.addEventListener("blur", checkButtonsEnabled);
  }
  
  // 학번, 전공 입력 시
  if (studentIdInput) {
    studentIdInput.addEventListener("input", checkButtonsEnabled);
  }
  
  if (majorInput) {
    majorInput.addEventListener("input", checkButtonsEnabled);
  }
  
  // 서명 변경 시도 (주기적 체크)
  setInterval(checkButtonsEnabled, 1000);
}

// 서명 저장 (localStorage)
function saveDeclarationSignature() {
  if (!declarationCanvas || !hasSigned) return;

  // Canvas를 PNG 이미지로 변환 (투명 배경 포함)
  const signatureData = declarationCanvas.toDataURL("image/png");

  // localStorage에 저장 (메인 페이지 표시용)
  let signatures = JSON.parse(localStorage.getItem("signatures")) || [];
  const newSignature = {
    id: Date.now(),
    data: signatureData,
    timestamp: new Date().toISOString(),
  };

  signatures.push(newSignature);
  localStorage.setItem("signatures", JSON.stringify(signatures));
}

// 빈칸 필드 설정
function setupBlankFields() {
  const nameField = document.getElementById("nameField");
  
  if (nameField) {
    // 클릭 시 포커스
    nameField.addEventListener("click", function () {
      if (this.textContent.trim() === "____________") {
        this.textContent = "";
        this.focus();
      }
    });

    // 포커스 아웃 시 빈칸 체크
    nameField.addEventListener("blur", function () {
      if (this.textContent.trim() === "" || this.textContent.trim() === "____________") {
        this.textContent = "____________";
      }
      checkButtonsEnabled();
    });

    // Enter 키 방지 (줄바꿈 방지)
    nameField.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        this.blur();
      }
    });
  }
}

// 선언문 데이터 가져오기
function getDeclarationData() {
  const nameField = document.getElementById("nameField");
  const studentIdInput = document.getElementById("studentIdInput");
  const majorInput = document.getElementById("majorInput");
  const dateField = document.getElementById("dateField");

  return {
    name: nameField?.textContent.trim() || "",
    studentId: studentIdInput?.value.trim() || "",
    major: majorInput?.value.trim() || "",
    date: dateField?.textContent.trim() || "",
    signature: declarationCanvas?.toDataURL("image/png") || "",
  };
}

// 확인 버튼 클릭 (메인 페이지로 이동)
window.confirmDeclaration = function () {
  if (!hasSigned) {
    alert("서명을 작성해주세요.");
    return;
  }

  // 서명 저장 (이미 저장되어 있지만 재확인)
  saveDeclarationSignature();
  
  // 메인 페이지로 이동
  window.location.href = "index.html";
};

// PDF 다운로드 - html2canvas를 사용해서 한글 텍스트 렌더링
window.downloadPDF = function () {
  // 모든 필드 채워졌는지 확인
  const data = getDeclarationData();
  
  if (!data.name || data.name === "____________") {
    alert("이름을 입력해주세요.");
    return;
  }
  
  if (!data.studentId) {
    alert("학번을 입력해주세요.");
    return;
  }
  
  if (!data.major) {
    alert("전공을 입력해주세요.");
    return;
  }
  
  if (!hasSigned) {
    alert("서명을 작성해주세요.");
    return;
  }

  // html2canvas 라이브러리가 로드되었는지 확인
  if (typeof html2canvas === "undefined") {
    alert("PDF 생성 기능을 초기화하는 중입니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  const declarationContainer = document.querySelector(".declaration-container");
  if (!declarationContainer) {
    alert("선언문을 찾을 수 없습니다.");
    return;
  }

  // PDF 생성 중 표시
  const pdfBtn = document.getElementById("pdfDownloadBtn");
  if (pdfBtn) {
    pdfBtn.disabled = true;
    pdfBtn.textContent = "PDF 생성 중...";
  }

  // html2canvas로 선언문 컨테이너를 이미지로 변환
  html2canvas(declarationContainer, {
    scale: 2, // 고해상도
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    onclone: function(clonedDoc) {
      // 복제된 문서에서 버튼들을 숨김
      const clonedContainer = clonedDoc.querySelector(".declaration-container");
      if (clonedContainer) {
        const actionButtons = clonedContainer.querySelector(".declaration-actions");
        if (actionButtons) {
          actionButtons.style.display = "none";
        }
      }
    }
  }).then(function(canvas) {
    // Canvas를 이미지로 변환
    const imgData = canvas.toDataURL("image/png");
    
    // jsPDF 라이브러리 사용
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    // 이미지가 한 페이지보다 크면 여러 페이지로 나누기
    let heightLeft = imgHeight;
    let position = 0;

    // 첫 페이지에 이미지 추가
    doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 나머지 페이지 추가
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // PDF 저장
    const fileName = `정직선언문_${data.name}_${data.date.replace(/\s/g, "_")}.pdf`;
    doc.save(fileName);

    // 버튼 복원
    if (pdfBtn) {
      pdfBtn.disabled = false;
      pdfBtn.textContent = "PDF 다운로드";
    }
  }).catch(function(error) {
    console.error("PDF 생성 오류:", error);
    alert("PDF 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    
    // 버튼 복원
    if (pdfBtn) {
      pdfBtn.disabled = false;
      pdfBtn.textContent = "PDF 다운로드";
    }
  });
};
