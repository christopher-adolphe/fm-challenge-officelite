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

    heroTimeline.from('.hero__title', {
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

    signupTimeline.from(bgPanel, {
      cssRule: {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        opacity: 0
      }
    })
    .from('.hero__title', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      y: '100%',
      opacity: 0,
      duration: 2.2
    }, '-=2')
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
      clipPath: 'polygon(-40% 0%, 0% 0%, 0% 140%, -40% 140%)',
      x: '-10%',
      opacity: 0
    }, '-=2');

    return;
  }
}
