// Initialize Quill editor
let quill;
try {
  const editorElement = document.getElementById("editor");
  if (editorElement) {
    console.log("Editor element found, initializing Quill...");
    quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
        ],
      },
    });
    console.log("Quill editor initialized successfully");
  } else {
    console.error("Editor element not found");
  }
} catch (error) {
  console.error("Error initializing Quill editor:", error);
}

// Mock data for communities
const communities = [
  {
    id: 1,
    name: "Gaming Enthusiasts",
    members: 12500,
    image:
      "https://ui-avatars.com/api/?name=GE&background=random&color=fff&size=40",
  },
  {
    id: 2,
    name: "Tech Innovators",
    members: 8900,
    image:
      "https://ui-avatars.com/api/?name=TI&background=random&color=fff&size=40",
  },
  {
    id: 3,
    name: "Art & Design",
    members: 7500,
    image:
      "https://ui-avatars.com/api/?name=AD&background=random&color=fff&size=40",
  },
  {
    id: 4,
    name: "Music Lovers",
    members: 11000,
    image:
      "https://ui-avatars.com/api/?name=ML&background=random&color=fff&size=40",
  },
];

// Mock data for posts
let posts = [
  {
    id: 1,
    content:
      "Just discovered this amazing new game! The graphics are stunning and the gameplay is incredibly smooth. Anyone else playing it?",
    author: {
      name: "John Doe",
      avatar:
        "https://ui-avatars.com/api/?name=JD&background=random&color=fff&size=48",
    },
    community: "Gaming Enthusiasts",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    likes: 42,
    comments: [
      {
        id: 1,
        content:
          "I've been playing it for a week now! The multiplayer is amazing!",
        author: {
          name: "Jane Smith",
          avatar:
            "https://ui-avatars.com/api/?name=JS&background=random&color=fff&size=48",
        },
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      },
      {
        id: 2,
        content:
          "The graphics are indeed stunning! What platform are you playing on?",
        author: {
          name: "Mike Johnson",
          avatar:
            "https://ui-avatars.com/api/?name=MJ&background=random&color=fff&size=48",
        },
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      },
    ],
  },
  {
    id: 2,
    content:
      "Check out this new AI technology I've been working on. It's revolutionizing how we approach machine learning!",
    author: {
      name: "Jane Smith",
      avatar:
        "https://ui-avatars.com/api/?name=JS&background=random&color=fff&size=48",
    },
    community: "Tech Innovators",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    likes: 89,
    comments: [
      {
        id: 3,
        content:
          "This is fascinating! Can you share more details about the implementation?",
        author: {
          name: "John Doe",
          avatar:
            "https://ui-avatars.com/api/?name=JD&background=random&color=fff&size=48",
        },
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      },
    ],
  },
];

// Current user state
let currentUser = {
  name: "Guest",
  avatar:
    "https://ui-avatars.com/api/?name=Guest&background=random&color=fff&size=40",
};

// Initialize Firebase Auth state observer
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    currentUser = {
      name: user.displayName || user.email.split("@")[0],
      avatar:
        user.photoURL ||
        `https://ui-avatars.com/api/?name=${user.displayName}&background=random&color=fff&size=40`,
    };

    // Update UI elements that show user info
    const usernameElements = document.querySelectorAll(".username");
    const avatarElements = document.querySelectorAll(".avatar");

    usernameElements.forEach((element) => {
      element.textContent = currentUser.name;
    });

    avatarElements.forEach((element) => {
      element.src = currentUser.avatar;
    });
  } else {
    // User is signed out
    currentUser = {
      name: "Guest",
      avatar:
        "https://ui-avatars.com/api/?name=Guest&background=random&color=fff&size=40",
    };
  }
});

// DOM Elements
const modal = document.getElementById("createPostModal");
const createPostBtn = document.querySelector(".create-post-btn");
const closeModalBtn = document.querySelector(".close-modal");
const cancelBtn = document.querySelector(".cancel-btn");
const postBtn = document.querySelector(".post-btn");
const feedContainer = document.querySelector(".posts-container");
const searchInput = document.querySelector(".search-bar input");
const filterButtons = document.querySelectorAll(".filter-btn");
const trendingCommunities = document.querySelector(".trending-communities");

// Modal Functions
function openModal() {
  try {
    console.log("Opening modal...");
    if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      if (quill) {
        quill.focus();
      }
      console.log("Modal opened successfully");
    } else {
      console.error("Modal element not found");
    }
  } catch (error) {
    console.error("Error opening modal:", error);
  }
}

function closeModal() {
  try {
    console.log("Closing modal...");
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      if (quill) {
        quill.setContents([]);
      }
      console.log("Modal closed successfully");
    } else {
      console.error("Modal element not found");
    }
  } catch (error) {
    console.error("Error closing modal:", error);
  }
}

// Event Listeners
if (createPostBtn) {
  createPostBtn.addEventListener("click", openModal);
} else {
  console.error("Create post button not found");
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
} else {
  console.error("Close modal button not found");
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", closeModal);
} else {
  console.error("Cancel button not found");
}

if (modal) {
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Post Creation
postBtn.addEventListener("click", () => {
  const content = quill.root.innerHTML;
  if (!content.trim()) {
    showNotification("Please add some content to your post", "error");
    return;
  }

  const newPost = {
    id: posts.length + 1,
    content: content,
    author: currentUser,
    community: "Gaming Enthusiasts", // Default community
    timestamp: new Date(),
    likes: 0,
    comments: [],
  };

  posts.unshift(newPost);
  createPostElement(newPost);
  closeModal();
  showNotification("Post created successfully!", "success");
  updateCommunityStats();
});

// Create Post Element
function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.className = "post-card";
  postElement.innerHTML = `
    <div class="post-header">
      <img src="${post.author.avatar}" alt="${
    post.author.name
  }" class="post-avatar">
      <div class="post-info">
        <h3>${post.author.name}</h3>
        <div class="post-meta">
          <span>${post.community}</span> • 
          <span>${formatTime(post.timestamp)}</span>
        </div>
      </div>
      ${
        post.author.name === currentUser.name
          ? `
        <button class="delete-post-btn" data-post-id="${post.id}">
          <i class="fas fa-trash"></i>
        </button>
      `
          : ""
      }
    </div>
    <div class="post-content">
      ${post.content}
    </div>
    <div class="post-actions">
      <button class="action-btn like-btn" data-post-id="${post.id}">
        <i class="fas fa-heart"></i>
        <span>${post.likes}</span>
      </button>
      <button class="action-btn comment-btn" data-post-id="${post.id}">
        <i class="fas fa-comment"></i>
        <span>${post.comments.length}</span>
      </button>
      <button class="action-btn">
        <i class="fas fa-share"></i>
      </button>
    </div>
    <div class="comments-section" style="display: none;">
      <div class="comments-list">
        ${post.comments
          .map(
            (comment) => `
          <div class="comment">
            <div class="comment-header">
              <img src="${comment.author.avatar}" alt="${
              comment.author.name
            }" class="comment-avatar">
              <div class="comment-info">
                <h4>${comment.author.name}</h4>
                <span>${formatTime(comment.timestamp)}</span>
              </div>
            </div>
            <div class="comment-content">
              ${comment.content}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="comment-form">
        <img src="${currentUser.avatar}" alt="${
    currentUser.name
  }" class="comment-avatar">
        <input type="text" placeholder="Write a comment..." class="comment-input">
      </div>
    </div>
  `;

  // Add delete functionality
  const deleteBtn = postElement.querySelector(".delete-post-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this post?")) {
        const postId = parseInt(deleteBtn.dataset.postId);
        posts = posts.filter((post) => post.id !== postId);
        postElement.remove();
        showNotification("Post deleted successfully!", "success");
        updateCommunityStats();
      }
    });
  }

  // Add like functionality
  const likeBtn = postElement.querySelector(".like-btn");
  likeBtn.addEventListener("click", () => {
    const post = posts.find((p) => p.id === parseInt(likeBtn.dataset.postId));
    if (post) {
      post.likes++;
      likeBtn.querySelector("span").textContent = post.likes;
      likeBtn.classList.add("liked");
      showNotification("Post liked!", "success");
    }
  });

  // Add comment functionality
  const commentBtn = postElement.querySelector(".comment-btn");
  const commentsSection = postElement.querySelector(".comments-section");
  const commentInput = postElement.querySelector(".comment-input");

  commentBtn.addEventListener("click", () => {
    commentsSection.style.display =
      commentsSection.style.display === "none" ? "block" : "none";
    if (commentsSection.style.display === "block") {
      commentInput.focus();
    }
  });

  commentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && commentInput.value.trim()) {
      const post = posts.find(
        (p) => p.id === parseInt(commentBtn.dataset.postId)
      );
      if (post) {
        const newComment = {
          id: post.comments.length + 1,
          content: commentInput.value.trim(),
          author: currentUser,
          timestamp: new Date(),
        };
        post.comments.push(newComment);
        post.comments.length++;
        commentBtn.querySelector("span").textContent = post.comments.length;

        // Add new comment to the comments list
        const commentsList = postElement.querySelector(".comments-list");
        const commentElement = document.createElement("div");
        commentElement.className = "comment";
        commentElement.innerHTML = `
          <div class="comment-header">
            <img src="${newComment.author.avatar}" alt="${
          newComment.author.name
        }" class="comment-avatar">
            <div class="comment-info">
              <h4>${newComment.author.name}</h4>
              <span>${formatTime(newComment.timestamp)}</span>
            </div>
          </div>
          <div class="comment-content">
            ${newComment.content}
          </div>
        `;
        commentsList.appendChild(commentElement);

        // Clear input
        commentInput.value = "";
        showNotification("Comment added successfully!", "success");
      }
    }
  });

  feedContainer.insertBefore(postElement, feedContainer.firstChild);
}

// Like Functionality
function handleLike(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.likes++;
    updatePostLikes(postId);
  }
}

function updatePostLikes(postId) {
  const likeBtn = document.querySelector(`.like-btn[data-post-id="${postId}"]`);
  if (likeBtn) {
    const post = posts.find((p) => p.id === postId);
    likeBtn.querySelector("span").textContent = post.likes;
  }
}

// Filtering and Searching
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterPosts(button.dataset.filter);
  });
});

searchInput.addEventListener("input", (e) => {
  searchPosts(e.target.value);
});

function filterPosts(filter) {
  const filteredPosts = posts.filter((post) => {
    switch (filter) {
      case "all":
        return true;
      case "trending":
        return post.likes > 50;
      case "recent":
        return Date.now() - post.timestamp < 86400000; // Last 24 hours
      default:
        return true;
    }
  });
  updateFeed(filteredPosts);
}

function searchPosts(query) {
  const searchResults = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.author.name.toLowerCase().includes(query.toLowerCase()) ||
      post.community.toLowerCase().includes(query.toLowerCase())
  );
  updateFeed(searchResults);
}

function updateFeed(postsToShow) {
  feedContainer.innerHTML = "";
  postsToShow.forEach((post) => createPostElement(post));
}

// Real-time Notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas ${
          type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
        }"></i>
        <span>${message}</span>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Utility Functions
function formatTime(date) {
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
  return date.toLocaleDateString();
}

function updateCommunityStats() {
  const community = communities.find((c) => c.name === "Gaming Enthusiasts");
  if (community) {
    community.members++;
    updateTrendingCommunities();
  }
}

function updateTrendingCommunities() {
  trendingCommunities.innerHTML = `
    <h3>Trending Communities</h3>
    ${communities
      .map(
        (community) => `
        <div class="community-item">
          <div class="community-info">
            <h4>${community.name}</h4>
            <span>${community.members.toLocaleString()} members</span>
          </div>
        </div>
      `
      )
      .join("")}
  `;
}

// Initialize the feed
posts.forEach((post) => createPostElement(post));
updateTrendingCommunities();
