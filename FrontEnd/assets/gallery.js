export const sectionGallery = document.querySelector(".gallery");

function createWork(article) {
  const worksElement = document.createElement("article");

  const imageElement = worksElement.appendChild(document.createElement("img"));
  imageElement.src = article.imageUrl;
  imageElement.setAttribute("crossorigin", "anonymous");

  const titleElement = worksElement.appendChild(document.createElement("p"));
  titleElement.innerText = article.title;

  const id = worksElement.getAttribute("data-id");
  return worksElement;
}

//Création des éléments dans la galerie
export function createWorks(data) {
  for (const article of data) {
    sectionGallery.appendChild(createWork(article));
  }
}

export function cleanWorks() {
  sectionGallery.textContent = "";
}

export function updateWorksOnFilter(event) {
  let works = cache;
  if (event) {
    const category = event.target.dataset.category;
    works = cache.filter((work) => work.category.name === category);
  }
  cleanWorks();
  createWorks(works);
}

export function getCache() {
  return cache;
}

export function setCache(works) {
  cache = works;
}

let cache = [];
