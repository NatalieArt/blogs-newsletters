const navItems = document.querySelectorAll(".nav-item.has-menu");

navItems.forEach((item) => {
  const button = item.querySelector(".nav-toggle");
  if (!button) return;

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));

    navItems.forEach((other) => {
      if (other === item) return;
      other.classList.remove("open");
      const otherButton = other.querySelector(".nav-toggle");
      if (otherButton) otherButton.setAttribute("aria-expanded", "false");
    });
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".nav-item.has-menu")) return;
  navItems.forEach((item) => {
    item.classList.remove("open");
    const button = item.querySelector(".nav-toggle");
    if (button) button.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  navItems.forEach((item) => {
    item.classList.remove("open");
    const button = item.querySelector(".nav-toggle");
    if (button) button.setAttribute("aria-expanded", "false");
  });
});

const rootPrefix = document.body.dataset.root;
const currentArticle = document.body.dataset.current;
const articleMain = document.querySelector(".article-main");

if (rootPrefix && currentArticle && articleMain) {
  const entries = [
    {
      id: "blog-architectural-renders",
      href: "blogs/architectural-renders/",
      type: "Blog · Architecture",
      title: "Why You No Longer Need to Outsource Your Architectural Renders"
    },
    {
      id: "blog-creative-assistant",
      href: "blogs/creative-assistant/",
      type: "Blog · Studio",
      title: "Meet the New Creative Assistant in Sogni Studio / Pro"
    },
    {
      id: "blog-starting-ending-frames",
      href: "blogs/starting-ending-frames/",
      type: "Blog · Motion",
      title: "Starting & Ending Frames"
    },
    {
      id: "newsletter-19",
      href: "newsletters/19/",
      type: "Newsletter · Vol 19",
      title: "Season 6 is live"
    },
    {
      id: "newsletter-18",
      href: "newsletters/18/",
      type: "Newsletter · Vol 18",
      title: "2025: The Year Sogni Came Alive"
    }
  ];

  const picker = document.createElement("section");
  picker.className = "article-picker";
  picker.innerHTML = `
    <div class="container">
      <div class="article-picker-shell">
        <div class="article-picker-head">
          <strong>Browse all articles and newsletters</strong>
          <span>Stay inside the same site</span>
        </div>
        <div class="article-picker-grid"></div>
      </div>
    </div>
  `;

  const grid = picker.querySelector(".article-picker-grid");
  entries.forEach((entry) => {
    const link = document.createElement("a");
    link.className = "article-picker-link";
    if (entry.id === currentArticle) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
    link.href = `${rootPrefix}${entry.href}`;
    link.innerHTML = `
      <span class="article-picker-type">${entry.type}</span>
      <span class="article-picker-title">${entry.title}</span>
    `;
    grid.appendChild(link);
  });

  articleMain.insertBefore(picker, articleMain.firstElementChild);
}
