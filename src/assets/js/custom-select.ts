export default function customSelect() {
  const selectElems: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.js-select');

  const createCustomSelectElem = (options: string[], selectedOption: string, index: number, optionTypes: string[]): HTMLDivElement => {
    const customSelectElem: HTMLDivElement = document.createElement('div');
    const customSelectValueElem: HTMLSpanElement = document.createElement('span');
    const customSelectListElem: HTMLUListElement = document.createElement('ul');

    if (options.length) {
      options.forEach((option: string, optionIdx: number) => {
        const attrValue = option.split(' ').join('-').toLowerCase();
        const listElem: HTMLLIElement = document.createElement('li');
        const labelElem: HTMLLabelElement = document.createElement('label');
        const optionElem: HTMLInputElement = document.createElement('input');

        listElem.className = 'form__select-item';
        labelElem.className = 'form__select-label';
        optionElem.className = 'form__select-option';

        labelElem.textContent = option;

        labelElem.setAttribute('for', attrValue);
        optionElem.setAttribute('id', attrValue);
        optionElem.setAttribute('type', 'radio');
        optionElem.setAttribute('name', `pack-${index}`);

        if (optionTypes.length) {
          const optionTypeElem: HTMLSpanElement = document.createElement('span');

          optionTypeElem.className = 'form__select-type';
          optionTypeElem.textContent = optionTypes[optionIdx];

          labelElem.insertAdjacentElement('beforeend', optionTypeElem);
          optionElem.setAttribute('value', `${option} ${optionTypes[optionIdx]}`);
        } else {
          optionElem.setAttribute('value', option);
        }

        if (option === selectedOption && optionTypes.length) {
          const selectedOptionTypeElem: HTMLSpanElement = document.createElement('span');

          selectedOptionTypeElem.className = 'form__select-type';
          selectedOptionTypeElem.textContent = optionTypes[optionIdx];
          optionElem.setAttribute('checked', 'checked');
          customSelectValueElem.textContent = selectedOption;
          customSelectValueElem.insertAdjacentElement('beforeend', selectedOptionTypeElem);
        }
        
        if (option === selectedOption && !optionTypes.length) {
          optionElem.setAttribute('checked', 'checked');
          customSelectValueElem.textContent = selectedOption;
        }

        listElem.append(labelElem, optionElem);

        customSelectListElem.append(listElem);
      });
    }

    customSelectElem.className = 'form__select form__select--custom';
    customSelectElem.setAttribute('tabindex', '0');
    customSelectValueElem.className = 'form__select-value';
    customSelectListElem.className = 'form__select-list';

    customSelectElem.append(customSelectValueElem, customSelectListElem);

    return customSelectElem;
  };

  selectElems.forEach((select: HTMLSelectElement, index: number) => {
    const optionElems: NodeListOf<HTMLOptionElement> = select.querySelectorAll('option');
    const options: string[] = [];
    let selectedOption = '';
    let types: string[] = [];

    if (select.dataset.optionTypes) {
      types = select.dataset.optionTypes.split(' ');
    }

    select.classList.add('visually-hidden');

    optionElems.forEach((option: HTMLOptionElement) => {
      const value: string | null = option.getAttribute('value');

      if (value && option.selected) {
        selectedOption = value;
      }

      if (value) {
        options.push(value);
      }
    });

    const customSelect = createCustomSelectElem(options, selectedOption, index, types);
    let selectListElem: HTMLElement;

    select.insertAdjacentElement('afterend', customSelect);

    customSelect.addEventListener('click', (event: Event) => {
      const customSelectValueElem = event.target as HTMLElement;
      const customSelectElem = (event.target as HTMLElement).parentElement;

      if (customSelectElem) {
        const { bottom } = customSelectElem.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const availableSpace = viewportHeight - Math.floor(bottom);

        selectListElem = customSelectElem.querySelector('.form__select-list') as HTMLElement;

        if (selectListElem) {
          if (options.length >= 8) {
            const maxHeight = (60 * options.length) * 0.5;
      
            selectListElem.style.maxHeight = `${maxHeight}px`;
          }
  
          // eslint-disable-next-line no-unsafe-optional-chaining
          const { height } = selectListElem.getBoundingClientRect();
  
          if (availableSpace < height) {
            selectListElem.classList.add('form__select-list--dropup');
          }
  
          customSelectElem.classList.toggle('form__select--is-active');
  
          selectListElem.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            const optionElem = event.target as HTMLInputElement;
  
            if (optionElem.type === 'radio') {
              if (types.length) {
                const valueTypeElem: HTMLSpanElement = document.createElement('span');
                const value = optionElem.value.split(' ').slice(0, 2).join(' ');
                const type = optionElem.value.split(' ').pop();
  
                valueTypeElem.className = 'form__select-type';
                valueTypeElem.textContent = type || '';
  
                customSelectValueElem.textContent = value;
                customSelectValueElem.insertAdjacentElement('beforeend', valueTypeElem);
              } else {
                customSelectValueElem.textContent = optionElem.value;
              }
  
              select.setAttribute('value', optionElem.value);
              customSelectElem.classList.remove('form__select--is-active');
            }
          });
        }
      }
    });

    customSelect.addEventListener('blur', (event: Event) => {
      const customSelectElem = (event.target as HTMLElement);

      if (customSelectElem) {
        customSelectElem.classList.remove('form__select--is-active');

        setTimeout(() => {
          selectListElem.removeAttribute('style');
          selectListElem.classList.remove('form__select-list--dropup');
        }, 1000);
      }
    });
  })
};
