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
    image: "https://picsum.photos/40/40?random=1",
  },
  {
    id: 2,
    name: "Tech Innovators",
    members: 8900,
    image: "https://picsum.photos/40/40?random=2",
  },
  {
    id: 3,
    name: "Art & Design",
    members: 7500,
    image: "https://picsum.photos/40/40?random=3",
  },
  {
    id: 4,
    name: "Music Lovers",
    members: 11000,
    image: "https://picsum.photos/40/40?random=4",
  },
];

// Mock data for posts
let posts = [
  {
    id: 1,
    content:
      "Just launched my first open-source project! Would love feedback from the community.",
    author: {
      name: "Alex Johnson",
      avatar: "https://avatar.iran.liara.run/public/24",
    },
    community: "Open Source Hub",
    timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
    likes: 120,
    comments: [
      {
        id: 4,
        content: "Congrats! Where can we check it out?",
        author: {
          name: "Emily White",
          avatar: "https://picsum.photos/48/48?random=4",
        },
        timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      },
    ],
  },
  {
    id: 2,
    content:
      "Check out this new AI technology I've been working on. It's revolutionizing how we approach machine learning!",
    author: {
      name: "Jane Smith",
      avatar: "https://avatar.iran.liara.run/public/22",
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
          avatar: "https://picsum.photos/48/48?random=1",
        },
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      },
    ],
  },
  {
    id: 3,
    content:
      "Just finished reading an amazing book on UX design. Highly recommend it!",
    author: {
      name: "Sophie Brown",
      avatar: "https://picsum.photos/48/48?random=5",
    },
    community: "UI/UX Enthusiasts",
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    likes: 73,
    comments: [
      {
        id: 5,
        content: "What’s the name of the book? Would love to check it out!",
        author: {
          name: "Michael Green",
          avatar: "https://picsum.photos/48/48?random=6",
        },
        timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      },
    ],
  },
  {
    id: 4,
    content:
      "Built a new cryptocurrency trading bot. Testing it out now, results are promising!",
    author: {
      name: "Daniel Carter",
      avatar: "https://picsum.photos/48/48?random=7",
    },
    community: "Crypto Traders",
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    likes: 150,
    comments: [
      {
        id: 6,
        content: "Interesting! What strategy are you using?",
        author: {
          name: "Lisa Ray",
          avatar: "https://picsum.photos/48/48?random=8",
        },
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      },
    ],
  },
  {
    id: 5,
    content:
      "Hosting a live Q&A on front-end performance optimization this weekend. Who’s in?",
    author: {
      name: "Kevin Adams",
      avatar: "https://picsum.photos/48/48?random=9",
    },
    community: "Web Developers",
    timestamp: new Date(Date.now() - 18000000), // 5 hours ago
    likes: 95,
    comments: [
      {
        id: 7,
        content: "Count me in! What time will it be?",
        author: {
          name: "Sarah Kim",
          avatar: "https://picsum.photos/48/48?random=10",
        },
        timestamp: new Date(Date.now() - 9000000), // 2.5 hours ago
      },
    ],
  },
  {
    id: 6,
    content:
      "Experimenting with new neural network architectures. Excited about the potential breakthroughs!",
    author: {
      name: "Olivia Turner",
      avatar: "https://picsum.photos/48/48?random=11",
    },
    community: "AI Enthusiasts",
    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
    likes: 135,
    comments: [
      {
        id: 8,
        content: "What dataset are you using for training?",
        author: {
          name: "Jason Lee",
          avatar: "https://picsum.photos/48/48?random=12",
        },
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      },
    ],
  },
  {
    id: 7,
    content:
      "Rewriting my portfolio site in Next.js for better performance. Excited for the results!",
    author: {
      name: "Nathan Scott",
      avatar: "https://picsum.photos/48/48?random=13",
    },
    community: "Frontend Masters",
    timestamp: new Date(Date.now() - 25200000), // 7 hours ago
    likes: 112,
    comments: [
      {
        id: 9,
        content: "Nice! Are you using SSR or static generation?",
        author: {
          name: "Emma Davis",
          avatar: "https://picsum.photos/48/48?random=14",
        },
        timestamp: new Date(Date.now() - 12600000), // 3.5 hours ago
      },
    ],
  },
  {
    id: 8,
    content:
      "New blog post out: 'The Future of Decentralized Social Networks'. Let me know your thoughts!",
    author: {
      name: "Sophia Martinez",
      avatar: "https://picsum.photos/48/48?random=15",
    },
    community: "Tech Writers",
    timestamp: new Date(Date.now() - 28800000), // 8 hours ago
    likes: 87,
    comments: [
      {
        id: 10,
        content: "Sounds interesting! Where can I read it?",
        author: {
          name: "Chris Brown",
          avatar: "https://picsum.photos/48/48?random=16",
        },
        timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      },
    ],
  },
  {
    id: 9,
    content:
      "Loving the new Tailwind CSS features! It’s making styling so much easier.",
    author: {
      name: "Lucas Evans",
      avatar: "https://picsum.photos/48/48?random=17",
    },
    community: "CSS Wizards",
    timestamp: new Date(Date.now() - 32400000), // 9 hours ago
    likes: 98,
    comments: [
      {
        id: 11,
        content: "I agree! Have you tried the new typography plugin?",
        author: {
          name: "Rachel Stewart",
          avatar: "https://picsum.photos/48/48?random=18",
        },
        timestamp: new Date(Date.now() - 16200000), // 4.5 hours ago
      },
    ],
  },
  {
    id: 10,
    content:
      "Just built a dark mode toggle with vanilla JavaScript! Feels so satisfying.",
    author: {
      name: "Ethan Robinson",
      avatar: "https://picsum.photos/48/48?random=19",
    },
    community: "JavaScript Enthusiasts",
    timestamp: new Date(Date.now() - 36000000), // 10 hours ago
    likes: 105,
    comments: [
      {
        id: 12,
        content: "Nice! Are you using prefers-color-scheme?",
        author: {
          name: "Hannah Cooper",
          avatar: "https://picsum.photos/48/48?random=20",
        },
        timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      },
    ],
  },
];

// Current user state
let currentUser = {
  name: "Guest",
  avatar: "https://picsum.photos/40/40?random=1",
};

// Initialize Firebase Auth state observer
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    currentUser = {
      name: user.displayName || user.email.split("@")[0],
      avatar: user.photoURL || `https://picsum.photos/40/40?random=${user.uid}`,
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
      avatar: "https://picsum.photos/40/40?random=1",
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
                <img src="${community.image}" alt="${community.name}">
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
