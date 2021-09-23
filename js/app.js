/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

// add all sections to one variable
let sections = document.querySelectorAll("section");

// unordered list item
let navbarList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Main Functions
 *
 */

// build the nav
function buildNav() {
  // looping through all sections to build Navbar based on sections information
  sections.forEach(section => {
    // create list item for each section
    let listItem = document.createElement("li");

    // add title to each list item
    listItem.innerHTML = `<a class="nav_link" data-nav="${section.id}" href="#${section.id}" id="link-${section.id}">${section.dataset.nav}</a>`;

    // add list items to the unordered list with ID navbar__list
    navbarList.appendChild(listItem);
  });
}

buildNav();

/**
 * End Main Functions
 * Begin Helper Functions
 *
 */

// observer function to detect which section is on the viewport.

// creating an instance of the Intersection Observer API
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

const observer = new IntersectionObserver(
  // passing sections being viewed on the viewport and looping through them.
  function (entries, observer) {
    entries.forEach(entry => {
      // select the current section on the viewport.
      let activeListItem = navbarList.querySelector(
        `[data-nav=${entry.target.id}]`
      );

      // if section is being viewed add active class to it so that it is highlighted.
      if (entry.isIntersecting) {
        // Add class 'active' to section when near top of viewport
        activeListItem.classList.add("active");
      } else {
        // remove the active class if section is out of the viewport.
        activeListItem.classList.remove("active");
      }
    });
  },
  { threshold: 0.9 }
);

sections.forEach(section => {
  observer.observe(section);
});

/**
 * End Helper Functions
 * Begin Events
 *
 */
