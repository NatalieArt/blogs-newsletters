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
