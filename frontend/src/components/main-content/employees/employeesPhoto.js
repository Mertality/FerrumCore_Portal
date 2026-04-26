// src/components/main-content/employees/employeesPhoto.js

export let selectedPhotoData = null; // глобально храним Data URL

export function initPhotoPreview() {
  const input = document.getElementById("photo-input");
  const preview = document.getElementById("photo-preview");
  const trigger = document.getElementById("photo-trigger");
  const fileNameSpan = document.getElementById("photo-file-name");

  if (!input || !trigger || !fileNameSpan) return;

  trigger.addEventListener("click", () => {
    input.click();
  });

  input.addEventListener("change", () => {
    selectedPhotoData = null; // сбрасываем
    if (input.files && input.files[0]) {
      const file = input.files[0];
      fileNameSpan.textContent = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        selectedPhotoData = e.target.result;
        if (preview) {
          preview.src = selectedPhotoData;
          preview.style.display = "block";
        }
      };
      reader.readAsDataURL(file);
    } else {
      fileNameSpan.textContent = "Файл не выбран";
      if (preview) preview.style.display = "none";
      selectedPhotoData = null;
    }
  });
}
