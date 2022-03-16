import { getDOMElement, isNotEmpty, isEmailValid, isPhoneValid } from './utilities';

export default function signupForm(elem: HTMLElement | null) {
  if (!elem) {
    return;
  }

  // console.log('signupFormElem: ', elem);

  const formData: { [key: string]: { elem: HTMLElement | null, value: string, isValid: boolean } } = {};

  const inputElems: NodeListOf<HTMLInputElement> = elem.querySelectorAll('input');

  inputElems.forEach(inputElem => {     
    if (inputElem.type === 'text') {
      formData[inputElem.id] = {
        elem: getDOMElement(inputElem.id),
        value: inputElem.value,
        isValid: false
      };
    } else if (inputElem.type === 'radio' && inputElem.checked) {
      formData[inputElem.id] = {
        elem: null,
        value: inputElem.value,
        isValid: false
      };
    }
  });

  const onBlurHandler = (event: Event) => {
    const { id, value } = event.target as HTMLInputElement;
    const formGroupElem = (event.target as HTMLInputElement).parentElement;

    switch (id) {
      case 'name':
      case 'company':
        formData[id].isValid = isNotEmpty(value);
        break;

      case 'email':
        formData[id].isValid = isEmailValid(value);
        break;

      case 'phone':
        formData[id].isValid = isPhoneValid(value);
        break;
    
      default:
        break;
    }

    if (formData[id].isValid) {
      formGroupElem?.classList.remove('form__group--is-invalid');
    } else {
      formGroupElem?.classList.add('form__group--is-invalid');
    }

    formData[id].value = value;
  };

  const onSubmitHandler = (event: Event) => {
    event.preventDefault();

    // 1. If any input is invalid return immediately and
    // give an invalid feedback (e.g: shake the form)
    // 2. Else send form data and give a valid feedback
    // (e.g: hide the form and show a green tick)
    const isFormValid = Object.keys(formData)
      .map(key => formData[key].isValid)
      .every(validity => validity === true);

    if (isFormValid) {
      const heroCardElem = elem.parentElement;

      heroCardElem?.classList.add('hero__card--flip');
    } else {
      elem.classList.add('shake-horizontal');
    }

    setTimeout(() => {
      elem.classList.remove('shake-horizontal');
    }, 1000);
  };

  elem.addEventListener('submit', onSubmitHandler);

  Object.keys(formData).forEach(key => {
    if (formData[key].elem !== null) {
      formData[key].elem?.addEventListener('blur', onBlurHandler);
    }
  });
}
