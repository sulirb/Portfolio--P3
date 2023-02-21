import { fetchWorks, deleteWorks } from "./api.js";

// Création de la logique d'ouverture de la modale

const myDialog = document.getElementById("myDialog");
const myButton = document.getElementById("myButton");
const closeButton = document.getElementById("js-modal-close");
// const deleteAll = document.getElementById("delete-all");
const body = document.body;

// Ouvre la fenêtre modale lorsqu'on clique sur le bouton
function openModal() {
  return myDialog.showModal();
}
myButton.addEventListener("click", openModal);

async function main() {
  const data = await fetchWorks();
  createWorks(data);
}

main();

// Création des éléments dans la modale

const modaleGallery = document.querySelector(".modal-gallery");

function createWorks(data) {
  for (const article of data) {
    // Création des works
    const worksElement = modaleGallery.appendChild(
      document.createElement("article")
    );

    const imageElement = worksElement.appendChild(
      document.createElement("img")
    );
    imageElement.src = article.imageUrl;
    imageElement.setAttribute("crossorigin", "anonymous");

    const titleElement = worksElement.appendChild(document.createElement("p"));
    titleElement.innerText = "éditer";

    // Extrait l'id de chaque work
    worksElement.setAttribute("data-id", article.id);

    addDeleteButton(worksElement);
    addDeleteAll(worksElement);
  }
}

function addDeleteButton(worksElement) {
  // Création du bouton de suppression sur les éléments
  const deleteButton = worksElement.appendChild(
    document.createElement("button")
  );
  deleteButton.innerHTML = '<i class="fa fa-solid fa-trash-can"></i>';

  // Supression des éléments sur la modale
  deleteButton.addEventListener("click", async function (e) {
    // Utilise l'id d'un work pour le supprimer
    const id = worksElement.getAttribute("data-id");
    deleteWorks(id);
    worksElement.remove();
    e.preventDefault();
  });
}

function addDeleteAll() {
  const deleteAll = document.getElementById("delete-all");
  deleteAll.addEventListener("click", async function (e) {
    e.preventDefault();
    const worksElements = document.querySelectorAll("[data-id]");
    for (let i = 0; i < worksElements.length; i++) {
      const id = worksElements[i].getAttribute("data-id");
      await deleteWorks(id);
      worksElements[i].remove(); // supprime l'élément du DOM
    }
  });
}

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
