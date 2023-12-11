import { requestVideo } from './API';
import { searchEl, gallery } from '../search';
import { renderingMarkup } from './createMarkup';
import { target } from '../search';

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

let page = 1;

function onLoad(entries) {
  entries.forEach(entrie => {
    if (entrie.isIntersecting) {
      const requestValue = searchEl.elements.searchQuery.value;
      page += 1;
      requestVideo(requestValue, page)
        .then(resp => {
          renderingMarkup(resp.data.hits);

          gallery.refresh();

          const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        })
        .catch(error => console.log(error));
      if (!entrie.isIntersecting) {
        observer.unobserve(target);
      }
    }
  });
}

export { observer };
