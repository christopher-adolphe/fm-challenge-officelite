import { getDOMElement, isNotEmpty, isEmailValid, isPhoneValid } from './utilities';

export default function signupForm(formElem: HTMLElement | null) {
  if (!formElem) {
    return;
  }

  const formData: { [key: string]: { elem: HTMLElement | null, value: string, isValid: boolean } } = {};
  const inputElems: NodeListOf<HTMLInputElement> = formElem.querySelectorAll('input');

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

  console.log('inputElems: ', inputElems);
  console.log('formData: ', formData);

  const onBlurHandler = (event: Event) => {
    const { id, value } = event.target as HTMLInputElement;
    const formGroupElem: HTMLElement | null = (event.target as HTMLInputElement).parentElement;

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
      const heroCardElem: HTMLElement | null = formElem.parentElement;

      heroCardElem?.classList.add('hero__card--flip');

      (formElem as HTMLFormElement).reset();

      setTimeout(() => {
        heroCardElem?.classList.remove('hero__card--flip');
      }, 6000);
    } else {
      Object.keys(formData).forEach(key => {
        const { elem, isValid } = formData[key];
        const formGroupElem: HTMLElement | null | undefined = elem?.parentElement;

        if (!isValid) {
          formGroupElem?.classList.add('form__group--is-invalid');
        }
      });
      formElem.classList.add('shake-horizontal');

      setTimeout(() => {
        formElem.classList.remove('shake-horizontal');
      }, 1000);
    }

  };

  formElem.addEventListener('submit', onSubmitHandler);

  Object.keys(formData).forEach(key => {
    if (formData[key].elem !== null) {
      formData[key].elem?.addEventListener('blur', onBlurHandler);
    }
  });
}
