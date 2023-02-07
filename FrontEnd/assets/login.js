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
    window.location = "index.html";
    localStorage.setItem("connecté", data.token);
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Combinaison e-mail / mot de passe invalide.";

    login.appendChild(errorMessage);
  }
});
