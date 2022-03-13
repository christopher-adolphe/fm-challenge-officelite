import { getDOMElement, generateCopyright } from './assets/js/utilities';
import { customSelect, countdown } from './assets/js/index';

document.addEventListener('DOMContentLoaded', () => {
  const copyrightElem = getDOMElement('copyright');
  const countdownElem = getDOMElement('js-countdown');
  
  generateCopyright(copyrightElem);

  customSelect();

  countdown(countdownElem);
});
