const myDialog = document.getElementById("myDialog");
const myButton = document.getElementById("myButton");
const closeButton = document.getElementById("js-modal-close");
const body = document.body;
const myDiv = document.getElementById("myDiv");

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
