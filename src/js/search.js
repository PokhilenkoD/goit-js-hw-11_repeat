import { renderingMarkup, galleryEl } from './helpers/createMarkup';
import { requestVideo } from './helpers/API';
import ModalVideo from 'modal-video';
import { observer } from './helpers/observer';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentModal = null;

let gallery = new SimpleLightbox('.gallery_box a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchEl = document.querySelector('.js-search-form');
searchEl.addEventListener('submit', onSearchVideos);
const target = document.querySelector('.js-guard');

function onSearchVideos(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';

  const requestValue = searchEl.elements.searchQuery.value;

  if (requestValue) {
    requestVideo(requestValue.trim())
      .then(resp => {
        if (!resp.data.total) {
          Notify.failure('Некорректный запрос!');
          return;
        }
        renderingMarkup(resp.data.hits);

        gallery.refresh();
        observer.observe(target);

        setTimeout(btnListeneter, 1000);
      })
      .catch(error => console.log(error));
  } else {
    Notify.warning('Пожалуйста, введите запрос');
  }
}

function btnListeneter() {
  const btns = document.querySelectorAll('.js-modal-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', onClick);
  });

  function onClick(e) {
    console.log('work');
    currentModal = new ModalVideo(e.target);
  }
}

export { searchEl, target, gallery };
