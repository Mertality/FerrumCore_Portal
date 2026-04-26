// src/components/main-content/employees/employeesModal.js
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./employeesDb.js";
import { renderEmployeesTable } from "./employeesTable.js";
import { selectedPhotoData } from "./employeesPhoto.js";

let minimizedData = null;

// ==================== МОДАЛЬНОЕ ОКНО ====================
export function openModal(employee = null) {
  const modal = document.getElementById("employee-modal");
  const dialog = document.getElementById("modal-dialog");
  const form = document.getElementById("employee-form");
  const title = document.getElementById("modal-title");
  const preview = document.getElementById("photo-preview");
  const fileInput = document.getElementById("photo-input");
  const fileNameSpan = document.getElementById("photo-file-name");

  // Сбрасываем анимации
  if (dialog) {
    dialog.classList.remove("minimizing", "restoring");
    dialog.style.transform = "";
    dialog.style.opacity = "";
    dialog.style.transition = "";
  }

  // Очищаем кастомный файловый инпут
  if (fileInput) fileInput.value = "";
  if (fileNameSpan) fileNameSpan.textContent = "Файл не выбран";
  // Импортированная переменная selectedPhotoData сбрасывается
  import("./employeesPhoto.js").then((mod) => {
    if (mod.selectedPhotoData !== undefined) mod.selectedPhotoData = null;
  });

  modal.classList.add("active");

  if (employee) {
    title.textContent = "Редактировать сотрудника";
    form.elements.lastName.value = employee.lastName;
    form.elements.firstName.value = employee.firstName;
    form.elements.middleName.value = employee.middleName || "";
    form.elements.birthDate.value = employee.birthDate;
    form.elements.hireDate.value = employee.hireDate;
    form.elements.department.value = employee.department;
    form.elements.workPhone.value = employee.workPhone || "";
    form.elements.mobilePhone.value = employee.mobilePhone || "";
    form.elements.office.value = employee.office || "";
    form.elements.id.value = employee.id;

    if (employee.photo) {
      preview.src = employee.photo;
      preview.style.display = "block";
      // Синхронизируем selectedPhotoData
      import("./employeesPhoto.js").then((mod) => {
        if (mod.selectedPhotoData !== undefined)
          mod.selectedPhotoData = employee.photo;
      });
      if (fileNameSpan) fileNameSpan.textContent = "Уже загружено";
    } else {
      preview.style.display = "none";
      if (fileNameSpan) fileNameSpan.textContent = "Файл не выбран";
    }
  } else {
    title.textContent = "Добавить сотрудника";
    form.reset();
    form.elements.id.value = "";
    preview.style.display = "none";
  }
  minimizedData = null;
  updateMinimizedButton();
}

export function closeModal() {
  const modal = document.getElementById("employee-modal");
  modal.classList.remove("active");
  minimizedData = null;
  updateMinimizedButton();
  const dialog = document.getElementById("modal-dialog");
  if (dialog) {
    dialog.classList.remove("minimizing", "restoring");
    dialog.style.transform = "";
    dialog.style.opacity = "";
    dialog.style.transition = "";
  }
}

// ==================== СВОРАЧИВАНИЕ ====================
function captureFormData() {
  const form = document.getElementById("employee-form");
  return {
    id: form.elements.id.value,
    lastName: form.elements.lastName.value,
    firstName: form.elements.firstName.value,
    middleName: form.elements.middleName.value,
    birthDate: form.elements.birthDate.value,
    hireDate: form.elements.hireDate.value,
    department: form.elements.department.value,
    workPhone: form.elements.workPhone.value,
    mobilePhone: form.elements.mobilePhone.value,
    office: form.elements.office.value,
    photoPreview: document.getElementById("photo-preview").src,
  };
}

function restoreFormData(data) {
  const form = document.getElementById("employee-form");
  const preview = document.getElementById("photo-preview");
  const fileNameSpan = document.getElementById("photo-file-name");

  form.elements.lastName.value = data.lastName;
  form.elements.firstName.value = data.firstName;
  form.elements.middleName.value = data.middleName || "";
  form.elements.birthDate.value = data.birthDate;
  form.elements.hireDate.value = data.hireDate;
  form.elements.department.value = data.department;
  form.elements.workPhone.value = data.workPhone || "";
  form.elements.mobilePhone.value = data.mobilePhone || "";
  form.elements.office.value = data.office || "";
  form.elements.id.value = data.id;

  if (data.photoPreview) {
    preview.src = data.photoPreview;
    preview.style.display = "block";
    selectedPhotoData = data.photoPreview;
    if (fileNameSpan) fileNameSpan.textContent = "Восстановлено";
  } else {
    preview.style.display = "none";
    selectedPhotoData = null;
    if (fileNameSpan) fileNameSpan.textContent = "Файл не выбран";
  }
}

export function minimizeModal() {
  minimizedData = captureFormData();
  const modal = document.getElementById("employee-modal");
  const dialog = document.getElementById("modal-dialog");

  if (dialog) {
    dialog.classList.add("minimizing");
    dialog.addEventListener(
      "transitionend",
      function handler() {
        dialog.removeEventListener("transitionend", handler);
        modal.classList.remove("active");
        dialog.classList.remove("minimizing");
        updateMinimizedButton();
      },
      { once: true },
    );
  } else {
    modal.classList.remove("active");
    updateMinimizedButton();
  }
}

export function restoreModal() {
  if (!minimizedData) return;
  const modal = document.getElementById("employee-modal");
  const dialog = document.getElementById("modal-dialog");

  modal.classList.add("active");
  restoreFormData(minimizedData);
  document.getElementById("modal-title").textContent = minimizedData.id
    ? "Редактировать сотрудника"
    : "Добавить сотрудника";

  if (dialog) {
    dialog.classList.add("restoring");
    dialog.style.transform = "translateY(150%) scale(0.3)";
    dialog.style.opacity = "0";
    requestAnimationFrame(() => {
      dialog.style.transition =
        "transform 0.4s ease-out, opacity 0.3s ease-out";
      dialog.style.transform = "translateY(0) scale(1)";
      dialog.style.opacity = "1";
    });
    dialog.addEventListener(
      "transitionend",
      function handler() {
        dialog.removeEventListener("transitionend", handler);
        dialog.classList.remove("restoring");
        dialog.style.transform = "";
        dialog.style.opacity = "";
        dialog.style.transition = "";
      },
      { once: true },
    );
  }

  updateMinimizedButton();
}

function updateMinimizedButton() {
  const container = document.getElementById("minimized-container");
  if (!container) return;

  if (minimizedData) {
    container.innerHTML = `
      <button class="minimized-btn" id="restore-modal-btn">
        <span class="material-symbols-outlined">edit</span>
        ${minimizedData.lastName || "Сотрудник"}
      </button>
    `;
    document
      .getElementById("restore-modal-btn")
      ?.addEventListener("click", restoreModal);
  } else {
    container.innerHTML = "";
  }
}

// ==================== ОТПРАВКА ФОРМЫ ====================
export function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const id = form.elements.id.value;
  // Используем selectedPhotoData или резервный вариант
  const photo =
    selectedPhotoData || document.getElementById("photo-preview")?.src || "";

  const employeeData = {
    id: id || Date.now().toString(),
    lastName: form.elements.lastName.value.trim(),
    firstName: form.elements.firstName.value.trim(),
    middleName: form.elements.middleName.value.trim(),
    birthDate: form.elements.birthDate.value,
    hireDate: form.elements.hireDate.value,
    department: form.elements.department.value,
    workPhone: form.elements.workPhone.value.trim(),
    mobilePhone: form.elements.mobilePhone.value.trim(),
    office: form.elements.office.value.trim(),
    photo,
  };

  if (id) {
    updateEmployee(id, employeeData);
  } else {
    addEmployee(employeeData);
  }
  renderEmployeesTable(document.getElementById("employee-search")?.value || "");
  closeModal();
}

// ==================== ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ ====================
export function initModalEvents() {
  // Кнопка "Добавить сотрудника"
  document
    .getElementById("add-employee-btn")
    ?.addEventListener("click", () => openModal());

  // Закрытие по кнопке "Отмена"
  document
    .getElementById("modal-cancel")
    ?.addEventListener("click", closeModal);

  // Закрытие по клику на оверлей
  document.getElementById("employee-modal")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Сворачивание
  document
    .getElementById("modal-minimize")
    ?.addEventListener("click", minimizeModal);

  // Отправка формы
  document
    .getElementById("employee-form")
    ?.addEventListener("submit", handleFormSubmit);

  // Обработка событий от таблицы (редактирование, удаление, карточка)
  window.addEventListener("employee-edit", (e) => {
    const emp = getEmployees().find((emp) => emp.id === e.detail.id);
    if (emp) openModal(emp);
  });

  window.addEventListener("employee-delete", (e) => {
    deleteEmployee(e.detail.id);
    renderEmployeesTable(
      document.getElementById("employee-search")?.value || "",
    );
  });

  window.addEventListener("employee-card", (e) => {
    const emp = getEmployees().find((emp) => emp.id === e.detail.id);
    if (emp) {
      // Заглушка: показываем alert, позже будет полноценная карточка
      alert(
        `Карточка сотрудника:\n${emp.lastName} ${emp.firstName}\nОтдел: ${emp.department}`,
      );
    }
  });
}
