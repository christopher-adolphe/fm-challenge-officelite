export default function signupForm(elem: HTMLElement | null) {
  if (!elem) {
    return;
  }

  console.log('signupFormElem: ', elem);

  const submitHandler = (event: Event) => {
    event.preventDefault();
    const formElem = (event.target as HTMLFormElement);

    const inputs = formElem.querySelectorAll('input');

    console.log('submitHandler called... ', event);
    console.log('submitHandler called... ', inputs);
  };

  elem.addEventListener('submit', submitHandler);
}
