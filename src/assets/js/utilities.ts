const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

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
