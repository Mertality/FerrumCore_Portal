import { getEmployees, filterEmployees, getYearsOfExp } from "./employeesDb.js";

export function renderEmployeesTable(filter = "") {
  const tbody = document.querySelector("#employees-table tbody");
  if (!tbody) return;
  const employees = filter ? filterEmployees(filter) : getEmployees();
  tbody.innerHTML = employees
    .map(
      (emp) => `
    <tr>
      <td>
        ${emp.photo ? `<img src="${emp.photo}" class="employee-photo" alt="photo">` : `<span class="material-symbols-outlined" style="font-size:40px; color:var(--text-tertiary);">account_circle</span>`}
      </td>
      <td>${emp.lastName} ${emp.firstName} ${emp.middleName || ""}</td>
      <td>${emp.department}</td>
      <td>${getYearsOfExp(emp.hireDate)} лет</td>
      <td>
        <button class="spatial-btn edit-btn" data-id="${emp.id}" title="Редактировать">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="spatial-btn delete-btn" data-id="${emp.id}" title="Удалить">
          <span class="material-symbols-outlined">delete</span>
        </button>
        <button class="spatial-btn card-btn" data-id="${emp.id}" title="Открыть карточку">
          <span class="material-symbols-outlined">open_in_new</span>
        </button>
      </td>
    </tr>
  `,
    )
    .join("");

  // Обновим счётчик на главной
  const total = getEmployees().length;
  const totalEl = document.getElementById("total-employees");
  if (totalEl) totalEl.textContent = total;
}

export function initTableEvents() {
  const tableBody = document.querySelector("#employees-table tbody");
  if (!tableBody) return;

  tableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.classList.contains("delete-btn")) {
      // событие удаления
      window.dispatchEvent(
        new CustomEvent("employee-delete", { detail: { id } }),
      );
    } else if (btn.classList.contains("edit-btn")) {
      window.dispatchEvent(
        new CustomEvent("employee-edit", { detail: { id } }),
      );
    } else if (btn.classList.contains("card-btn")) {
      window.dispatchEvent(
        new CustomEvent("employee-card", { detail: { id } }),
      );
    }
  });
}
