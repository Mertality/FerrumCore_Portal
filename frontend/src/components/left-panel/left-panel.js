import "./left-panel.css"; // ← подключаем стили левой панели

export function init() {
  const buttons = document.querySelectorAll(".left-panel__btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const page = btn.dataset.page;
      console.log("Переход на страницу:", page);
    });
  });
}
