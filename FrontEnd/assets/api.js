import { check } from "./auth.js";

const baseUrl = "http://localhost:5678";
async function apiFetch(method, url, body, options = {}) {
  let token = check();
  const headers = { ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body instanceof FormData) headers["Content-Type"] = "multipart/form-data";
  else if (typeof body === "object")
    headers["Content-Type"] = "application/json";

  const response = await fetch(`${baseUrl}${url}`, { body, method, headers });
  let data = await response.text();
  try {
    data = JSON.parse(data);
  } catch (_) {}
  return data;
}

export const fetchWorks = () => apiFetch("GET", "/api/works");
export const deleteWorks = (id) => apiFetch("DELETE", `/api/works/${id}`);
export const postWorks = (formData) => apiFetch("POST", `/api/works`, formData);
