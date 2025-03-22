// Mock data for communities
const communities = [
  {
    id: 1,
    name: "Gaming Enthusiasts",
    description:
      "A community for gamers to discuss their favorite games, share tips, and connect with fellow players.",
    members: 12500,
    posts: 450,
    category: "gaming",
    image: "https://picsum.photos/300/200?random=1",
    avatar: "https://picsum.photos/80/80?random=1",
    activity: "high",
  },
  {
    id: 2,
    name: "Tech Innovators",
    description:
      "Join the discussion about the latest technological innovations, programming, and digital trends.",
    members: 8900,
    posts: 320,
    category: "tech",
    image: "https://picsum.photos/300/200?random=2",
    avatar: "https://picsum.photos/80/80?random=2",
    activity: "high",
  },
  {
    id: 3,
    name: "Art & Design",
    description:
      "A space for artists and designers to showcase their work, share techniques, and inspire each other.",
    members: 7500,
    posts: 280,
    category: "art",
    image: "https://picsum.photos/300/200?random=3",
    avatar: "https://picsum.photos/80/80?random=3",
    activity: "medium",
  },
  {
    id: 4,
    name: "Music Lovers",
    description:
      "Connect with fellow music enthusiasts, share playlists, and discuss your favorite artists and genres.",
    members: 11000,
    posts: 380,
    category: "music",
    image: "https://picsum.photos/300/200?random=4",
    avatar: "https://picsum.photos/80/80?random=4",
    activity: "high",
  },
];

// DOM Elements
const modal = document.getElementById("createCommunityModal");
const createCommunityBtn = document.querySelector(".create-post-btn");
const closeModalBtn = document.querySelector(".close-modal");
const cancelBtn = document.querySelector(".cancel-btn");
const postBtn = document.querySelector(".post-btn");
const communitiesGrid = document.querySelector(".communities-grid");
const searchInput = document.querySelector(".search-bar input");
const filterOptions = document.querySelectorAll(".filter-option input");
const sortSelect = document.querySelector(".sort-select");
const trendingCommunities = document.querySelector(".trending-communities");

// Modal Functions
function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  document.getElementById("createCommunityForm").reset();
}

// Event Listeners
createCommunityBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Create Community
postBtn.addEventListener("click", () => {
  const form = document.getElementById("createCommunityForm");
  const formData = new FormData(form);

  const newCommunity = {
    id: communities.length + 1,
    name: formData.get("communityName"),
    description: formData.get("communityDescription"),
    category: formData.get("communityCategory"),
    members: 0,
    posts: 0,
    image: "https://picsum.photos/300/200?random=" + (communities.length + 1),
    avatar: "https://picsum.photos/80/80?random=" + (communities.length + 1),
    activity: "low",
  };

  communities.unshift(newCommunity);
  createCommunityCard(newCommunity);
  closeModal();
  showNotification("Community created successfully!", "success");
  updateTrendingCommunities();
});

// Create Community Card
function createCommunityCard(community) {
  const card = document.createElement("div");
  card.className = "community-card";
  card.innerHTML = `
        <div class="community-header">
            <img src="${community.image}" alt="${
    community.name
  }" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <img src="${community.avatar}" alt="${
    community.name
  }" class="community-avatar">
        <div class="community-info">
            <h3>${community.name}</h3>
            <div class="community-stats">
                <span><i class="fas fa-users"></i> ${community.members.toLocaleString()} members</span>
                <span><i class="fas fa-comments"></i> ${
                  community.posts
                } posts</span>
            </div>
            <p class="community-description">${community.description}</p>
            <div class="community-actions">
                <button class="join-btn">Join Community</button>
            </div>
        </div>
    `;

  communitiesGrid.insertBefore(card, communitiesGrid.firstChild);
}

// Filtering and Searching
function filterCommunities() {
  const searchQuery = searchInput.value.toLowerCase();
  const selectedCategories = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((cb) => cb.value);
  const memberCount = document.querySelector(
    'input[name="memberCount"]:checked'
  )?.value;
  const activity = document.querySelector(
    'input[name="activity"]:checked'
  )?.value;
  const sortBy = sortSelect.value;

  let filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery) ||
      community.description.toLowerCase().includes(searchQuery);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(community.category);
    const matchesMemberCount =
      !memberCount ||
      (memberCount === "small" && community.members < 1000) ||
      (memberCount === "medium" &&
        community.members >= 1000 &&
        community.members < 5000) ||
      (memberCount === "large" && community.members >= 5000);
    const matchesActivity = !activity || community.activity === activity;

    return (
      matchesSearch && matchesCategory && matchesMemberCount && matchesActivity
    );
  });

  // Sort communities
  filteredCommunities.sort((a, b) => {
    switch (sortBy) {
      case "members":
        return b.members - a.members;
      case "recent":
        return b.id - a.id;
      case "active":
        return b.posts - a.posts;
      case "trending":
        return (
          b.posts * 0.7 + b.members * 0.3 - (a.posts * 0.7 + a.members * 0.3)
        );
      default:
        return 0;
    }
  });

  updateCommunitiesGrid(filteredCommunities);
}

// Update Communities Grid
function updateCommunitiesGrid(communitiesToShow) {
  communitiesGrid.innerHTML = "";
  communitiesToShow.forEach((community) => createCommunityCard(community));
}

// Event Listeners for Filtering
searchInput.addEventListener("input", filterCommunities);
filterOptions.forEach((option) => {
  option.addEventListener("change", filterCommunities);
});
sortSelect.addEventListener("change", filterCommunities);

// Update Trending Communities
function updateTrendingCommunities() {
  const trending = [...communities]
    .sort(
      (a, b) =>
        b.posts * 0.7 + b.members * 0.3 - (a.posts * 0.7 + a.members * 0.3)
    )
    .slice(0, 5);

  trendingCommunities.innerHTML = `
        <h3>Trending Communities</h3>
        ${trending
          .map(
            (community) => `
            <div class="community-item">
                <img src="${community.avatar}" alt="${community.name}">
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

// Notification System
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

// Initialize the page
communities.forEach((community) => createCommunityCard(community));
updateTrendingCommunities();
