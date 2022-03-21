const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const getDOMElement = (id: string): HTMLElement | null => {
  return document.getElementById(id);
};

export const generateCopyright = (elem: HTMLElement | null) => {
  const year = new Date().getFullYear();
  const copyrightContent = `
    <p class="footer__text">© ${year}</p>
    <img src="assets/images/shared/officelite-logo-only.svg" alt="Officelite Challenge" class="footer__brand" />
    <p class="footer__text">Coded by <a href="https://github.com/christopher-adolphe/fm-challenge-officelite" aria-label="Christopher's github repository for the Officelite challenge on Frontend Mentor" target="_blank">Christopher Adolphe</a></p>
  `;

  if (!elem) {
    return;
  }

  elem.innerHTML = copyrightContent;
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim() !== '';
};

export const isEmailValid = (value: string): boolean => {
  return value.trim() !== '' && emailRegExp.test(value.trim());
};

export const isPhoneValid = (value: string): boolean => {
  return value.trim() !== '' && phoneRegExp.test(value.trim());
};

const Utilities = {
  getDOMElement,
  generateCopyright,
  isNotEmpty,
  isEmailValid,
  isPhoneValid
};

export default Utilities;
