import { Pagination } from "swiper";
import 'swiper/css/pagination';

import { getDOMElement, generateCopyright, generateSlider } from "./assets/js/utilities";

document.addEventListener('DOMContentLoaded', () => {
  const copyrightElem = getDOMElement('copyright');
  
  generateCopyright(copyrightElem);

  const heroSlider = generateSlider('hero-slider', {
    init: false,
    centeredSlides: true,
    effect: 'fade',
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    modules: [ Pagination ],
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  heroSlider?.init();
});
