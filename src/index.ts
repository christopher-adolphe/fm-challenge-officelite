import { getDOMElement, generateCopyright } from './assets/js/utilities';
import { customSelect, countdown, signupForm, animate } from './assets/js/index';

document.addEventListener('DOMContentLoaded', () => {
  const copyrightElem = getDOMElement('copyright');
  const countdownElem = getDOMElement('js-countdown');
  const signupFormElem = getDOMElement('js-signup');
  
  generateCopyright(copyrightElem);
  countdown(countdownElem);
  customSelect();
  signupForm(signupFormElem);
  animate();
});
