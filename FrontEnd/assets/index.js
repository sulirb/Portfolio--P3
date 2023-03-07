import { fetchWorks } from "./api.js";
import { check, logout as logoutFromAuth } from "./auth.js";
import { createWorks, setCache, updateWorksOnFilter } from "./gallery.js";

//Appel de l'API

//Obtention des catégories de filtres à partir des données
export function getFilterCategories(works) {
  const categories = new Set();
  for (const work of works) {
    const category = work.category;
    categories.add(category.name);
  }

  return categories;
}

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

    filters.appendChild(filterButton);
  }

  // Ecouteur d'événement pour les filtres
  filters.addEventListener("click", updateWorksOnFilter);

  // Bouton qui s'active au clique sur le filtre
  const filterButtons = filters.querySelectorAll(".btn-filter, .btn-tous");

  for (const filter of filterButtons) {
    filter.addEventListener("click", function () {
      filterButtons.forEach((filter) => filter.classList.remove("btn-actif"));

      this.classList.add("btn-actif");
    });
  }
}

main();

// Reinitialisation
document.querySelector(".btn-tous").addEventListener("click", function (event) {
  const allWorks = data.filter(function (work) {
    return (
      work.category.name === "objets", "appartements", "hotels & restaurants"
    );
  });

  document.querySelector(".gallery").innerHTML = "";
  createWorks(allWorks);
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
  } else {
    body.classList.add("is-guest");
    body.classList.remove("is-admin");
  }
}

checkLoginStatus();

// Écouteur d'événement "click" pour le bouton de connexion
btnLogout.addEventListener("click", logoutFromAuth);
