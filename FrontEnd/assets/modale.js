import { fetchWorks, deleteWorks } from "./api.js";

// Création de la logique d'ouverture de la modale

const myDialog = document.getElementById("myDialog");
const myButton = document.getElementById("myButton");
const closeButton = document.getElementById("js-modal-close");
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

// Supprime un ID
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
    worksElement.remove(); // supprime l'élément du DOM (supprime avant de refresh)
    e.stopPropagation();
  });
}

// Supprime tous les ID
function addDeleteAll() {
  const deleteAll = document.getElementById("delete-all");
  deleteAll.addEventListener("click", async function (e) {
    const worksElements = document.querySelectorAll("[data-id]");
    // Boucle sur chaque data id pour pouvoir les supprimer d'un coup
    for (let i = 0; i < worksElements.length; i++) {
      const id = worksElements[i].getAttribute("data-id");
      await deleteWorks(id);
      worksElements[i].remove(); // supprime les éléments du DOM (supprime avant de refresh)
      e.stopPropagation();
    }
  });
}

// Création de la 2ème page modale
const addPhotoButton = document.getElementById("add-photo");
const myDialogTwo = document.getElementById("myDialogTwo");
const closeButtonTwo = document.getElementById("js-modal-close-two");

// Bouton pour charger la 2ème page modale
function changeModal() {
  myDialog.close();
  myDialogTwo.showModal();
}

addPhotoButton.addEventListener("click", function (e) {
  e.preventDefault();
  changeModal();
});

// Fonction générale pour fermer la modale
function closeModal(dialog) {
  return dialog.close();
}

// Ferme la fenêtre modale lorsqu'on clique sur le bouton de fermeture
closeButton.addEventListener("click", function () {
  closeModal(myDialog);
});

// Ajoute la même fonctionnalité pour la 2ème modale
closeButtonTwo.addEventListener("click", function () {
  closeModal(myDialogTwo);
});

// Ferme les fenêtres modale lorsqu'on clique en dehors de la fenêtre
body.addEventListener("click", function (event) {
  if (event.target === myDialog || event.target === myDialogTwo) {
    closeModal(event.target);
  }
});

// Revient à la 1ère modale

const backMyDialog = document.getElementById("back-to-one");

function changeModalTwo() {
  myDialogTwo.close();
  myDialog.showModal();
}

backMyDialog.addEventListener("click", function (e) {
  e.preventDefault();
  changeModalTwo();
});
