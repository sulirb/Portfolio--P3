async function genererWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  console.log(data);

  const sectionGallery = document.querySelector(".gallery");

  for (let i = 0; i < data.length; i++) {
    const article = data[i];
    // Création d’une balise dédiée à un élément de la gallery
    const worksElement = document.createElement("article");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    const titleElement = document.createElement("p");
    titleElement.innerText = article.title;

    // On rattache la balise article a la section gallery
    worksElement.appendChild(imageElement);
    worksElement.appendChild(titleElement);
    sectionGallery.appendChild(worksElement);
  }
}

genererWorks();
