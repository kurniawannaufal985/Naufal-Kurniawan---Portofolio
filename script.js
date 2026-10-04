/**
 * Interactive Script for Personal Portfolio
 * Student Developer Custom Implementation - Touch & Responsive Arrow Slider
 */

let currentProjectSlideIndex = 0;
const totalProjectSlides = 3;

function goToProjectSlide(index) {
    if (index < 0) index = totalProjectSlides - 1;
    if (index >= totalProjectSlides) index = 0;
    
    currentProjectSlideIndex = index;

    // 1. Shift Horizontal Track Translate
    const track = document.getElementById('landscapeTrack');
    if (track) {
        track.style.transform = `translateX(-${currentProjectSlideIndex * 100}%)`;
    }

    // 2. Synchronize Captions
    const captions = document.querySelectorAll('.landscape-caption-container .caption-item');
    captions.forEach((caption, i) => {
        caption.classList.toggle('active', i === currentProjectSlideIndex);
    });

    // 3. Synchronize Indicator Dots
    const dots = document.querySelectorAll('.slider-dots-nav .dot-nav');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentProjectSlideIndex);
    });
}

document.addEventListener('DOMContentLoaded', function() {

    // 1. Bind Click Event for Prev & Next Arrows
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goToProjectSlide(currentProjectSlideIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goToProjectSlide(currentProjectSlideIndex + 1);
        });
    }

    // 2. Dukungan Gestur Usapan Layar (Touch Swipe) untuk Pengguna HP
    const viewport = document.getElementById('landscapeViewport');
    let touchStartX = 0;
    let touchEndX = 0;

    if (viewport) {
        viewport.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        viewport.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 35; // Sensitivitas geser jari
        if (touchStartX - touchEndX > swipeThreshold) {
            goToProjectSlide(currentProjectSlideIndex + 1); // Swiped Left -> Next
        } else if (touchEndX - touchStartX > swipeThreshold) {
            goToProjectSlide(currentProjectSlideIndex - 1); // Swiped Right -> Prev
        }
    }

    // 3. Particles.js Configuration - Balanced & Subtle Density
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: ['#4f46e5', '#0284c7'] },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 0.8, opacity_min: 0.25, sync: false }
                },
                size: { value: 3.5, random: true },
                line_linked: {
                    enable: true,
                    distance: 135,
                    color: '#4f46e5',
                    opacity: 0.28,
                    width: 1.1
                },
                move: { enable: true, speed: 1.3 }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 150, line_linked: { opacity: 0.45 } },
                    push: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }

    // 4. Scroll Animation Setup via AOS Library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: false,
            mirror: true,
            duration: 650,
            easing: 'ease-out-cubic'
        });
    }

    // 5. Smooth Navigation Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 30,
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    if (typeof AOS !== 'undefined') AOS.refresh();
                }, 400);
            }
        });
    });

    // 6. Cursor Glow Spotlight (Hanya Desktop)
    const spotlight = document.getElementById('cursorSpotlight');
    if (spotlight && window.innerWidth > 992) {
        window.addEventListener('mousemove', function(e) {
            requestAnimationFrame(() => {
                spotlight.style.left = e.clientX + 'px';
                spotlight.style.top = e.clientY + 'px';
            });
        });
    }

    // 7. Mobile Navbar Drawer Handler
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const toggleIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (toggleIcon) {
                toggleIcon.classList.toggle('fa-bars');
                toggleIcon.classList.toggle('fa-times');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (toggleIcon) {
                    toggleIcon.classList.add('fa-bars');
                    toggleIcon.classList.remove('fa-times');
                }
            });
        });
    }

    // 8. ScrollSpy Active Section Highlight & Back To Top Dynamic Visibility
    const targets = document.querySelectorAll('section[id]');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        targets.forEach(current => {
            const targetHeight = current.offsetHeight;
            const targetTop = current.offsetTop - 100;
            const targetId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-links a[href*=' + targetId + ']');
            
            if (navLink) {
                if (scrollY >= targetTop && scrollY < targetTop + targetHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });

        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }, { passive: true });

});