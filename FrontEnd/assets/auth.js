export function logout() {
  window.location = "index.html";
  localStorage.removeItem("logged");
}

export function check() {
  return localStorage.getItem("logged");
}

export function login(token) {
  localStorage.setItem("logged", token);
  window.location = "index.html";
}
