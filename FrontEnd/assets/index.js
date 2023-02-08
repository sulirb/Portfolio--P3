//Appel de l'API
async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  return data;
}

const sectionGallery = document.querySelector(".gallery");

//Création des éléments dans la galerie
function createWorks(data) {
  for (const article of data) {
    const worksElement = sectionGallery.appendChild(
      document.createElement("article")
    );

    const imageElement = worksElement.appendChild(
      document.createElement("img")
    );
    imageElement.src = article.imageUrl;
    imageElement.setAttribute("crossorigin", "anonymous");

    const titleElement = worksElement.appendChild(document.createElement("p"));
    titleElement.innerText = article.title;
  }
}

//Obtention des catégories de filtres à partir des données
export const getFilterCategories = function (works) {
  const categories = new Set();
  for (const work of works) {
    const category = work.category;
    categories.add(category.name);
  }

  return categories;
};

let data;

async function main() {
  data = await fetchWorks();
  createWorks(data);

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
  filters.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-filter")) {
      const category = event.target.dataset.category;

      const filteredWorks = data.filter(function (work) {
        return work.category.name === category;
      });

      sectionGallery.innerHTML = "";
      createWorks(filteredWorks);
    }
  });

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

const btnLog = document.querySelector(".btn-log a");

const checkLoginStatus = function () {
  const isLogged = localStorage.getItem("logged");

  if (isLogged) {
    btnLog.textContent = "logout";
    btnLog.href = "index.html";
    btnLog.addEventListener("click", logout);
  } else {
    btnLog.textContent = "login";
    btnLog.href = "login.html";
    btnLog.removeEventListener("click", logout);
  }
};

const logout = function () {
  localStorage.removeItem("logged");
  checkLoginStatus();
};

checkLoginStatus();
