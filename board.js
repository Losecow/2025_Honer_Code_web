// 게시판 데이터 관리
let posts = JSON.parse(localStorage.getItem("boardPosts")) || [];
let currentPage = 1;
const postsPerPage = 10;
let searchQuery = "";
let searchType = "title";

// 게시글 ID 카운터
let postIdCounter =
  parseInt(localStorage.getItem("postIdCounter")) || 1;

// 게시글 목록 렌더링
function renderPosts() {
  const boardTable = document.querySelector(".board-table");
  if (!boardTable) return;

  // 검색 필터링
  let filteredPosts = posts;
  if (searchQuery) {
    filteredPosts = posts.filter((post) => {
      if (searchType === "title") {
        return post.title.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchType === "author") {
        return post.author.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchType === "content") {
        return post.content.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
  }

  // 최신순 정렬
  filteredPosts = filteredPosts.sort((a, b) => b.id - a.id);

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // 테이블 헤더는 유지
  let html = `
    <div class="table-header">
      <div class="col-number">번호</div>
      <div class="col-title">제목</div>
      <div class="col-author">작성자</div>
      <div class="col-date">작성일</div>
      <div class="col-views">조회수</div>
    </div>
  `;

  if (paginatedPosts.length === 0) {
    html += `
      <div class="table-row empty-row">
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #999;">
          게시글이 없습니다.
        </div>
      </div>
    `;
  } else {
    paginatedPosts.forEach((post) => {
      const date = new Date(post.date);
      const formattedDate = `${date.getFullYear()}.${String(
        date.getMonth() + 1
      ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

      html += `
        <div class="table-row">
          <div class="col-number">${post.id}</div>
          <div class="col-title">
            <a href="#" class="post-link" data-id="${post.id}">${post.title}</a>
          </div>
          <div class="col-author">${post.author}</div>
          <div class="col-date">${formattedDate}</div>
          <div class="col-views">${post.views}</div>
        </div>
      `;
    });
  }

  boardTable.innerHTML = html;

  // 게시글 클릭 이벤트
  document.querySelectorAll(".post-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const postId = parseInt(link.getAttribute("data-id"));
      viewPost(postId);
    });
  });

  // 페이지네이션 렌더링
  renderPagination(totalPages);
}

// 페이지네이션 렌더링
function renderPagination(totalPages) {
  const pagination = document.querySelector(".pagination");
  if (!pagination) return;

  let html = "";

  // 이전 버튼
  html += `<button class="page-btn" ${currentPage === 1 ? "disabled" : ""}>이전</button>`;

  // 페이지 번호
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? "active" : ""}">${i}</button>`;
  }

  // 다음 버튼
  html += `<button class="page-btn" ${currentPage === totalPages ? "disabled" : ""}>다음</button>`;

  pagination.innerHTML = html;

  // 페이지네이션 이벤트
  pagination.querySelectorAll(".page-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (btn.textContent === "이전" && currentPage > 1) {
        currentPage--;
        renderPosts();
      } else if (btn.textContent === "다음" && currentPage < totalPages) {
        currentPage++;
        renderPosts();
      } else if (!isNaN(parseInt(btn.textContent))) {
        currentPage = parseInt(btn.textContent);
        renderPosts();
      }
    });
  });
}

// 글쓰기 모달 열기
window.openWriteModal = function () {
  const modal = document.getElementById("writeModal");
  if (modal) {
    modal.style.display = "flex";
    document.getElementById("postTitle").value = "";
    document.getElementById("postAuthor").value = "";
    document.getElementById("postContent").value = "";
  }
};

// 글쓰기 모달 닫기
window.closeWriteModal = function () {
  const modal = document.getElementById("writeModal");
  if (modal) {
    modal.style.display = "none";
  }
};

// 게시글 저장
window.savePost = function () {
  const title = document.getElementById("postTitle").value.trim();
  const author = document.getElementById("postAuthor").value.trim();
  const content = document.getElementById("postContent").value.trim();

  if (!title || !author || !content) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  const newPost = {
    id: postIdCounter++,
    title: title,
    author: author,
    content: content,
    date: new Date().toISOString(),
    views: 0,
  };

  posts.push(newPost);
  localStorage.setItem("boardPosts", JSON.stringify(posts));
  localStorage.setItem("postIdCounter", postIdCounter.toString());

  closeWriteModal();
  currentPage = 1;
  renderPosts();
};

// 게시글 상세 보기
function viewPost(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  // 조회수 증가
  post.views++;
  localStorage.setItem("boardPosts", JSON.stringify(posts));

  // 상세 보기 모달 열기
  const modal = document.getElementById("viewModal");
  const date = new Date(post.date);
  const formattedDate = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  document.getElementById("viewTitle").textContent = post.title;
  document.getElementById("viewAuthor").textContent = post.author;
  document.getElementById("viewDate").textContent = formattedDate;
  document.getElementById("viewViews").textContent = post.views;
  document.getElementById("viewContent").textContent = post.content;

  modal.style.display = "flex";
  renderPosts(); // 조회수 업데이트 반영
}

// 게시글 상세 보기 모달 닫기
window.closeViewModal = function () {
  const modal = document.getElementById("viewModal");
  if (modal) {
    modal.style.display = "none";
  }
};

// 검색 기능
function handleSearch() {
  const searchInput = document.querySelector(".search-input");
  const searchSelect = document.querySelector(".search-select");

  searchQuery = searchInput.value.trim();
  searchType = searchSelect.value;
  currentPage = 1;
  renderPosts();
}

// 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 글쓰기 버튼
  const writeBtn = document.querySelector(".write-btn");
  if (writeBtn) {
    writeBtn.addEventListener("click", window.openWriteModal);
  }

  // 검색 버튼
  const searchBtn = document.querySelector(".search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  // 검색 입력 엔터키
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (e) => {
    const writeModal = document.getElementById("writeModal");
    const viewModal = document.getElementById("viewModal");
    if (e.target === writeModal) {
      closeWriteModal();
    }
    if (e.target === viewModal) {
      closeViewModal();
    }
  });

  // 게시글 목록 렌더링
  renderPosts();
});

