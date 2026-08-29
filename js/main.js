const header = document.querySelector(".site-header");

const syncHeader = () => {
  header.dataset.elevated = window.scrollY > 12 ? "true" : "false";
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });
