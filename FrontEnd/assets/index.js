import { fetchWorks } from "./api.js";
import { check, logout as logoutFromAuth } from "./auth.js";
import {
  cleanWorks,
  createWorks,
  setCache,
  updateWorksOnFilter,
} from "./gallery.js";

let data;

async function main() {
  data = await fetchWorks();
  setCache(data);
  updateWorksOnFilter();

  // Récuperation des catégories présentes dans l'api
  const filters = document.querySelector(".filters");

  const categoriesSet = new Set();
  for (const work of data) {
    categoriesSet.add(work.category.name);
  }

  const categories = Array.from(categoriesSet);

  // Ajout des filtres sur le JS
  for (const category of categories) {
    const filterButton = document.createElement("button");

    filterButton.innerText = category;
    filterButton.classList.add("btn-filter");
    filterButton.dataset.category = category;
    // Ecouteur d'événement pour les filtres
    filterButton.addEventListener("click", updateWorksOnFilter);
    filters.appendChild(filterButton);
  }

  // Bouton qui s'active au clique sur le filtre
  const filterButtons = filters.querySelectorAll(".btn-filter, .btn-tous");

  for (const filter of filterButtons) {
    filter.addEventListener("click", function () {
      filterButtons.forEach((filter) => filter.classList.remove("btn-actif"));

      this.classList.add("btn-actif");
    });
  }
}

// Reinitialisation
document.querySelector(".btn-tous").addEventListener("click", function () {
  updateWorksOnFilter();
});

// Changement d'état de la page si l'utilisateur est connecté

// Bouton de connexion et de déconnexion dans le menu
const btnLogout = document.querySelector(".only-admin a");

//Application des éléments selon statut de connexion
function checkLoginStatus() {
  const isLogged = check();

  if (isLogged) {
    let body = document.querySelector("body");
    body.classList.add("is-admin");
    body.classList.remove("is-guest");
  }
}

// Écouteur d'événement "click" pour le bouton de connexion
btnLogout.addEventListener("click", logoutFromAuth);

main();
checkLoginStatus();
