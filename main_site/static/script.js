const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');
const navBarArea = document.querySelector('.navbar-area');
const logo = document.querySelector('.site-logo');
const body = document.body;
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

// load all event listeners
allEventListeners();

// functions of all event listeners
function allEventListeners() {
    // toggler icon click event
    navToggler.addEventListener('click', togglerClick);
    // nav links click event
    navLinks.forEach(elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
    navToggler.classList.toggle('toggler-open');
    navMenu.classList.toggle('open');
    body.classList.toggle('no-scroll'); // Toggle no-scroll class

    if (navMenu.classList.contains('open')) {
        navBarArea.style.backgroundColor = "rgb(255 255 255)";
        logo.style.color = "#000";
    } else {
        navBarArea.style.backgroundColor = "rgb(255 255 255 / 0%)";
        logo.style.color = "#fff";
    }
}

// navLinkClick function
function navLinkClick() {
    if (navMenu.classList.contains('open')) {
        navToggler.click();
    }
}


let currentIndex = 1; // Start at the first real slide

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Update slides with the new clones
const updatedSlides = Array.from(track.children);

// Calculate the width including the gap
const slideWidth = updatedSlides[0].offsetWidth;
const slideGap = parseFloat(getComputedStyle(track).gap) || 0;
const totalSlideWidth = slideWidth + slideGap;

// Set initial position
track.style.transform = `translateX(-${currentIndex * totalSlideWidth}px)`;

// Smoothly transition to the next/previous slide
function updateCarousel(direction) {
    currentIndex += direction;
    track.style.transition = 'transform 0.3s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * totalSlideWidth}px)`;
}

// Infinite looping logic
function handleTransitionEnd() {
    const totalSlides = updatedSlides.length - 2;

    if (currentIndex === 0) {
        track.style.transition = 'none';
        currentIndex = totalSlides;
        track.style.transform = `translateX(-${currentIndex * totalSlideWidth}px)`;
    } else if (currentIndex === totalSlides + 1) {
        track.style.transition = 'none';
        currentIndex = 1;
        track.style.transform = `translateX(-${currentIndex * totalSlideWidth}px)`;
    }
}

// Event listeners for buttons
prevButton.addEventListener('click', () => {
    updateCarousel(-1);
});

nextButton.addEventListener('click', () => {
    updateCarousel(1);
});

track.addEventListener('transitionend', handleTransitionEnd);
