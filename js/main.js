// ===========================
// DD_Woof — Interactions
// ===========================

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // HIDE PAW TOGGLE ON MOBILE/TABLET
    // ===========================
    const handleNavToggleVisibility = () => {
        const wrapper = document.getElementById('navLinksWrapper');
        if (wrapper) {
            if (window.innerWidth < 1024) {
                wrapper.style.display = 'none';
            } else {
                wrapper.style.display = '';
            }
        }
    };
    handleNavToggleVisibility();
    window.addEventListener('resize', handleNavToggleVisibility);

    // ===========================
    // PRELOADER (Phase 3)
    // ===========================
    // ===========================
    // PRELOADER (Phase 3)
    // ===========================
    const clearPreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }
    };

    if (document.readyState === 'complete') {
        clearPreloader();
    } else {
        window.addEventListener('load', clearPreloader);
    }

    // ===========================
    // MOBILE MENU OVERLAY
    // ===========================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scrolling
        });
    }

    const closeMobile = () => {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scrolling
        }
    };

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobile);
    }

    // Close on link click
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobile);
        });
    }

    // ===========================
    // DESKTOP NAV TOGGLE
    // ===========================
    const navToggleBtn = document.getElementById('navToggleBtn');
    const navLinksWrapper = document.getElementById('navLinksWrapper');

    if (navToggleBtn && navLinksWrapper) {
        const toggleNav = (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinksWrapper.classList.toggle('active');
        };

        // Use both click and touchend for maximum compatibility
        navToggleBtn.addEventListener('click', toggleNav);

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinksWrapper.classList.contains('active') && !navLinksWrapper.contains(e.target)) {
                navLinksWrapper.classList.remove('active');
            }
        });
    }

    // ===========================
    // CAROUSEL (Homepage only)
    // ===========================
    const carousel = document.getElementById('carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');

        let current = 0;
        let autoplayTimer = null;
        const interval = 2500;

        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(next, interval);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        // Prev / Next buttons
        prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
        nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

        // Dot buttons
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goTo(parseInt(dot.dataset.index));
                startAutoplay();
            });
        });

        // Click image to open lightbox (Always use the active slide's image)
        carousel.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' && e.target.closest('.carousel-slide.active')) {
                openLightbox(e.target.src);
            }
        });

        // Start
        startAutoplay();
    }

    // ===========================
    // LIGHTBOX
    // ===========================
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');

    window.openLightbox = function (src) {
        if (!lightboxOverlay) return;
        lightboxImg.src = src;
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('lightbox-open');
    };

    window.closeLightbox = function () {
        if (!lightboxOverlay) return;
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('lightbox-open');
    };

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ===========================
    // TYPEIT — Native typing animation (Homepage only)
    // ===========================
    const titleEl = document.getElementById('homepage-title');
    if (titleEl) {
        titleEl.innerHTML = ""; // Clear any existing content
        const text = "Hi 👋 I'm ㄉㄉ.";
        let charIndex = 0;

        // Create cursor (purely visual via CSS, no text content)
        const cursor = document.createElement('span');
        cursor.classList.add('typeit-cursor');
        titleEl.appendChild(cursor);

        function typeChar() {
            if (charIndex < text.length) {
                // Handle multi-byte emoji characters (surrogate pairs)
                const code = text.charCodeAt(charIndex);
                let char = text[charIndex];
                // Check for surrogate pair (emoji)
                if (code >= 0xD800 && code <= 0xDBFF && charIndex + 1 < text.length) {
                    char = text[charIndex] + text[charIndex + 1];
                    charIndex += 2;
                } else {
                    charIndex++;
                }

                // Insert text before cursor
                const textNode = document.createTextNode(char);
                titleEl.insertBefore(textNode, cursor);

                const delay = 80 + Math.random() * 60;
                setTimeout(typeChar, delay);
            }
            // Cursor stays blinking after done
        }

        // Start typing after a brief delay
        setTimeout(typeChar, 500);
    }

    // ===========================
    // SERVICES BACKGROUND FADE ON SCROLL
    // ===========================
    const servicesHero = document.querySelector('.services-hero-bg');
    if (servicesHero) {
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
            servicesHero.style.opacity = 1 - scrollPercent;
        });
    }

    // ===========================
    // SCROLL REVEAL (Intersection Observer)
    // ===========================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    // ===========================
    // ONE-CLICK COPY (Phase 3)
    // ===========================
    const copyTriggers = document.querySelectorAll('.copy-trigger');
    copyTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const textToCopy = trigger.getAttribute('data-copy');
            const alert = trigger.querySelector('.copy-alert');

            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    if (alert) {
                        alert.classList.add('show');
                        setTimeout(() => {
                            alert.classList.remove('show');
                        }, 1500);
                    }
                });
            }
        });
    });

    revealElements.forEach(el => revealObserver.observe(el));



    // ===========================
    // FOOTER — Back to top
    // ===========================
    const footerTop = document.querySelector('.footer-top');
    if (footerTop && !footerTop.onclick) {
        footerTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // ===========================
    // AVATAR EASTER EGG
    // ===========================
    const avatarIcon = document.getElementById('avatarIcon');
    const easterEggBubble = document.getElementById('easterEggBubble');
    const easterEggWave = document.getElementById('easterEggWave');

    if (avatarIcon && easterEggBubble && easterEggWave) {
        let pokeCount = 0;
        let pokeTimer = null;
        let easterEggAudio = null;
        let isPlaying = false;
        let hasTriggered = false;

        // ▼ Adjust these timings (in seconds) to sync with your hi.mp3 ▼
        const textCues = [
            { time: 0.3, text: 'Hello!' },
            { time: 2.1, text: 'Hello!' },
            { time: 4.0, text: 'Hello!' },
            { time: 5.8, text: 'Hi!' },
        ];

        const showBubble = (text) => {
            easterEggBubble.className = 'easter-egg-bubble';
            easterEggBubble.textContent = text;
            // Force reflow for re-animation
            void easterEggBubble.offsetWidth;
            easterEggBubble.classList.add('show');
        };

        const hideBubble = () => {
            easterEggBubble.classList.remove('show');
            easterEggBubble.classList.add('hide');
            setTimeout(() => {
                easterEggBubble.className = 'easter-egg-bubble';
            }, 300);
        };

        const resetEasterEgg = () => {
            isPlaying = false;
            easterEggBubble.className = 'easter-egg-bubble';
            easterEggWave.classList.remove('show');
        };

        avatarIcon.addEventListener('click', () => {
            if (isPlaying || hasTriggered) return;

            pokeCount++;

            // Visual poke feedback
            avatarIcon.classList.remove('poked');
            void avatarIcon.offsetWidth;
            avatarIcon.classList.add('poked');

            // Reset counter if not clicked again within 2 seconds
            clearTimeout(pokeTimer);
            pokeTimer = setTimeout(() => { pokeCount = 0; }, 2000);

            if (pokeCount >= 3) {
                pokeCount = 0;
                isPlaying = true;
                hasTriggered = true;

                // Show waving hand
                easterEggWave.classList.add('show');

                // Play audio
                if (!easterEggAudio) {
                    easterEggAudio = new Audio('assets/hi.mp3');
                }
                easterEggAudio.currentTime = 0;
                easterEggAudio.play().catch(() => { });

                // Schedule text cues
                textCues.forEach(cue => {
                    setTimeout(() => {
                        if (isPlaying) showBubble(cue.text);
                    }, cue.time * 1000);
                });

                // Reset when audio ends
                easterEggAudio.onended = () => {
                    resetEasterEgg();
                };

                // Safety fallback: reset after 10 seconds
                setTimeout(() => {
                    if (isPlaying) resetEasterEgg();
                }, 10000);
            }
        });
    }

});
