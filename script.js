const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name')?.value.trim();
    const email = document.querySelector('#email')?.value.trim();
    const message = document.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill out all fields.';
      return;
    }

    formStatus.textContent = `Thanks, ${name}! Your message has been received.`;
    contactForm.reset();
  });
}

const slideshow = document.querySelector('.slideshow');
if (slideshow) {
  const slides = Array.from(slideshow.querySelectorAll('.slide'));
  const prevButton = slideshow.querySelector('.slide-nav.prev');
  const nextButton = slideshow.querySelector('.slide-nav.next');
  const indicators = slideshow.querySelector('.slide-indicators');
  let currentIndex = slides.findIndex((slide) => slide.classList.contains('active'));

  if (currentIndex === -1) currentIndex = 0;

  slides.forEach((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Go to slide ${index + 1}`);
    if (index === currentIndex) button.classList.add('active');
    button.addEventListener('click', () => {
      goToSlide(index);
    });
    indicators.appendChild(button);
  });

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });
    indicators.querySelectorAll('button').forEach((button, index) => {
      button.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateSlides();
  }

  prevButton?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextButton?.addEventListener('click', () => goToSlide(currentIndex + 1));

  let slideTimer = setInterval(() => goToSlide(currentIndex + 1), 4000);

  slideshow.addEventListener('mouseenter', () => clearInterval(slideTimer));
  slideshow.addEventListener('mouseleave', () => {
    slideTimer = setInterval(() => goToSlide(currentIndex + 1), 4000);
  });
}
