# Frontend Mentor - Officelite coming soon site

This is my solution to the [Officelite coming soon site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/officelite-coming-soon-site-M4DIPNz8g).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- See error states when the sign up form is submitted if:
  - The `Name` and/or `Email Address` fields are empty
  - The `Email Address` is not formatted correctly
- **Bonus**: See a live countdown timer that ticks down every second
- **Bonus**: See a custom-styled `select` form control in the sign-up form

### Screenshot

![Preview for the Officelite](./screencast-officelite-home-desktop.webm)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [fm-officelite.netlify.app](https://fm-officelite.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- Mobile-first approach
- Flexbox
- CSS Grid
- GSAP animation
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [webpack](https://webpack.js.org/)

### What I learned

- In most frontend projects that I have worked on, I was never provided with a dedicated design file
for the design system. So this time, I tried to approach this project differently by coding a page for
the design system itself and it was a good thing because it helped me write my css styles without any
context of where the components would be used which resulted in a much leaner and cleaner stylesheet.
- The custom-styled `select` form control was the real challenge in this project. I approached this
by using JavaScript to substitute the normal `select` html element with the custom-styled `select`.
I used a list of radio buttons to mimic the `option` html elements and then applied event listeners 
to create the dropdown and selection behaviors. Below is the markup generated by JavaScript.

```html
<div class="form__select form__select--custom">
  <span class="form__select-value">Options Opened</span>

  <ul class="form__select-list">
    <li class="form__select-item">
      <label for="basic-pack" class="form__select-label">
        Basic Pack <span class="form__select-type">Free</span>
      </label>

      <input type="radio" name="pack" id="basic-pack" class="form__select-option" value="Basic Pack Free" checked />
    </li>

    <li class="form__select-item">
      <label for="pro-pack" class="form__select-label">
        Pro Pack <span class="form__select-type">$9.99</span>
      </label>

      <input type="radio" name="pack" id="pro-pack" class="form__select-option" value="Pro Pack $9.99" />
    </li>

    <li class="form__select-item">
      <label for="ultimate-pack" class="form__select-label">
        Ultimate Pack <span class="form__select-type">$19.99</span>
      </label>

      <input type="radio" name="pack" id="ultimate-pack" class="form__select-option" value="Ultimate Pack $19.99" />
    </li>
  </ul>
</div>
```

- I used CSS grid to style the live countdown timer and used JavaScript to calculate the difference
between the lauch date and the current date.
- I added a bonus feature to the sign up form where if the user tries to submit the form without filling 
the mandatory fields, the form shakes and the error state appear. If the user fills the form correctly and
submits, the form flips and displays a success message.
- I also wanted to get started with animations in my frontend projects, so I used GSAP to animate the hero
sections of the home and sign up pages.

### Useful resources

- [JavaScript Countdown](https://www.youtube.com/watch?v=V-Mcul5kS_Y&t=837s) - This tutorial helped me to get the convertions from milliseconds into days, hours etc.
- [GSAP Scroll Trigger](https://www.youtube.com/watch?v=WEky7V490Rs&t=4s) - This playlist help me to get started quickly with GSAP's Scroll Trigger plugin.

## Author

- Christopher Adolphe
- Frontend Mentor - [@christopher-adolphe](https://www.frontendmentor.io/profile/christopher-adolphe)
- Twitter - [@cadolphe23](https://twitter.com/cadolphe23)
