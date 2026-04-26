import "./styles/global.css";
import { renderLayout } from "./components/layout/layout.js";

// Запускаем отрисовку после загрузки DOM
window.addEventListener("DOMContentLoaded", () => {
  renderLayout();
});
