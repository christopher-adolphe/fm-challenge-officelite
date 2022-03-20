import { getDOMElement, isNotEmpty, isEmailValid, isPhoneValid } from './utilities';

export default function signupForm(formElem: HTMLElement | null) {
  if (!formElem) {
    return;
  }

  const formData: { [key: string]: { elem: HTMLElement | null, value: string, isValid: boolean, isChecked?: boolean } } = {};
  const inputElems: NodeListOf<HTMLInputElement> = formElem.querySelectorAll('input');
  const selectValueElem = formElem.querySelector('.form__select-value');
  let defaultOptionElem: HTMLInputElement;
  const params: URLSearchParams = new URLSearchParams(window.location.search);

  const buildFormData = () => {
    inputElems.forEach(inputElem => {    
      if (inputElem.type === 'text') {
        formData[inputElem.id] = {
          elem: getDOMElement(inputElem.id),
          value: inputElem.value,
          isValid: false
        };
      } else if (inputElem.type === 'radio' && inputElem.checked) {
        defaultOptionElem = inputElem;
  
        formData[inputElem.id] = {
          elem: getDOMElement(inputElem.id),
          value: inputElem.value,
          isValid: true,
          isChecked: inputElem.checked
        };
      } else {
        formData[inputElem.id] = {
          elem: getDOMElement(inputElem.id),
          value: inputElem.value,
          isValid: true,
          isChecked: inputElem.checked
        };
      }
    });
  };

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

      case 'basic-pack':
        formData[id].isChecked = true;
        formData['pro-pack'].isChecked = false;
        formData['ultimate-pack'].isChecked = false;
        break;

      case 'pro-pack':
        formData[id].isChecked = true;
        formData['basic-pack'].isChecked = false;
        formData['ultimate-pack'].isChecked = false;
        break;

      case 'ultimate-pack':
        formData[id].isChecked = true;
        formData['basic-pack'].isChecked = false;
        formData['pro-pack'].isChecked = false;
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

    const isFormValid = Object.keys(formData)
      .map(key => formData[key].isValid)
      .every(validity => validity === true);

    if (isFormValid) {
      const heroCardElem: HTMLElement | null = formElem.parentElement;

      heroCardElem?.classList.add('hero__card--flip');

      setTimeout(() => {
        (formElem as HTMLFormElement).reset();
        defaultOptionElem.click();

        if (selectValueElem) {
          selectValueElem.innerHTML = 'Basic Pack <span class="form__select-type">Free</span>';
        }

        Object.keys(formData).forEach(key => {
          if ((formData[key].elem as HTMLInputElement).type === 'text') {
            formData[key].value = '';
            formData[key].isValid = false;
          }

          formData['basic-pack'].isChecked = true;
          formData['pro-pack'].isChecked = false;
          formData['ultimate-pack'].isChecked = false;
        });

        heroCardElem?.classList.remove('hero__card--flip');
      }, 5000);
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

  const setSelectedOption = () => {
    const packId = `${params.get('pack')}-pack`;

    if (!Object.keys(formData).includes(packId)) {
      return;
    }
    
    const { elem: selectedQueryOption, value } = formData[packId];
    
    formData[packId].isChecked = true;
    const option = value.split(' ').slice(0, 2).join(' ');
    const type = value.split(' ').pop();
    
    selectedQueryOption?.click();
    
    if (selectValueElem) {
      selectValueElem.innerHTML = `${option} <span class="form__select-type">${type}</span>`;
    }
  
    Object.keys(formData).forEach(key => {
      if (key !== packId && formData[key].isChecked && formData[key].isChecked === true) {
        formData[key].isChecked = false;
      }
    });
  };

  buildFormData();

  formElem.addEventListener('submit', onSubmitHandler);

  Object.keys(formData).forEach(key => {
    formData[key].elem?.addEventListener('blur', onBlurHandler);
  });

  setSelectedOption();
}
