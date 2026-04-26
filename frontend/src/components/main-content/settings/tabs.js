export function initTabs() {
  document.querySelectorAll(".spatial-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".spatial-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const tabName = tab.dataset.tab;
      document
        .querySelectorAll(".settings-tab-content")
        .forEach((c) => c.classList.remove("active"));
      const target = document.querySelector(`[data-tab-content="${tabName}"]`);
      if (target) target.classList.add("active");
    });
  });
}
