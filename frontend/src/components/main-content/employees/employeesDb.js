let employees = JSON.parse(localStorage.getItem("employees") || "[]");

export function getEmployees() {
  return employees;
}

export function saveEmployees() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

export function addEmployee(emp) {
  employees.push(emp);
  saveEmployees();
}

export function updateEmployee(id, data) {
  const index = employees.findIndex((e) => e.id === id);
  if (index !== -1) {
    employees[index] = data;
    saveEmployees();
  }
}

export function deleteEmployee(id) {
  employees = employees.filter((e) => e.id !== id);
  saveEmployees();
}

export function filterEmployees(query) {
  const q = query.toLowerCase();
  return employees.filter((emp) => {
    const full =
      `${emp.lastName} ${emp.firstName} ${emp.middleName || ""} ${emp.department}`.toLowerCase();
    return full.includes(q);
  });
}

export function getYearsOfExp(hireDate) {
  const now = new Date();
  const hire = new Date(hireDate);
  let years = now.getFullYear() - hire.getFullYear();
  if (
    now.getMonth() < hire.getMonth() ||
    (now.getMonth() === hire.getMonth() && now.getDate() < hire.getDate())
  ) {
    years--;
  }
  return years;
}
