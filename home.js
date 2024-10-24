
function smoothScrollTo(target, duration = 1000) {
    const startPosition = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80;
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



function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const burgerButton = document.getElementById('button');
    
    sidebar.classList.toggle('active');
    burgerButton.querySelector('span').classList.toggle('is-closed');

    if (sidebar.classList.contains('active')) {
        document.body.classList.add('body-no-scroll');
    } else {
        document.body.classList.remove('body-no-scroll');
    }
}

document.getElementById('button').onclick = toggleSidebar;


document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href.includes('.html')) {
            return;
        }

        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('active');
            document.body.classList.remove('body-no-scroll');

            const burgerButton = document.getElementById('button');
            burgerButton.querySelector('span').classList.remove('is-closed');

            setTimeout(() => {
                smoothScrollTo(targetElement, 1000);
            }, 300);
        }
    });
});



document.querySelector('.logo').addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href');

    if (href.includes('.html')) {

        window.location.href = href;
    } else {
        
        const targetElement = document.getElementById('landing');

        if (targetElement) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('active');
            document.body.classList.remove('body-no-scroll');

            const burgerButton = document.getElementById('button');
            burgerButton.querySelector('span').classList.remove('is-closed');

            setTimeout(() => {
                smoothScrollTo(targetElement, 1000);
            }, 300);
        }
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
                smoothScrollTo(targetElement, 1000);
            }, 300);
        }
    });
});

document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {

            const sidebar = document.getElementById('sidebar');
            const burgerButton = document.getElementById('button');
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                burgerButton.querySelector('span').classList.remove('is-closed');
            }

            setTimeout(() => {
                smoothScrollTo(targetElement, 1000);
            }, 100);
        }
    });
});



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

    window.addEventListener('scroll', () => {
        handleReveal();
    });


    handleReveal();
});

const cards = document.querySelectorAll('.pack-container');
const pricingInner = document.querySelector('.pricing-inner');

cards.forEach(card => {
    card.style.opacity = '0'; 
    card.style.transform = 'rotateY(-55deg)';
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

setTimeout(() => {
    checkVisibility();
}, 500);

pricingInner.style.scrollBehavior = 'smooth';

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

window.addEventListener('resize', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            checkVisibility();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

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

    updateScrollbar();
    window.addEventListener('resize', updateScrollbar);
}

checkVisibility();

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', () => {
    const cardInner = card.querySelector('.card-inner');
    if (cardInner.style.transform === 'rotateY(180deg)') {
      cardInner.style.transform = 'rotateY(0deg)';
    } else {
      cardInner.style.transform = 'rotateY(180deg)';
    }
  });
});

