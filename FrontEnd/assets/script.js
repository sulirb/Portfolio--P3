const response = await fetch("http://localhost:5678/api/works");
const data = await response.json();

function genererWorks(data) {
  const sectionGallery = document.querySelector(".gallery");

  for (let i = 0; i < data.length; i++) {
    const article = data[i];
    // Création d’une balise dédiée à un élément de la gallery
    const worksElement = document.createElement("article");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    // Affichage des images
    imageElement.setAttribute("crossorigin", "anonymous");
    const titleElement = document.createElement("p");
    titleElement.innerText = article.title;

    // On rattache la balise article a la section gallery
    worksElement.appendChild(imageElement);
    worksElement.appendChild(titleElement);
    sectionGallery.appendChild(worksElement);
  }
}

genererWorks(data);

// Reinitialisation
const boutonTous = document.querySelector(".btn-tous");

boutonTous.addEventListener("click", function () {
  const worksFiltered = data.filter(function (work) {
    return work.categoryId === 1, 2, 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(worksFiltered);
});

// Installation filtre 1
const boutonObjet = document.querySelector(".btn-objet");

boutonObjet.addEventListener("click", function () {
  const worksFiltered = data.filter(function (work) {
    return work.categoryId === 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(worksFiltered);
});

// Installation filtre 2
const boutonAppart = document.querySelector(".btn-appart");

boutonAppart.addEventListener("click", function () {
  const worksFiltered = data.filter(function (work) {
    return work.categoryId === 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(worksFiltered);
});

// Installation filtre 3
const boutonHotel = document.querySelector(".btn-hotel");

boutonHotel.addEventListener("click", function () {
  const worksFiltered = data.filter(function (work) {
    return work.categoryId === 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(worksFiltered);
});
