import iziToast from "izitoast"; // Библиотека для отображения уведомлений
import SimpleLightbox from "simplelightbox";

      
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api'

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');

const onSearchFormSubmit = event => {
  event.preventDefault();
  const searchedQuery = event.currentTarget.user_query.value.trim();

  fetchPhotosByQuery(searchedQuery)
    .then(data => {
      if (data.total === 0) {
        iziToast.info({
        message: "Sorry, there are no images matching your search query. Please try again!" 
        })


        galleryEl.innerHTML = '';

        searchFormEl.reset();

        return;
      }

      const galleryTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');
      galleryEl.innerHTML = galleryTemplate;
    })
    .catch(err => {
      console.log(err);
    });
};

// const onModal = event => {
//   event.preventDefault();
//   if (event.target.nodeName === 'IMG') {
//     const instance = basicLightbox.create(`
//     <div class="modal">
//         <img class="product-modal-img" src="${event.target.dataset.source}" alt="${event.target.alt}" />
//     </div>
// `);

// instance.show()
//   }
// };


searchFormEl.addEventListener('submit', onSearchFormSubmit);

// galleryEl.addEventListener('click', onModal);