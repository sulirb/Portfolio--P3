import { sectionGallery } from "./index";

//Création des éléments dans la galerie
export function createWorks(data) {
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

    const id = worksElement.getAttribute("data-id");
  }
}