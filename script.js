/**
 * Interactive Script for Personal Portfolio
 * Student Developer Custom Implementation - Continuous Running Text, Animated Counters & Lightbox
 */

document.addEventListener('DOMContentLoaded', function() {

    // 1. Modal Lightbox (Click image to enlarge)
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const clickableImages = document.querySelectorAll('.clickable-image');

    clickableImages.forEach(img => {
        img.addEventListener('click', function() {
            if (modal && modalImg) {
                modal.classList.add('active');
                modalImg.src = this.src;
                modalCaption.textContent = this.alt;
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    // 2. Dynamic Count-Up Animation (4+ & 100%)
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateSingleCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2500; // Durasi diperlambat menjadi 2.5 detik
        let startTime = null;

        if (counter.animFrame) {
            cancelAnimationFrame(counter.animFrame);
        }
        counter.textContent = '0' + suffix;

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.round(easeOutProgress * target);

            counter.textContent = currentCount + suffix;

            if (progress < 1) {
                counter.animFrame = requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + suffix;
            }
        };

        counter.animFrame = requestAnimationFrame(updateCount);
    }

    function resetAndAnimateAllCounters() {
        statNumbers.forEach(counter => {
            animateSingleCounter(counter);
        });
    }

    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const counter = entry.target;
                const suffix = counter.getAttribute('data-suffix') || '';

                if (entry.isIntersecting) {
                    animateSingleCounter(counter);
                } else {
                    if (counter.animFrame) cancelAnimationFrame(counter.animFrame);
                    counter.textContent = '0' + suffix;
                }
            });
        }, {
            threshold: 0.15
        });

        statNumbers.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Trigger re-animasi saat klik Home / Logo / Back To Top
    document.querySelectorAll('a[href="#home"], .nav-brand, #backToTop').forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                resetAndAnimateAllCounters();
            }, 200);
        });
    });

    // 3. Particles.js Configuration
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

    // 6. Cursor Glow Spotlight (Desktop only)
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

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 8. ScrollSpy Active Section Highlight & Back To Top Visibility
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