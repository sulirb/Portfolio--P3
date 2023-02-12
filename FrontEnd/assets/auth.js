export function logout() {
  localStorage.removeItem("token");
  window.location = "index.html";
}

export function check() {
  return localStorage.getItem("token");
}

export function login(token) {
  localStorage.setItem("token", token);
  window.location = "index.html";
}
