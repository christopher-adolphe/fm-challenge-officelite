import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getDOMElement } from './utilities';

export default function animate() {
  const homePageElem = getDOMElement('page-home');
  const signUpPageElem = getDOMElement('page-signup');
  gsap.registerPlugin(ScrollTrigger);

  if (homePageElem) {
    const homeTimeline = gsap.timeline({
      defaults: {
        ease: 'power4.inOut',
        duration: 2
      }
    });

    homeTimeline.from('.hero__title', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      y: '100%',
      opacity: 0,
      duration: 2.2
    })
    .from('.hero__tag-line', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      y: '100%',
      opacity: 0
    }, '-=2')
    .from('.hero__cta', {
      clipPath: 'polygon(-30% 100%, 130% 100%, 100% 100%, 0% 100%)',
      y: '100%',
      opacity: 0
    }, '-=2')
    .from('.hero__illustration', {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      x: '-10%',
      opacity: 0
    }, '-=2');

    return;
  }

  if (signUpPageElem) {
    const signupTimeline = gsap.timeline({
      defaults: {
        ease: 'power4.inOut',
        duration: 2
      }
    });

    signupTimeline.from('.hero__title', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      y: '100%',
      opacity: 0,
      duration: 2.2
    })
    .from('.hero__tag-line', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      y: '100%',
      opacity: 0
    }, '-=2')
    .from('.hero__countdown', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      y: '100%',
      opacity: 0
    }, '-=2')
    .from('.hero__form', {
      clipPath: 'polygon(-40% 0, 0% 0, 0% 140%, -40% 140%)',
      x: '-10%',
      opacity: 0
    }, '-=2');

    return;
  }
}
