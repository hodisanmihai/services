// home.js

// Toggle sidebar visibility on button click
document.getElementById('button').onclick = function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
    this.querySelector('span').classList.toggle('is-closed');
};

// Smooth scroll function
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) requestAnimationFrame(animation); 
    }

    requestAnimationFrame(animation); 
}

// Easing function for smooth scrolling
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Handle clicks on sidebar items for smooth scrolling
const listItems = document.querySelectorAll('#sidebar ul li');
listItems.forEach(item => {
    item.addEventListener('click', function() {
        const targetId = this.querySelector('a').getAttribute('href');
        smoothScroll(targetId, 1000);
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('active');
        document.getElementById('button').querySelector('span').classList.remove('is-closed'); 
    });
});

// Handle logo click for smooth scrolling to landing
const logoLink = document.querySelector('.logo');
logoLink.addEventListener('click', function(event) {
    event.preventDefault();
    smoothScroll('#landing', 1000);
});

// Loading screen logic
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const minLoadingTime = 3500;
    const loadingDuration = 1500;


    const loadStartTime = performance.now();

    const checkLoadDuration = () => {
        const loadEndTime = performance.now();
        const elapsedTime = loadEndTime - loadStartTime;

        if (elapsedTime >= minLoadingTime) {
            loadingScreen.style.display = 'none';
        } else {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, minLoadingTime - elapsedTime);
        }
    };

    setTimeout(checkLoadDuration, loadingDuration);
});

document.addEventListener('DOMContentLoaded', function() {
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const scrollPos = window.scrollY + window.innerHeight;

        reveals.forEach(reveal => {
            const elementPos = reveal.getBoundingClientRect().top + window.scrollY;

            if (scrollPos > elementPos + 100) {
                reveal.classList.add('visible');
            } else {
                reveal.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const button = document.getElementById('button');
  const burger = button.querySelector('.burger');

  sidebar.classList.toggle('active'); // Toggle sidebar visibility
  burger.classList.toggle('active'); // Toggle burger button animation
}

// Optional: To hide the sidebar when clicking outside of it
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const button = document.getElementById('button');

  if (!sidebar.contains(event.target) && !button.contains(event.target)) {
    sidebar.classList.remove('active');
    button.querySelector('.burger').classList.remove('active');
  }
});

