import { fetchWorks, deleteWorks, postWorks } from "./api.js";

// Création de la logique d'ouverture de la modale

const galleryDialog = document.getElementById("galleryDialog");
const myButton = document.getElementById("myButton");
const galleryCloseButton = document.getElementById("galleryCloseButton");
const body = document.body;

// Ouvre la fenêtre modale lorsqu'on clique sur le bouton
function openModal() {
  return galleryDialog.showModal();
}
myButton.addEventListener("click", openModal);

const categoriesSet = {};
async function main() {
  const data = await fetchWorks();
  createWorks(data);

  // Utilisation des catégories sur le formulaire
  for (const work of data) {
    categoriesSet[work.category.name] = work.category.id;
  }

  const datalistElement = document.getElementById("category-id");
  for (const [name, id] of Object.entries(categoriesSet)) {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", id);
    optionElement.innerText = name;
    datalistElement.appendChild(optionElement);
  }
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
    addDeleteAll();
  }
}

function prevent(c) {
  return function (e, ...args) {
    e.preventDefault();
    return c(e, ...args);
  };
}

// Supprime un ID
function addDeleteButton(worksElement) {
  const deleteButton = worksElement.appendChild(
    document.createElement("button")
  );
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fas", "fa-trash-can");
  deleteButton.appendChild(trashIcon);
  deleteButton.type = "button";

  // Supression des éléments sur la modale
  deleteButton.addEventListener(
    "click",
    prevent(async function (e) {
      // Utilise l'id d'un work pour le supprimer
      const id = worksElement.getAttribute("data-id");
      deleteWorks(id);
      worksElement.remove(); // supprime l'élément du DOM (supprime avant de refresh)
    })
  );
}

// Supprime tous les ID
function addDeleteAll() {
  const deleteAll = document.getElementById("delete-all");
  deleteAll.addEventListener(
    "click",
    prevent(async function (e) {
      const worksElements = document.querySelectorAll("[data-id]");

      // Boucle sur chaque data id pour pouvoir les supprimer d'un coup
      for (let i = 0; i < worksElements.length; i++) {
        const id = worksElements[i].getAttribute("data-id");
        await deleteWorks(id);
        worksElements[i].remove(); // supprime les éléments du DOM (supprime avant de refresh)
      }
    })
  );
}

// Création de la 2ème page modale
const addPhotoButton = document.getElementById("add-photo");
const submitDialog = document.getElementById("submitDialog");
const submitCloseButton = document.getElementById("submitCloseButton");
const btnModalPrevious = document.getElementById("btn-modal-previous");

// Bouton pour charger la 2ème page modale
function changeModal() {
  galleryDialog.close();
  submitDialog.showModal();
}

addPhotoButton.addEventListener("click", function (e) {
  e.preventDefault();
  changeModal();
});

// Revient à la 1ère modale
function changeModalTwo() {
  submitDialog.close();
  galleryDialog.showModal();
}

btnModalPrevious.addEventListener("click", function (e) {
  e.preventDefault();
  changeModalTwo();
});

// Fonction générale pour fermer la modale
function closeModal(dialog) {
  return dialog.close();
}

// Ferme la fenêtre modale lorsqu'on clique sur le bouton de fermeture
galleryCloseButton.addEventListener("click", function () {
  closeModal(galleryDialog);
});

// Ajoute la même fonctionnalité pour la 2ème modale
submitCloseButton.addEventListener("click", function () {
  closeModal(submitDialog);
});

// Ferme les fenêtres modale lorsqu'on clique en dehors de la fenêtre
body.addEventListener("click", function (event) {
  if (event.target === galleryDialog || event.target === submitDialog) {
    closeModal(event.target);
  }
});

// Envoi d’un nouveau projet au back-end via le formulaire de la modale

const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(myForm);

  console.log(
    formData.get("image"),
    formData.get("title"),
    formData.get("category")
  );

  postWorks(formData).then(function (response) {
    if (response.status === "success") {
      console.log("Le formulaire a été envoyé avec succès !");
    } else {
      console.log("Erreur lors de l'envoi du formulaire:", response.message);
    }
  });
});

// Prévisualisation de l'image
imgInp.onchange = (evt) => {
  const [file] = imgInp.files;
  if (file) {
    photo.src = URL.createObjectURL(file);
    const photoIcon = document.querySelector(".fa-image");
    photoIcon.style.display = "none";
  }
};
