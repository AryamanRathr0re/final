// Mock user data
const currentUser = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  avatar: "https://picsum.photos/150/150?random=1",
  bio: "Tech enthusiast and web developer. Love exploring new technologies and sharing knowledge with the community.",
  location: "San Francisco, CA",
  joinedDate: "2023-01-15",
  stats: {
    posts: 45,
    followers: 1234,
    following: 567,
    communities: 12,
  },
  interests: ["Technology", "Web Development", "AI", "Design"],
  recentActivity: [
    {
      type: "post",
      title: "Getting Started with React",
      community: "Web Development",
      timestamp: Date.now() - 3600000,
    },
    {
      type: "comment",
      content: "Great article! Very helpful.",
      post: "Understanding JavaScript Promises",
      timestamp: Date.now() - 7200000,
    },
    {
      type: "community",
      action: "joined",
      name: "AI Enthusiasts",
      timestamp: Date.now() - 86400000,
    },
  ],
};

// DOM Elements
const profileHeader = document.querySelector(".profile-header");
const profileContent = document.querySelector(".profile-content");
const editProfileBtn = document.querySelector(".edit-profile-btn");
const modal = document.getElementById("editProfileModal");
const closeModalBtn = document.querySelector(".close-modal");
const cancelBtn = document.querySelector(".cancel-btn");
const saveBtn = document.querySelector(".save-btn");
const profileForm = document.getElementById("editProfileForm");
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

// Initialize Profile
function initializeProfile() {
  // Update profile header
  profileHeader.innerHTML = `
        <div class="profile-cover">
            <img src="https://picsum.photos/1200/300?random=1" alt="Cover Photo">
        </div>
        <div class="profile-info">
            <img src="${currentUser.avatar}" alt="${currentUser.name}" class="profile-avatar">
            <div class="profile-details">
                <h1>${currentUser.name}</h1>
                <span class="profile-username">@${currentUser.username}</span>
                <p class="profile-bio">${currentUser.bio}</p>
                <div class="profile-stats">
                    <div class="stat">
                        <span class="value">${currentUser.stats.posts}</span>
                        <span class="label">Posts</span>
                    </div>
                    <div class="stat">
                        <span class="value">${currentUser.stats.followers}</span>
                        <span class="label">Followers</span>
                    </div>
                    <div class="stat">
                        <span class="value">${currentUser.stats.following}</span>
                        <span class="label">Following</span>
                    </div>
                    <div class="stat">
                        <span class="value">${currentUser.stats.communities}</span>
                        <span class="label">Communities</span>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Update profile content
  updateProfileContent();
}

// Update Profile Content
function updateProfileContent() {
  // Update About section
  document.querySelector(".about-content").innerHTML = `
        <div class="about-section">
            <div class="info-group">
                <h3>About</h3>
                <p>${currentUser.bio}</p>
            </div>
            <div class="info-group">
                <h3>Location</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${
                  currentUser.location
                }</p>
            </div>
            <div class="info-group">
                <h3>Joined</h3>
                <p><i class="fas fa-calendar"></i> ${formatDate(
                  currentUser.joinedDate
                )}</p>
            </div>
            <div class="info-group">
                <h3>Interests</h3>
                <div class="interests">
                    ${currentUser.interests
                      .map(
                        (interest) => `
                        <span class="interest-tag">${interest}</span>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;

  // Update Activity section
  document.querySelector(".activity-content").innerHTML = `
        ${currentUser.recentActivity
          .map(
            (activity) => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <p>${formatActivityText(activity)}</p>
                    <span class="activity-time">${formatTimeAgo(
                      activity.timestamp
                    )}</span>
                </div>
            </div>
        `
          )
          .join("")}
    `;

  // Update Communities section
  document.querySelector(".communities-content").innerHTML = `
        <div class="communities-grid">
            ${generateCommunitiesGrid()}
        </div>
    `;
}

// Modal Functions
function openModal() {
  modal.style.display = "block";
  // Populate form with current user data
  profileForm.querySelector("#name").value = currentUser.name;
  profileForm.querySelector("#username").value = currentUser.username;
  profileForm.querySelector("#bio").value = currentUser.bio;
  profileForm.querySelector("#location").value = currentUser.location;
}

function closeModal() {
  modal.style.display = "none";
  profileForm.reset();
}

// Save Profile Changes
function saveProfileChanges() {
  const formData = new FormData(profileForm);

  // Update current user data
  currentUser.name = formData.get("name");
  currentUser.username = formData.get("username");
  currentUser.bio = formData.get("bio");
  currentUser.location = formData.get("location");

  // Update profile display
  initializeProfile();
  closeModal();
  showNotification("Profile updated successfully!", "success");
}

// Tab Switching
function switchTab(tabId) {
  tabButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.dataset.tab === tabId) {
      button.classList.add("active");
    }
  });

  tabContents.forEach((content) => {
    content.classList.remove("active");
    if (content.id === tabId) {
      content.classList.add("active");
    }
  });
}

// Utility Functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

function getActivityIcon(type) {
  switch (type) {
    case "post":
      return "fa-file-alt";
    case "comment":
      return "fa-comment";
    case "community":
      return "fa-users";
    default:
      return "fa-circle";
  }
}

function formatActivityText(activity) {
  switch (activity.type) {
    case "post":
      return `Created a new post "${activity.title}" in ${activity.community}`;
    case "comment":
      return `Commented on "${activity.post}"`;
    case "community":
      return `${activity.action} the community "${activity.name}"`;
    default:
      return "";
  }
}

function generateCommunitiesGrid() {
  // Mock communities data
  const communities = [
    { name: "Web Development", members: 15000, posts: 450 },
    { name: "AI & Machine Learning", members: 12000, posts: 380 },
    { name: "UI/UX Design", members: 8000, posts: 250 },
    { name: "Mobile Development", members: 10000, posts: 300 },
  ];

  return communities
    .map(
      (community) => `
        <div class="community-card">
            <div class="community-header">
                <img src="https://picsum.photos/300/200?random=${Math.random()}" alt="${
        community.name
      }">
            </div>
            <div class="community-info">
                <h3>${community.name}</h3>
                <div class="community-stats">
                    <span><i class="fas fa-users"></i> ${community.members.toLocaleString()} members</span>
                    <span><i class="fas fa-comments"></i> ${
                      community.posts
                    } posts</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
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

// Event Listeners
editProfileBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
saveBtn.addEventListener("click", saveProfileChanges);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchTab(button.dataset.tab);
  });
});

// Initialize the page
initializeProfile();
