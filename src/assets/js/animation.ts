import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import { getDOMElement } from './utilities';

export default function animate() {
  gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);
  const homePageElem = getDOMElement('page-home');
  const signUpPageElem = getDOMElement('page-signup');

  if (homePageElem) {
    const heroTimeline = gsap.timeline({
      defaults: {
        ease: 'power4.inOut',
        duration: 2
      }
    });

    const pricingTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#section-pricing',
        start: 'top 90%',
        end: 'top 45%',
        scrub: 4
      },
      defaults: {
        ease: 'power4.inOut',
        duration: 2
      }
    });

    heroTimeline.to('.hero__title', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 105%, 0% 105%)',
      y: '0%',
      opacity: 1,
      duration: 2.2
    })
    .to('.hero__tag-line', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 105%, 0% 105%)',
      y: '0%',
      opacity: 1
    }, '-=2')
    .to('.hero__cta', {
      clipPath: 'polygon(-30% 0%, 130% 0%, 100% 180%, -30% 180%)',
      y: '0%',
      opacity: 1
    }, '-=2')
    .to('.hero__illustration', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      x: '0%',
      opacity: 1
    }, '-=2');

    pricingTimeline.from('.card', {
      stagger: 1.75,
      scale: 0,
      opacity: 0,
      duration: 8
    });

    return;
  }

  if (signUpPageElem) {
    const signupTimeline = gsap.timeline({
      defaults: {
        ease: 'power4.inOut',
        duration: 2
      }
    });
    const bgPanel = CSSRulePlugin.getRule('.page--signup .page__content::after');

    signupTimeline.to(bgPanel, {
      cssRule: {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 1
      }
    })
    .to('.hero__title', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 105%, 0% 105%)',
      y: '0%',
      opacity: 1,
      duration: 2.2
    }, '-=2')
    .to('.hero__tag-line', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 105%, 0% 105%)',
      y: '0%',
      opacity: 1
    }, '-=2')
    .to('.hero__countdown', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 105%, 0% 105%)',
      y: '0%',
      opacity: 1
    }, '-=2')
    .to('.hero__form', {
      clipPath: 'polygon(-40% 0%, 100% 0%, 100% 140%, -40% 140%)',
      x: '0%',
      opacity: 1
    }, '-=2');

    return;
  }
}
