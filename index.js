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