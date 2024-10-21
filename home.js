// Smooth scroll function with offset
function smoothScrollTo(target, duration = 1000) {
    const startPosition = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80; // Subtract 80px for offset
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }

    requestAnimationFrame(animation);
}

// Toggle sidebar visibility on burger button click
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const burgerButton = document.getElementById('button');
    
    sidebar.classList.toggle('active');
    burgerButton.querySelector('span').classList.toggle('is-closed');
}

// Attach to the burger button
document.getElementById('button').onclick = toggleSidebar;

// Smooth scroll and close sidebar when a sidebar link is clicked
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('active');

            const burgerButton = document.getElementById('button');
            burgerButton.querySelector('span').classList.remove('is-closed');

            setTimeout(() => {
                smoothScrollTo(targetElement, 1500);
            }, 300); // Delay for sidebar closing animation
        }
    });
});

// Add event listener for the logo
document.querySelector('.logo').addEventListener('click', function (e) {
    e.preventDefault();

    const targetElement = document.getElementById('landing');

    if (targetElement) {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('active');

        const burgerButton = document.getElementById('button');
        burgerButton.querySelector('span').classList.remove('is-closed');

        setTimeout(() => {
            smoothScrollTo(targetElement, 1500);
        }, 300); // Delay for sidebar closing animation
    }
});

document.querySelectorAll('footer ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('active');

            const burgerButton = document.getElementById('button');
            burgerButton.querySelector('span').classList.remove('is-closed');

            setTimeout(() => {
                smoothScrollTo(targetElement, 1500);
            }, 300); // Delay for sidebar closing animation
        }
    });
});

// Smooth scroll and close sidebar when any .scroll-link is clicked
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Close sidebar and reset burger button if it was from the sidebar
            const sidebar = document.getElementById('sidebar');
            const burgerButton = document.getElementById('button');
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                burgerButton.querySelector('span').classList.remove('is-closed');
            }

            // Smooth scroll with delay for a better visual effect
            setTimeout(() => {
                smoothScrollTo(targetElement, 1500); // Adjust duration as needed
            }, 300); // Delay can be tweaked
        }
    });
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

// Scroll on reveal functionality
document.addEventListener('DOMContentLoaded', function() {
    const reveals = document.querySelectorAll('.reveal');

    function handleReveal() {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 150) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    // Scroll event
    window.addEventListener('scroll', () => {
        handleReveal();
    });

    // Initial check
    handleReveal();
});

// Cards show logic with % visibility requirement on both sides
const cards = document.querySelectorAll('.pack-container');
const pricingInner = document.querySelector('.pricing-inner');

// Initially hide all cards
cards.forEach(card => {
    card.style.opacity = '0'; // Set opacity to 0
    card.style.transform = 'rotateY(-55deg)'; // Set starting position
});

const checkVisibility = () => {
    const containerRect = pricingInner.getBoundingClientRect();

    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.right - cardRect.left;
        const minVisibleWidth = cardWidth * 0.2;

        const isVisible = 
            cardRect.left < (containerRect.right) && 
            cardRect.right > (containerRect.left) &&
            (cardRect.right - Math.max(cardRect.left, containerRect.left)) >= minVisibleWidth && 
            (Math.min(cardRect.right, containerRect.right) - cardRect.left) >= minVisibleWidth;

        if (isVisible) {
            card.style.opacity = '1';
            card.style.transform = 'rotateY(0deg)';
        } else {
            card.style.opacity = '0.3';
            card.style.transform = 'rotateY(-25deg)';
        }
    });
};

// Initial check with a slight delay
setTimeout(() => {
    checkVisibility();
}, 500);

// Add smooth scrolling to container
pricingInner.style.scrollBehavior = 'smooth';

// Grabbing functionality
let isDown = false;
let startX;
let scrollLeft;

pricingInner.addEventListener('mousedown', (e) => {
    isDown = true;
    pricingInner.style.cursor = 'grabbing';
    startX = e.pageX - pricingInner.offsetLeft;
    scrollLeft = pricingInner.scrollLeft;
});

pricingInner.addEventListener('mouseleave', () => {
    isDown = false;
    pricingInner.style.cursor = 'grab';
});

pricingInner.addEventListener('mouseup', () => {
    isDown = false;
    pricingInner.style.cursor = 'grab';
});

pricingInner.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - pricingInner.offsetLeft;
    const walk = (x - startX) * 2;
    pricingInner.scrollLeft = scrollLeft - walk;
});

// Throttled scroll handler
let isScrolling = false;
pricingInner.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            checkVisibility();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            checkVisibility();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Custom scrollbar implementation
const content = document.querySelector('.content');
const scrollbar = document.querySelector('.custom-scrollbar');
const thumb = document.querySelector('.thumb');

if (content && scrollbar && thumb) {
    function updateScrollbar() {
        const contentHeight = content.scrollHeight;
        const visibleHeight = content.clientHeight;
        const scrollPercent = visibleHeight / contentHeight;
        const thumbHeight = scrollPercent * visibleHeight;

        thumb.style.height = `${thumbHeight}px`;
        scrollbar.style.display = thumbHeight < visibleHeight ? 'block' : 'none';
    }

    content.addEventListener('scroll', () => {
        const scrollTop = content.scrollTop;
        const contentHeight = content.scrollHeight;
        const visibleHeight = content.clientHeight;
        const scrollPercent = scrollTop / (contentHeight - visibleHeight);

        scrollbar.scrollTop = scrollPercent * (scrollbar.clientHeight - thumb.clientHeight);
    });

    // Initialize scrollbar
    updateScrollbar();
    window.addEventListener('resize', updateScrollbar);
}

// Initialize the visibility check for the cards
checkVisibility();
