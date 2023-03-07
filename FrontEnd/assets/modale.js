import { fetchWorks, deleteWorks as apiDeleteWorks, postWorks } from "./api.js";
import {
  cleanWorks,
  getCache,
  setCache,
  updateWorksOnFilter,
} from "./gallery.js";
// Création de la logique d'ouverture de la modale

const galleryDialog = document.getElementById("galleryDialog");
const myButton = document.getElementById("myButton");
const galleryCloseBtn = document.getElementById("galleryCloseButton");
const body = document.body;
const modaleGallery = document.querySelector(".modal-gallery");
const deleteAll = document.getElementById("delete-all");
const myForm = document.getElementById("myForm");
const addImageButton = document.getElementById("add-image-button");
const addPhotoButton = document.getElementById("add-photo");
const submitDialog = document.getElementById("submitDialog");
const submitCloseBtn = document.getElementById("submitCloseButton");
const btnModalPrevious = document.getElementById("btn-modal-previous");

// Supprime tous les ID
async function deleteAllWorks(e) {
  const worksElements = document.querySelectorAll("[data-id]");
  // Boucle sur chaque data id pour pouvoir les supprimer d'un coup
  for (let i = 0; i < worksElements.length; i++) {
    e.preventDefault();
    const id = worksElements[i].getAttribute("data-id");
    await apiDeleteWorks(id);
    worksElements[i].remove();
  }
}

// Supprime un ID
async function deleteWork(e) {
  // Utilise l'id d'un work pour le supprimer
  console.log(e);
  e.preventDefault();
  const id = e.target.dataset.id;
  await apiDeleteWorks(id);
  let cache = getCache();
  cache = cache.filter((work) => work.id != id);
  setCache(cache);
  updateGalleries();
}

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

// Création des éléments dans la modale

function updateGalleries() {
  updateWorksOnFilter();
  cleanModal();
  createWorks();
}

function cleanModal() {
  modaleGallery.textContent = "";
}

function createWorks() {
  const data = getCache();
  for (const article of data) {
    // Création des works
    const worksElmt = modaleGallery.appendChild(
      document.createElement("article")
    );
    // Extrait l'id de chaque work
    worksElmt.dataset.id = article.id;

    const imageElement = worksElmt.appendChild(document.createElement("img"));
    imageElement.src = article.imageUrl;
    imageElement.crossOrigin = "anonymous";

    const titleElement = worksElmt.appendChild(document.createElement("p"));
    titleElement.innerText = "éditer";

    const moveBtn = worksElmt.appendChild(document.createElement("button"));
    moveBtn.classList.add("move-button");

    const moveIcn = moveBtn.appendChild(document.createElement("i"));
    moveIcn.classList.add("fas", "fa-arrows-up-down-left-right");

    const deleteBtn = worksElmt.appendChild(document.createElement("button"));
    deleteBtn.classList.add("delete-button");

    const trashIcn = document.createElement("i");
    trashIcn.classList.add("fas", "fa-trash-can");
    deleteBtn.appendChild(trashIcn);
    deleteBtn.dataset.id = article.id;

    // Supression des éléments sur la modale
    deleteBtn.addEventListener("click", deleteWork);
  }
}

// Supprime tous les ID

deleteAll.addEventListener("click", deleteAllWorks);

// Envoi d’un nouveau projet au back-end via le formulaire de la modale

myForm.addEventListener("submit", async function (e) {
  const formData = new FormData(myForm);
  const work = await postWorks(formData);
  let cache = getCache();
  cache.push(work);
  setCache(cache);
  updateGalleries();
  openModal();
});

// Rajout bouton pour ajouter une image
// Ajout d'un événement "click" au bouton
addImageButton.addEventListener("click", () => {
  imgInp.click();
});

// Prévisualisation de l'image
imgInp.onchange = (evt) => {
  const [file] = imgInp.files;
  if (file) {
    photo.src = URL.createObjectURL(file);
    const photoIcon = document.querySelector(".fa-image");
    photoIcon.style.display = "none";
    addImageButton.style.display = "none";
    document.getElementById("infoText").style.display = "none";
    document.querySelector('input[type="submit"]').style.backgroundColor =
      "#1d6154";
  }
};

addPhotoButton.addEventListener("click", function (e) {
  e.preventDefault();
  changeToModaleSubmit();
});

// Bouton pour charger la 2ème page modale
function changeToModaleSubmit() {
  galleryDialog.close();
  submitDialog.showModal();
}
// Revient à la 1ère modale
function changeToModaleGallery() {
  submitDialog.close();
  galleryDialog.showModal();
}
// Fonction générale pour fermer la modale
function closeModal(dialog) {
  return dialog.close();
}

btnModalPrevious.addEventListener("click", function (e) {
  e.preventDefault();
  changeToModaleGallery();
});

galleryCloseBtn.addEventListener("click", () => closeModal(galleryDialog));
submitCloseBtn.addEventListener("click", () => closeModal(submitDialog));

// Ferme les fenêtres modale lorsqu'on clique en dehors de la fenêtre
body.addEventListener("click", function (event) {
  if (event.target === galleryDialog || event.target === submitDialog) {
    closeModal(event.target);
  }
});

main();
