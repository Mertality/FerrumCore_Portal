import "./layout.css"; // ← обязательно !

import headerHtml from "../header/header.html?raw";
import leftPanelHtml from "../left-panel/left-panel.html?raw";
import mainContentHtml from "../main-content/main-content.html?raw";
import rightPanelHtml from "../right-panel/right-panel.html?raw";
import footerHtml from "../footer/footer.html?raw";

export function renderLayout() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <div class="layout">
      <header class="layout__header">${headerHtml}</header>
      <aside class="layout__left">${leftPanelHtml}</aside>
      <main class="layout__main">${mainContentHtml}</main>
      <aside class="layout__right">${rightPanelHtml}</aside>
      <footer class="layout__footer">${footerHtml}</footer>
    </div>
  `;

  // Динамически подключаем JS-модули компонентов (они сами импортируют свои CSS)
  import("../header/header.js").then((m) => m.init?.());
  import("../left-panel/left-panel.js").then((m) => m.init?.());
  import("../main-content/main-content.js").then((m) => m.init?.());
  import("../right-panel/right-panel.js").then((m) => m.init?.());
  import("../footer/footer.js").then((m) => m.init?.());
}
