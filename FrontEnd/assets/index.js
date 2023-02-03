//Appel de l'api
async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  return data;
}

const sectionGallery = document.querySelector(".gallery");

function createWorks(data) {
  for (const article of data) {
    // Création d’une balise dédiée à un élément de la gallery
    const worksElement = sectionGallery.appendChild(
      document.createElement("article")
    );

    // Création des balises
    const imageElement = worksElement.appendChild(
      document.createElement("img")
    );
    imageElement.src = article.imageUrl;
    // Affichage des images
    imageElement.setAttribute("crossorigin", "anonymous");

    const titleElement = worksElement.appendChild(document.createElement("p"));
    titleElement.innerText = article.title;
  }
}

let data;
async function main() {
  data = await fetchWorks();
  createWorks(data);
}

main();

// Reinitialisation
document.querySelector(".btn-tous").addEventListener("click", function () {
  const worksFiltered = data.filter(function (work) {
    return work.categoryId === 1, 2, 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  createWorks(worksFiltered);
});

// Installation filtre 1
document.querySelector(".btn-objet").addEventListener("click", function () {
  const worksFiltered = data.filter(function (work) {
    return work.categoryId === 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  createWorks(worksFiltered);
});

// Installation filtre 2
document.querySelector(".btn-appart").addEventListener("click", function () {
  const worksFiltered = data.filter(function (work) {
    return work.categoryId === 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  createWorks(worksFiltered);
});

// Installation filtre 3
document.querySelector(".btn-hotel").addEventListener("click", function () {
  const worksFiltered = data.filter(function (work) {
    return work.categoryId === 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  createWorks(worksFiltered);
});

// Couleur active sur les boutons
const boutons = document.querySelectorAll(".btn-filter");

for (const bouton of boutons) {
  bouton.addEventListener("click", function () {
    boutons.forEach((bouton) => bouton.classList.remove("btn-actif"));
    this.classList.add("btn-actif");
  });
}
