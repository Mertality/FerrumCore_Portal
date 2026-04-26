import "./header.css";

export function setTitle(title) {
  const titleEl = document.querySelector(".header__page-title");
  if (titleEl) {
    titleEl.textContent = title;
  }
}

export function init() {
  // пока ничего дополнительного
}
