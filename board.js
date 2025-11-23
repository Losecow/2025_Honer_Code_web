// 게시판 데이터 관리
let posts = JSON.parse(localStorage.getItem("boardPosts")) || [];
let currentPage = 1;
const postsPerPage = 10;
let searchQuery = "";
let searchType = "title";

// 게시글 ID 카운터
let postIdCounter = parseInt(localStorage.getItem("postIdCounter")) || 1;

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

  // 카드 형태로 변경
  let html = "";

  if (paginatedPosts.length === 0) {
    html += `
      <div class="post-card empty-card">
        <div style="text-align: center; padding: 40px; color: #999;">
          게시글이 없습니다.
        </div>
      </div>
    `;
  } else {
    paginatedPosts.forEach((post) => {
      const date = new Date(post.date);
      const formattedTime = `${String(date.getHours()).padStart(
        2,
        "0"
      )}:${String(date.getMinutes()).padStart(2, "0")}`;

      // 기존 게시글에 좋아요와 댓글 필드가 없으면 초기화
      if (post.likes === undefined) post.likes = 0;
      if (post.likedBy === undefined) post.likedBy = [];
      if (post.comments === undefined) post.comments = [];

      html += `
        <div class="post-card">
          <div class="post-content-text">
            <a href="#" class="post-link" data-id="${post.id}">${post.title}</a>
          </div>
          <div class="post-meta">
            ${
              post.comments.length > 0
                ? `<span class="comment-badge">💬 ${post.comments.length}</span>`
                : ""
            }
            ${
              post.likes > 0
                ? `<span class="like-badge">❤️ ${post.likes}</span>`
                : ""
            }
            <span class="post-time">${formattedTime}</span>
            <span class="post-author">${post.author}</span>
          </div>
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
  html += `<button class="page-btn" ${
    currentPage === 1 ? "disabled" : ""
  }>이전</button>`;

  // 페이지 번호
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${
      i === currentPage ? "active" : ""
    }">${i}</button>`;
  }

  // 다음 버튼
  html += `<button class="page-btn" ${
    currentPage === totalPages ? "disabled" : ""
  }>다음</button>`;

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
function openWriteModal() {
  const modal = document.getElementById("writeModal");
  if (modal) {
    modal.style.display = "flex";
    const titleInput = document.getElementById("postTitle");
    const authorInput = document.getElementById("postAuthor");
    const contentInput = document.getElementById("postContent");
    const anonymousCheckbox = document.getElementById("postAnonymous");
    if (titleInput) titleInput.value = "";
    if (authorInput) {
      authorInput.value = "";
      authorInput.disabled = false;
      authorInput.placeholder = "작성자를 입력하세요";
    }
    if (contentInput) contentInput.value = "";
    if (anonymousCheckbox) anonymousCheckbox.checked = false;
  }
}

// 전역 스코프에도 등록
window.openWriteModal = openWriteModal;

// 익명 체크박스에 따라 작성자 입력 필드 활성화/비활성화
window.toggleAuthorInput = function (type) {
  const isPost = type === "post";
  const authorInput = document.getElementById(
    isPost ? "postAuthor" : "commentAuthor"
  );
  const anonymousCheckbox = document.getElementById(
    isPost ? "postAnonymous" : "commentAnonymous"
  );

  if (authorInput && anonymousCheckbox) {
    if (anonymousCheckbox.checked) {
      authorInput.disabled = true;
      authorInput.value = "";
      authorInput.placeholder = "익명으로 작성됩니다";
    } else {
      authorInput.disabled = false;
      authorInput.placeholder = "작성자를 입력하세요";
    }
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
  const authorInput = document.getElementById("postAuthor");
  const author = authorInput ? authorInput.value.trim() : "";
  const content = document.getElementById("postContent").value.trim();
  const isAnonymous =
    document.getElementById("postAnonymous")?.checked || false;

  // 익명이 아닐 때만 작성자 필수 체크
  if (!title || (!isAnonymous && !author) || !content) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  const finalAuthor = isAnonymous ? "익명" : author;

  const newPost = {
    id: postIdCounter++,
    title: title,
    author: finalAuthor,
    content: content,
    date: new Date().toISOString(),
    views: 0,
    likes: 0,
    likedBy: [], // 좋아요한 사용자 목록
    comments: [], // 댓글 배열
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

  // 기존 게시글에 좋아요와 댓글 필드가 없으면 초기화
  if (post.likes === undefined) post.likes = 0;
  if (post.likedBy === undefined) post.likedBy = [];
  if (post.comments === undefined) post.comments = [];

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

  // 좋아요 버튼 업데이트
  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");
  if (likeBtn && likeCount) {
    likeCount.textContent = post.likes || 0;
    const currentUser = getCurrentUser(); // 현재 사용자 식별자
    if (post.likedBy && post.likedBy.includes(currentUser)) {
      likeBtn.classList.add("liked");
      likeBtn.textContent = "❤️ 좋아요 취소";
    } else {
      likeBtn.classList.remove("liked");
      likeBtn.textContent = "🤍 좋아요";
    }
    likeBtn.setAttribute("data-post-id", postId);
  }

  // 댓글 렌더링
  renderComments(postId);

  // 댓글 수 업데이트
  const commentsCount = document.getElementById("commentsCount");
  if (commentsCount) {
    commentsCount.textContent = post.comments.length;
  }

  modal.style.display = "flex";
  renderPosts(); // 조회수 업데이트 반영
}

// 현재 사용자 식별자 가져오기 (간단한 방법: 브라우저 식별자)
function getCurrentUser() {
  let userId = localStorage.getItem("boardUserId");
  if (!userId) {
    userId =
      "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("boardUserId", userId);
  }
  return userId;
}

// 좋아요 토글
window.toggleLike = function () {
  if (!currentViewPostId) {
    alert("게시글을 먼저 열어주세요.");
    return;
  }

  const post = posts.find((p) => p.id === currentViewPostId);
  if (!post) return;

  if (post.likes === undefined) post.likes = 0;
  if (post.likedBy === undefined) post.likedBy = [];

  const currentUser = getCurrentUser();
  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");

  if (post.likedBy.includes(currentUser)) {
    // 좋아요 취소
    post.likes--;
    post.likedBy = post.likedBy.filter((user) => user !== currentUser);
    if (likeBtn) {
      likeBtn.classList.remove("liked");
      likeBtn.textContent = "🤍 좋아요";
    }
  } else {
    // 좋아요 추가
    post.likes++;
    post.likedBy.push(currentUser);
    if (likeBtn) {
      likeBtn.classList.add("liked");
      likeBtn.textContent = "❤️ 좋아요 취소";
    }
  }

  if (likeCount) {
    likeCount.textContent = post.likes;
  }

  localStorage.setItem("boardPosts", JSON.stringify(posts));

  renderPosts(); // 목록의 좋아요 수 업데이트
};

// 댓글 렌더링
function renderComments(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  if (post.comments === undefined) post.comments = [];

  const commentsContainer = document.getElementById("commentsContainer");
  if (!commentsContainer) return;

  let html = "";

  if (post.comments.length === 0) {
    html =
      '<div class="no-comments">댓글이 없습니다. 첫 댓글을 작성해보세요!</div>';
  } else {
    post.comments.forEach((comment, index) => {
      const commentDate = new Date(comment.date);
      const formattedCommentDate = `${commentDate.getFullYear()}.${String(
        commentDate.getMonth() + 1
      ).padStart(2, "0")}.${String(commentDate.getDate()).padStart(
        2,
        "0"
      )} ${String(commentDate.getHours()).padStart(2, "0")}:${String(
        commentDate.getMinutes()
      ).padStart(2, "0")}`;

      html += `
        <div class="comment-item">
          <div class="comment-header">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-date">${formattedCommentDate}</span>
          </div>
          <div class="comment-content">${comment.content}</div>
        </div>
      `;
    });
  }

  commentsContainer.innerHTML = html;
}

// 현재 열려있는 게시글 ID 저장
let currentViewPostId = null;

// 게시글 상세 보기
function viewPost(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  // 현재 열려있는 게시글 ID 저장
  currentViewPostId = postId;

  // 기존 게시글에 좋아요와 댓글 필드가 없으면 초기화
  if (post.likes === undefined) post.likes = 0;
  if (post.likedBy === undefined) post.likedBy = [];
  if (post.comments === undefined) post.comments = [];

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

  // 좋아요 버튼 업데이트
  const likeBtn = document.getElementById("likeBtn");
  const likeCount = document.getElementById("likeCount");
  if (likeBtn && likeCount) {
    likeCount.textContent = post.likes || 0;
    const currentUser = getCurrentUser(); // 현재 사용자 식별자
    if (post.likedBy && post.likedBy.includes(currentUser)) {
      likeBtn.classList.add("liked");
      likeBtn.textContent = "❤️ 좋아요 취소";
    } else {
      likeBtn.classList.remove("liked");
      likeBtn.textContent = "🤍 좋아요";
    }
    likeBtn.setAttribute("data-post-id", postId);
  }

  // 댓글 렌더링
  renderComments(postId);

  // 댓글 수 업데이트
  const commentsCount = document.getElementById("commentsCount");
  if (commentsCount) {
    commentsCount.textContent = post.comments.length;
  }

  modal.style.display = "flex";
  renderPosts(); // 조회수 업데이트 반영
}

// 댓글 작성
window.addComment = function () {
  if (!currentViewPostId) {
    alert("게시글을 먼저 열어주세요.");
    return;
  }

  const commentAuthorInput = document.getElementById("commentAuthor");
  const commentAuthor = commentAuthorInput
    ? commentAuthorInput.value.trim()
    : "";
  const commentContent = document.getElementById("commentContent").value.trim();
  const isAnonymous =
    document.getElementById("commentAnonymous")?.checked || false;

  // 익명이 아닐 때만 작성자 필수 체크
  if ((!isAnonymous && !commentAuthor) || !commentContent) {
    alert("작성자와 댓글 내용을 입력해주세요.");
    return;
  }

  const post = posts.find((p) => p.id === currentViewPostId);
  if (!post) return;

  if (post.comments === undefined) post.comments = [];

  const finalAuthor = isAnonymous ? "익명" : commentAuthor;

  const newComment = {
    id: Date.now(),
    author: finalAuthor,
    content: commentContent,
    date: new Date().toISOString(),
  };

  post.comments.push(newComment);
  localStorage.setItem("boardPosts", JSON.stringify(posts));

  // 댓글 입력 필드 초기화
  if (commentAuthorInput) commentAuthorInput.value = "";
  const commentContentInput = document.getElementById("commentContent");
  const commentAnonymousCheckbox = document.getElementById("commentAnonymous");
  if (commentContentInput) commentContentInput.value = "";
  if (commentAnonymousCheckbox) {
    commentAnonymousCheckbox.checked = false;
    // 작성자 입력 필드 활성화
    if (commentAuthorInput) {
      commentAuthorInput.disabled = false;
      commentAuthorInput.placeholder = "작성자를 입력하세요";
    }
  }

  // 댓글 목록 다시 렌더링
  renderComments(currentViewPostId);

  // 댓글 수 업데이트
  const commentsCount = document.getElementById("commentsCount");
  if (commentsCount) {
    commentsCount.textContent = post.comments.length;
  }

  renderPosts(); // 목록의 댓글 수 업데이트
};

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
    writeBtn.addEventListener("click", openWriteModal);
    // onclick 속성도 있지만 이벤트 리스너도 추가 (이중 보장)
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
