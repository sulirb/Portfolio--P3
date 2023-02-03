const formLogin = document.querySelector(".login-form");

formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = formLogin.elements.email.value;
  const password = formLogin.elements.password.value;
  const user = { email, password };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  console.log(data);
});
