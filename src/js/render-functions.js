export const createGalleryCardTemplate = imgInfo => {
  return `
    <li class="gallery-card">
      <img class="gallery-img" src="${imgInfo.webformatURL}" data-source="${imgInfo.largeImageURL}" alt="${imgInfo.tags}"  />
    </li>
  `;
};