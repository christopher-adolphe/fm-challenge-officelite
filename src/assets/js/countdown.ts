export default function countdown(elem: HTMLElement | null) {
  if (!elem) {
    return;
  }

  const launchDateElem: HTMLSpanElement | null = elem.querySelector('.js-launch-date');
  const storedDate = localStorage.getItem('launchDate');
  let launchDate;

  if (!launchDateElem) {
    return;
  }

  if (storedDate !== null) {
    launchDate = new Date(JSON.parse(storedDate)).toDateString();
  } else {
    const today = new Date();

    launchDate = new Date(today);
    launchDate.setDate(today.getDate() + 30);
    localStorage.setItem('launchDate', JSON.stringify(launchDate));
  }
  
  const formattedLaunchDate = launchDate.toString().split(' ').slice(1, 4);

  launchDateElem.textContent = `${formattedLaunchDate[1]} ${formattedLaunchDate[0]} ${formattedLaunchDate[2]}`;
}
