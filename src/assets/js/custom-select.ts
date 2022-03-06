/*
  1. Look for select element with class name `js-select` in the DOM tree - DONE
  2. Apply class `visually-hidden` to the select element - DONE
  3. Create a list of options from the `<option>` elements of the select - DONE
  4. Create a `<div>` element for the custom select - DONE
  5. Create a `<div>` element for the custom select value - DONE
  6. Create a `<ul>` element for the custom select list - DONE
  7. Create a `<li>` element for the custom select item - DONE
  8. Create a `<label>` element for the custom select label - DONE
  9. Create a `<input type="radio">` element for the custom select option - DONE
  10. Append the custom select element - DONE


  11. Toggle class `form__select--is-active` when custom select element is clicked
*/

export default function customSelect() {
  const selectElems: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.js-select');

  console.log('selectElems NodeList: ', selectElems);

  const createCustomSelectElem = (options: string[], index: number, optionTypes: string[]): HTMLDivElement => {
    const customSelectElem: HTMLDivElement = document.createElement('div');
    const customSelectValueElem: HTMLSpanElement = document.createElement('span');
    const customSelectListElem: HTMLUListElement = document.createElement('ul');

    console.log('options: ', options);
    console.log('optionTypes: ', optionTypes);

    if (options.length) {
      options.map((option: string, optionIdx: number) => {
        const attrValue = option.split(' ').join('-').toLowerCase();
        const listElem: HTMLLIElement = document.createElement('li');
        const labelElem: HTMLLabelElement = document.createElement('label');
        const optionElem: HTMLInputElement = document.createElement('input');

        listElem.className = 'form__select-item';
        labelElem.className = 'form__select-label';
        optionElem.className = 'form__select-option';

        labelElem.textContent = option;

        if (optionTypes.length) {
          const optionTypeElem: HTMLSpanElement = document.createElement('span');

          optionTypeElem.className = 'form__select-type';
          optionTypeElem.textContent = optionTypes[optionIdx];

          labelElem.insertAdjacentElement('beforeend', optionTypeElem)
        }


        labelElem.setAttribute('for', attrValue);
        optionElem.setAttribute('id', attrValue);
        optionElem.setAttribute('type', 'radio');
        optionElem.setAttribute('name', `pack-${index}`);
        optionElem.setAttribute('value', option);

        listElem.append(labelElem, optionElem);

        customSelectListElem.append(listElem);
      });
    }

    customSelectElem.className = 'form__select form__select--custom form__select--is-active';
    customSelectValueElem.className = 'form__select-value';
    customSelectListElem.className = 'form__select-list';

    customSelectElem.append(customSelectValueElem, customSelectListElem);

    return customSelectElem;
  };

  selectElems.forEach((select: HTMLSelectElement, index: number) => {
    const optionElems: NodeListOf<HTMLOptionElement> = select.querySelectorAll('option');
    const options: string[] = [];
    let types: string[] = [];

    if (select.dataset.optionTypes) {
      types = select.dataset.optionTypes.split(' ');
    }

    console.log('option types: ', types);

    select.classList.add('visually-hidden');

    console.log('optionElems: ', optionElems);

    optionElems.forEach((option: HTMLOptionElement) => {
      const value: string | null = option.getAttribute('value');

      if (value) {
        options.push(value);
      }
    });

    const customSelect = createCustomSelectElem(options, index, types);

    console.log('customSelect: ', customSelect);

    select.insertAdjacentElement('afterend', customSelect);

    customSelect.addEventListener('click', (event) => {
      console.log('custom select clicked: ', event.target);
    });
  })
};
