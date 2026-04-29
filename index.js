const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("home");

function setSidebarState(isOpen) {
  sidebar.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  content.classList.toggle("is-blur", isOpen);
  sidebar.setAttribute("aria-hidden", String(!isOpen));
}

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.contains("is-open");
  setSidebarState(!isOpen);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
    setSidebarState(false);
  }
});

const profilePicture = document.querySelector(".profile-picture");
const aboutSec = document.getElementById("about");
const profileOriginalParent = profilePicture?.parentElement;
const profileOriginalNext = profilePicture?.nextSibling;
const SCROLL_THRESHOLD_PX = 600;

function moveProfilePictureToAbout(shouldMove) {
  if (!profilePicture || !aboutSec || !profileOriginalParent) return;

  if (shouldMove && profilePicture.parentElement !== aboutSec) {
    aboutSec.insertBefore(profilePicture, aboutSec.querySelector("p"));
    return;
  }

  if (!shouldMove && profilePicture.parentElement === aboutSec) {
    profileOriginalParent.insertBefore(profilePicture, profileOriginalNext);
  }
}

function syncProfilePictureOnScroll() {
  if (!profilePicture || !aboutSec) return;

  const rect = aboutSec.getBoundingClientRect();
  const isOnAbout = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
  const isScrolled = window.scrollY > SCROLL_THRESHOLD_PX;
  const isHome = !isOnAbout && !isScrolled;

  moveProfilePictureToAbout(isOnAbout);
  profilePicture.classList.toggle("is-home", isHome);
  profilePicture.classList.toggle("on-about", isOnAbout);
  profilePicture.classList.toggle("is-scrolled", !isOnAbout && isScrolled);
  aboutSec.classList.toggle("on-about", isOnAbout);
}

window.addEventListener("scroll", syncProfilePictureOnScroll, { passive: true });
window.addEventListener("resize", syncProfilePictureOnScroll);
syncProfilePictureOnScroll();
