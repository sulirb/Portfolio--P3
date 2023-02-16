import { fetchWorks } from "./index.js";

// Création de la logique d'ouverture et fermeture de la modale

const myDialog = document.getElementById("myDialog");
const myButton = document.getElementById("myButton");
const closeButton = document.getElementById("js-modal-close");
const body = document.body;

// Ouvre la fenêtre modale lorsqu'on clique sur le bouton
function openModal() {
  return myDialog.showModal();
}
myButton.addEventListener("click", openModal);

// Ferme la fenêtre modale lorsqu'on clique sur le bouton de fermeture
function closeModal() {
  return myDialog.close();
}
closeButton.addEventListener("click", closeModal);

// Ferme la fenêtre modale lorsqu'on clique en dehors de la fenêtre
body.addEventListener("click", (event) => {
  if (event.target === myDialog) {
    closeModal();
  }
});

// Création des éléments dans la modale

async function main() {
  const data = await fetchWorks();
  createWorks(data);
}

main();

const sectionGallery = document.querySelector(".modal-gallery");

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
    titleElement.innerText = "éditer";

    const deleteButton = worksElement.appendChild(
      document.createElement("button")
    );
    deleteButton.innerHTML = '<i class="fa fa-solid fa-trash-can"></i>';
  }
}
