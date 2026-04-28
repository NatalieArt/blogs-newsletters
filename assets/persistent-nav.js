(() => {
  const previewMap = {
    "blog-architectural-renders": {
      src: "https://natalieart.github.io/blogs-newsletters/assets/avatar-architectural.jpg?v=avatarswap10",
      alt: "Architectural renders article preview",
    },
    "blog-creative-assistant": {
      src: "https://natalieart.github.io/blogs-newsletters/assets/avatar-creative-assistant.jpg?v=avatarswap10",
      alt: "Creative Assistant article preview",
    },
    "blog-starting-ending-frames": {
      src: "https://natalieart.github.io/blogs-newsletters/assets/avatar-frames.jpg?v=avatarswap10",
      alt: "Starting and Ending Frames article preview",
    },
    "newsletter-19": {
      src: "https://news.sogni.ai/sogni-sync/assets/19/sogni-time.jpg",
      alt: "Newsletter volume 19 preview",
    },
    "newsletter-18": {
      src: "https://news.sogni.ai/sogni-sync/assets/18/sogni_tzapac_overeasy_kontext.jpg",
      alt: "Newsletter volume 18 preview",
    },
  };

  document.querySelectorAll(".bn-drop-link[data-bn-page]").forEach((link) => {
    const page = link.dataset.bnPage;
    const preview = page ? previewMap[page] : null;
    if (!preview) {
      return;
    }

    let copy = link.querySelector(".bn-drop-copy");
    if (!copy) {
      copy = document.createElement("span");
      copy.className = "bn-drop-copy";
      Array.from(link.children)
        .filter((child) =>
          child.classList?.contains("bn-drop-title") ||
          child.classList?.contains("bn-drop-meta"),
        )
        .forEach((child) => copy.appendChild(child));
      link.appendChild(copy);
    }

    if (!link.querySelector(".bn-drop-thumb")) {
      const thumb = document.createElement("span");
      thumb.className = "bn-drop-thumb";

      const img = document.createElement("img");
      img.src = preview.src;
      img.alt = preview.alt;
      img.loading = "lazy";

      thumb.appendChild(img);
      link.prepend(thumb);
    }
  });

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
