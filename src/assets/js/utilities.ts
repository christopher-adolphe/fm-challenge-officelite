import Swiper from "swiper";
import 'swiper/css';

export const getDOMElement = (id: string): HTMLElement | null => {
  return document.getElementById(id);
};

export const generateCopyright = (elem: HTMLElement | null) => {
  const year = new Date().getFullYear();
  const copyrightText = `© ${year}. Created by Christopher Adolphe`;

  if (!elem) {
    return;
  }

  elem.textContent = copyrightText;
};

export const generateSlider = (id: string, options: { [key: string]: any } | undefined): Swiper | undefined => {
  const sliderElem = getDOMElement(id);

  if (!sliderElem) {
    return;
  }

  const swiperSlider = new Swiper(`#${id}`, { ...options });

  return swiperSlider;
};

const Utilities = {
  getDOMElement,
  generateCopyright,
  generateSlider
};

export default Utilities;
