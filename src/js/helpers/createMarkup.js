const galleryEl = document.querySelector('.js-gallery');

function renderingMarkup(respArray) {
  const markup = respArray
    .map(
      ({
        tags,
        largeImageURL,
        webformatURL,
        views,
        downloads,
        likes,
        comments,
      }) =>
        `<div class='gallery_box'>
             <div class='gallery_video'>
               <a href="${largeImageURL}">
               <img class='gallery_img' src="${webformatURL}" alt="${tags}">
               </a>
             </div>
             <div class='gallery_description'>
                  <p class="gellery_text">Comments: <span>${comments}</span></p>
                  <p class="gellery_text">Views: <span>${views}</span></p>
                  <p class="gellery_text">Downloads: <span>${downloads}</span></p>
                  <p class="gellery_text">Likes: <span>${likes}</span></p>
              </div>
        </div>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}

export { renderingMarkup, galleryEl };
