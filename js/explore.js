// Mock data for explore content
const exploreContent = [
  {
    id: 1,
    type: "post",
    title: "The Future of Artificial Intelligence",
    content:
      "Exploring the latest developments in AI and their potential impact on society...",
    author: {
      name: "Tech Enthusiast",
      avatar: "https://picsum.photos/40/40?random=1",
    },
    community: "Tech Innovators",
    timestamp: Date.now() - 3600000, // 1 hour ago
    likes: 245,
    comments: 89,
    shares: 34,
    engagement: "high",
  },
  {
    id: 2,
    type: "community",
    name: "Digital Art Gallery",
    description:
      "A showcase of amazing digital artwork from talented artists worldwide.",
    members: 8500,
    posts: 1200,
    image: "https://picsum.photos/300/200?random=5",
    avatar: "https://picsum.photos/80/80?random=5",
    engagement: "medium",
  },
  {
    id: 3,
    type: "topic",
    name: "Web Development",
    description: "Latest trends and discussions in web development",
    posts: 450,
    followers: 12000,
    engagement: "high",
  },
];

// DOM Elements
const exploreContentContainer = document.querySelector(".explore-content");
const searchInput = document.querySelector(".search-bar input");
const filterToggleBtn = document.querySelector(".filter-toggle-btn");
const filterPanel = document.querySelector(".advanced-filters-panel");
const filterInputs = document.querySelectorAll(".advanced-filters-panel input");
const sortSelect = document.querySelector(".sort-select");
const trendingTopics = document.querySelector(".trending-topics");
const applyFiltersBtn = document.querySelector(".apply-filters-btn");
const resetFiltersBtn = document.querySelector(".reset-filters-btn");

// Filter Panel Toggle
filterToggleBtn.addEventListener("click", () => {
  filterPanel.classList.toggle("show");
});

// Create Content Card
function createContentCard(content) {
  const card = document.createElement("div");
  card.className = "content-card";

  if (content.type === "post") {
    card.innerHTML = `
            <div class="post-header">
                <img src="${content.author.avatar}" alt="${content.author.name}" class="author-avatar">
                <div class="post-info">
                    <h4>${content.author.name}</h4>
                    <span>Posted in ${content.community}</span>
                </div>
            </div>
            <div class="post-content">
                <h3>${content.title}</h3>
                <p>${content.content}</p>
            </div>
            <div class="post-actions">
                <button class="action-btn like-btn">
                    <i class="fas fa-heart"></i>
                    <span>${content.likes}</span>
                </button>
                <button class="action-btn comment-btn">
                    <i class="fas fa-comment"></i>
                    <span>${content.comments}</span>
                </button>
                <button class="action-btn share-btn">
                    <i class="fas fa-share"></i>
                    <span>${content.shares}</span>
                </button>
            </div>
        `;
  } else if (content.type === "community") {
    card.innerHTML = `
            <div class="community-header">
                <img src="${content.image}" alt="${
      content.name
    }" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <img src="${content.avatar}" alt="${
      content.name
    }" class="community-avatar">
            <div class="community-info">
                <h3>${content.name}</h3>
                <div class="community-stats">
                    <span><i class="fas fa-users"></i> ${content.members.toLocaleString()} members</span>
                    <span><i class="fas fa-comments"></i> ${
                      content.posts
                    } posts</span>
                </div>
                <p class="community-description">${content.description}</p>
                <div class="community-actions">
                    <button class="join-btn">Join Community</button>
                </div>
            </div>
        `;
  } else if (content.type === "topic") {
    card.innerHTML = `
            <div class="topic-info">
                <h3>${content.name}</h3>
                <p>${content.description}</p>
                <div class="topic-stats">
                    <span><i class="fas fa-comments"></i> ${
                      content.posts
                    } posts</span>
                    <span><i class="fas fa-users"></i> ${content.followers.toLocaleString()} followers</span>
                </div>
                <button class="follow-btn">Follow Topic</button>
            </div>
        `;
  }

  return card;
}

// Filtering and Searching
function filterContent() {
  const searchQuery = searchInput.value.toLowerCase();
  const selectedTypes = Array.from(
    document.querySelectorAll('input[name="contentType"]:checked')
  ).map((cb) => cb.value);
  const timeRange = document.querySelector(
    'input[name="timeRange"]:checked'
  )?.value;
  const engagement = document.querySelector(
    'input[name="engagement"]:checked'
  )?.value;
  const sortBy = sortSelect.value;

  let filteredContent = exploreContent.filter((content) => {
    const matchesSearch =
      content.type === "post"
        ? content.title.toLowerCase().includes(searchQuery) ||
          content.content.toLowerCase().includes(searchQuery)
        : content.name.toLowerCase().includes(searchQuery) ||
          content.description.toLowerCase().includes(searchQuery);

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(content.type);
    const matchesTime =
      !timeRange ||
      (content.type === "post" &&
        isWithinTimeRange(content.timestamp, timeRange));
    const matchesEngagement = !engagement || content.engagement === engagement;

    return matchesSearch && matchesType && matchesTime && matchesEngagement;
  });

  // Sort content
  filteredContent.sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.id - a.id;
      case "popular":
        return (b.likes || b.members) - (a.likes || a.members);
      case "trending":
        return (
          (b.engagement === "high" ? 3 : b.engagement === "medium" ? 2 : 1) -
          (a.engagement === "high" ? 3 : a.engagement === "medium" ? 2 : 1)
        );
      default:
        return 0;
    }
  });

  updateContentGrid(filteredContent);
}

// Helper function to check if content is within time range
function isWithinTimeRange(timestamp, range) {
  const now = Date.now();
  const hours = (now - timestamp) / (1000 * 60 * 60);

  switch (range) {
    case "today":
      return hours <= 24;
    case "week":
      return hours <= 168;
    case "month":
      return hours <= 720;
    case "year":
      return hours <= 8760;
    default:
      return true;
  }
}

// Update Content Grid
function updateContentGrid(contentToShow) {
  exploreContentContainer.innerHTML = "";
  contentToShow.forEach((content) => {
    exploreContentContainer.appendChild(createContentCard(content));
  });
}

// Update Trending Topics
function updateTrendingTopics() {
  const trending = exploreContent
    .filter((content) => content.type === "topic")
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 5);

  trendingTopics.innerHTML = `
        <h3>Trending Topics</h3>
        ${trending
          .map(
            (topic) => `
            <div class="topic-item">
                <div class="topic-info">
                    <h4>${topic.name}</h4>
                    <span>${topic.followers.toLocaleString()} followers</span>
                </div>
                <button class="follow-btn">Follow</button>
            </div>
        `
          )
          .join("")}
    `;
}

// Reset Filters
function resetFilters() {
  document
    .querySelectorAll(".advanced-filters-panel input")
    .forEach((input) => {
      if (input.type === "checkbox") {
        input.checked = true;
      } else if (input.type === "radio") {
        input.checked = false;
      }
    });
  sortSelect.value = "relevance";
  filterContent();
}

// Event Listeners
searchInput.addEventListener("input", filterContent);
filterInputs.forEach((input) => {
  input.addEventListener("change", filterContent);
});
sortSelect.addEventListener("change", filterContent);
applyFiltersBtn.addEventListener("click", () => {
  filterPanel.classList.remove("show");
  filterContent();
});
resetFiltersBtn.addEventListener("click", resetFilters);

// Initialize the page
exploreContent.forEach((content) => {
  exploreContentContainer.appendChild(createContentCard(content));
});
updateTrendingTopics();
