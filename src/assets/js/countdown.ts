export default function countdown(elem: HTMLElement | null) {
  if (!elem) {
    return;
  }

  const launchDateElem: HTMLSpanElement | null = elem.querySelector('.js-countdown-date');
  const daysElem: HTMLSpanElement | null = elem.querySelector('.js-countdown-days');
  const hoursElem: HTMLSpanElement | null = elem.querySelector('.js-countdown-hours');
  const minutesElem: HTMLSpanElement | null = elem.querySelector('.js-countdown-minutes');
  const secondsElem: HTMLSpanElement | null = elem.querySelector('.js-countdown-seconds');
  const storedDate = localStorage.getItem('launchDate');
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60
  const oneDay = oneHour * 24;
  const today = new Date();
  const countdownDays: number = elem.dataset['countdownDays'] ? parseFloat(elem.dataset['countdownDays']) : 30;
  let launchDate: string | Date;

  if (!launchDateElem || !daysElem || !hoursElem || !minutesElem || !secondsElem) {
    return;
  }

  if (storedDate !== null) {
    launchDate = new Date(JSON.parse(storedDate)).toDateString();
  } else {
    launchDate = new Date(today);
    launchDate.setDate(today.getDate() + countdownDays);
    localStorage.setItem('launchDate', JSON.stringify(launchDate));
  }
  
  const formattedLaunchDate = launchDate.toString().split(' ').slice(1, 4);

  launchDateElem.innerHTML = `Coming <span class="text-blue-color-1">${formattedLaunchDate[1]} ${formattedLaunchDate[0]} ${formattedLaunchDate[2]}</span>`;
  // launchDateElem.setAttribute('aria-label', `Officelite launching on ${formattedLaunchDate[1]} ${formattedLaunchDate[0]} ${formattedLaunchDate[2]}`);

  const calculateTimeDiff = () => {
    const currentDate = new Date();
    const timeDifference = new Date(launchDate).getTime() - new Date(currentDate).getTime();

    if (timeDifference <= -oneDay || timeDifference <= 0) {
      launchDateElem.innerHTML = `We are <span class="text-blue-color-1">live</span>`;
      clearInterval(timerId);
      localStorage.removeItem('launchDate');

      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      secondsElem.textContent = '00';
      return;
    }

    const days = Math.floor(timeDifference / oneDay);
    const hours = Math.floor((timeDifference % oneDay) / oneHour);
    const minutes = Math.floor((timeDifference % oneHour) / oneMinute);
    const seconds = Math.floor((timeDifference % oneMinute) / oneSecond);

    daysElem.textContent = `${ days.toString().length > 1 ? days : `0${days}` }`;
    hoursElem.textContent = `${ hours.toString().length > 1 ? hours : `0${hours}` }`;
    minutesElem.textContent = `${ minutes.toString().length > 1 ? minutes : `0${minutes}` }`;
    secondsElem.textContent = `${ seconds.toString().length > 1 ? seconds : `0${seconds}` }`;
  };

  const timerId: NodeJS.Timer = setInterval(calculateTimeDiff, oneSecond)
}
