import "./main-content.css";
import { setTitle } from "../header/header.js";
import {
  renderEmployeesTable,
  initTableEvents,
} from "./employees/employeesTable.js";
import { initModalEvents } from "./employees/employeesModal.js";
import { initPhotoPreview } from "./employees/employeesPhoto.js";
import { initTabs } from "./settings/tabs.js";

const pageTitles = {
  home: "Главная",
  employees: "Сотрудники",
  calendar: "Календарь",
  settings: "Настройки",
};

function switchContent(page) {
  document
    .querySelectorAll(".main-content__section")
    .forEach((sec) => sec.classList.remove("active"));
  const activeSection = document.querySelector(`[data-content="${page}"]`);
  if (activeSection) activeSection.classList.add("active");
  setTitle(pageTitles[page] || page);
}

export function init() {
  const buttons = document.querySelectorAll(".left-panel__btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      switchContent(btn.dataset.page);
    });
  });

  // Стартовое состояние
  switchContent("home");
  renderEmployeesTable();

  // Поиск сотрудников
  const searchInput = document.getElementById("employee-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderEmployeesTable(searchInput.value);
    });
  }

  // Инициализируем модули
  initTableEvents();
  initModalEvents();
  initPhotoPreview();
  initTabs();
}
