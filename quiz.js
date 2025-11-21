// 퀴즈 데이터 및 로직

// 퀴즈 질문 데이터
const quizQuestions = [
  {
    question: "기숙사 휴게실 쓰레기통이 넘치려고 한다! 이 때 당신의 행동은?",
    answers: [
      "나 말고 누군가가 하겠지~ 흐린 눈 하며 쓰레기를 욱여넣는다.",
      "다음 사람이 편하게 쓸 수만 있다면 내 손이 더러워지는 것쯤은 괜찮아. 자진해서 쓰레기통을 비운다.",
    ],
    scores: { typeA: 0, typeB: 1 }, // typeA: 양심적, typeB: 비양심적
  },
  {
    question:
      "무감독 시험 중, 누군가가 챗GPT를 이용해 컨닝을 하고있는 걸 발견했다! 이 때 당신의 행동은?",
    answers: [
      "어짜피 무감독 시험이겠다, 저 사람도 컨닝하니까 나도 해야지! 바로 챗GPT를 실행한다.",
      "스스로 다짐한 아너코드를 어길 수 없다! 꿋꿋하게 컨닝하지 않고 시험을 치른다.",
    ],
    scores: { typeA: 0, typeB: 1 },
  },
  {
    question: "매점 앞에 10,000원짜리 지폐가 떨어져있다! 이 때 당신의 행동은?",
    answers: [
      "꽁돈 나이스~ 주변을 살피고 아무도 없을 때 스윽 가져간다.",
      "누군가 잃어버린 소중한 돈, 에타에 이 사실을 널리 알려 주인을 찾을 수 있도록 한다.",
    ],
    scores: { typeA: 0, typeB: 1 },
  },
  {
    question:
      "16주차, 시험 공부 때문에 채플에 결석하려고 보니까 이미 결석을 2번 해버렸다. 한 번이라도 더 결석하면 F인 상황! 이때 당신의 행동은?",
    answers: [
      "친구에게 한동 스마트캠퍼스 앱 아이디/비밀번호 바로 공유~! 대리출석을 부탁한다.",
      "대리출석이나 출튀는 용납할 수 없다. 그냥 가서 채플을 드리고 공부한다.",
    ],
    scores: { typeA: 0, typeB: 1 },
  },
  {
    question:
      "시험기간, 열람실 사용 중 잠시 자리를 비워야한다. 언제 돌아올 지는 잘 모르겠는데… 이 때 당신의 행동은?",
    answers: [
      "시험기간이라 다시 자리 잡기도 힘들고, 금방 돌아올 것 같으니 일단 자리를 맡아두고 나갔다 온다.",
      "열람실을 사용하려는 사람이 많으니 자리를 비워야 할 때는 자리에 짐을 치워 다른 사람에게 자리를 양보한다.",
    ],
    scores: { typeA: 0, typeB: 1 },
  },
];

// 결과 데이터
const quizResults = {
  typeA: {
    type: "양심형",
    description: "당신은 아너코드를 실천하는 양심적인 사람입니다.",
    features: [
      "자신이 약속한 원칙을 지키려고 노력합니다",
      "다른 사람을 배려하고 신뢰를 중요시합니다",
      "어려운 상황에서도 정직함을 유지합니다",
    ],
    advice:
      "당신의 양심과 정직함은 주변 사람들에게 좋은 영향을 미칩니다. 때로는 어려울 수 있지만, 계속해서 아너코드를 실천해주세요. 당신의 행동이 세상을 더 좋은 곳으로 만듭니다.",
  },
  typeB: {
    type: "성장 필요형",
    description: "당신은 아직 아너코드 실천에 있어 성장의 여지가 있습니다.",
    features: [
      "편의를 선택하는 경향이 있습니다",
      "상황에 따라 원칙을 유연하게 적용합니다",
      "다른 사람보다 자신의 이익을 우선시합니다",
    ],
    advice:
      "아너코드를 완벽하게 실천하는 것은 어려운 일입니다. 하지만 작은 것부터 시작해보세요. 쓰레기통을 비우고, 정직하게 시험을 보고, 남의 것을 찾아주는 것부터 시작하면 됩니다. 성장하는 과정이 중요합니다.",
  },
};

// 퀴즈 상태
let currentQuestionIndex = 0;
let userAnswers = [];
let totalScore = 0;

// 퀴즈 시작
function startQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  totalScore = 0;

  // 소개 페이지 숨기기
  document.getElementById("quizIntro").style.display = "none";
  // 퀴즈 페이지 보이기
  document.getElementById("quizQuestions").style.display = "block";
  // 결과 페이지 숨기기
  document.getElementById("quizResult").style.display = "none";

  // 첫 번째 질문 표시
  displayQuestion();
}

// 질문 표시
function displayQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  // 진행률 업데이트
  document.getElementById("currentQuestion").textContent =
    currentQuestionIndex + 1;
  document.getElementById("totalQuestions").textContent = totalQuestions;

  // 질문 텍스트
  document.getElementById("questionText").textContent = question.question;

  // 답안 옵션
  document.getElementById("answerText1").textContent = question.answers[0];
  document.getElementById("answerText2").textContent = question.answers[1];

  // 버튼 초기화
  document.getElementById("answer1").classList.remove("selected");
  document.getElementById("answer2").classList.remove("selected");
}

// 답안 선택
function selectAnswer(answerIndex) {
  // 선택된 버튼 표시
  document.getElementById("answer1").classList.remove("selected");
  document.getElementById("answer2").classList.remove("selected");
  document.getElementById(`answer${answerIndex + 1}`).classList.add("selected");

  // 답안 저장
  const question = quizQuestions[currentQuestionIndex];
  userAnswers.push({
    questionIndex: currentQuestionIndex,
    answerIndex: answerIndex,
  });

  // 점수 계산 (두 번째 선택지 = 양심적 선택 시 점수 증가)
  if (answerIndex === 1) {
    totalScore += 1; // 양심적 선택 시 점수 증가
  }

  // 잠시 후 다음 질문으로 이동
  setTimeout(() => {
    nextQuestion();
  }, 500);
}

// 다음 질문으로 이동
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// 결과 표시
function showResult() {
  // 퀴즈 페이지 숨기기
  document.getElementById("quizQuestions").style.display = "none";
  // 결과 페이지 보이기
  document.getElementById("quizResult").style.display = "block";

  // 결과 계산
  const totalQuestions = quizQuestions.length;
  const typeAScore = totalScore; // 양심적 선택 점수
  const typeBScore = totalQuestions - totalScore;

  // 결과 타입 결정 (양심적 선택이 3개 이상이면 typeA)
  const resultType = typeAScore >= 3 ? "typeA" : "typeB";
  const result = quizResults[resultType];

  // 결과 표시
  document.getElementById("resultType").textContent = result.type;
  document.getElementById("resultDescription").textContent = result.description;

  // 특징 표시
  const featuresList = document.getElementById("resultFeatures");
  featuresList.innerHTML = "";
  result.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  // 조언 표시
  document.getElementById("resultAdvice").textContent = result.advice;
}

// 퀴즈 다시 시작
function restartQuiz() {
  startQuiz();
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 초기 상태 설정
  document.getElementById("quizIntro").style.display = "block";
  document.getElementById("quizQuestions").style.display = "none";
  document.getElementById("quizResult").style.display = "none";
});
