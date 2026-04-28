(() => {
  const menus = Array.from(document.querySelectorAll("[data-bn-menu]"));
  if (!menus.length) {
    return;
  }

  const closeMenus = (except = null) => {
    menus.forEach((menu) => {
      if (menu === except) {
        return;
      }
      menu.classList.remove("is-open");
      const trigger = menu.querySelector(".bn-trigger");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  };

  menus.forEach((menu) => {
    const trigger = menu.querySelector(".bn-trigger");
    if (!trigger) {
      return;
    }

    trigger.addEventListener("click", () => {
      const opening = !menu.classList.contains("is-open");
      closeMenus(opening ? menu : null);
      menu.classList.toggle("is-open", opening);
      trigger.setAttribute("aria-expanded", opening ? "true" : "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!menus.some((menu) => menu.contains(event.target))) {
      closeMenus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenus();
    }
  });

  const current = document.body?.dataset?.bnCurrent;
  if (current) {
    document.querySelectorAll(".bn-drop-link[data-bn-page]").forEach((link) => {
      if (link.dataset.bnPage === current) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }
})();
