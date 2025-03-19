function nextSlide(slideNumber) {
  let currentSlide = document.querySelector('.slide.active');
  let nextSlide = document.getElementById('slide' + slideNumber);

  if (currentSlide && nextSlide) {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      
      nextSlide.style.opacity = 0;
      setTimeout(() => {
          nextSlide.style.opacity = 1;
      }, 600);
  }
}

function transitionToMain() {
  document.querySelector('.intro-slideshow').style.opacity = 0;
  setTimeout(() => {
      document.querySelector('.intro-slideshow').style.display = 'none';
      window.location.href = "../login/login.html"; // Redirects to login.html in the login folder
  }, 1000);
}
