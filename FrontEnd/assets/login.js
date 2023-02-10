import { login } from "./auth.js";

const formLogin = document.querySelector(".login-form");

formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();

  const user = {
    email: this.email.value,
    password: this.password.value,
  };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (data.userId === 1) {
    login(data.token);
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";

    login.appendChild(errorMessage);
  }
});
