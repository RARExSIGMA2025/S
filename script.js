document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Mobile Navigation Toggle Logic
    // ----------------------------------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            mainNav.classList.toggle('hidden');
            if (mainNav.classList.contains('hidden')) {
                mainNav.classList.remove('opacity-100', 'max-h-screen', 'flex');
                mainNav.classList.add('opacity-0', 'max-h-0');
            } else {
                mainNav.classList.remove('opacity-0', 'max-h-0');
                mainNav.classList.add('opacity-100', 'max-h-screen', 'flex');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mainNav.classList.contains('hidden') && window.innerWidth < 768) {
                    mainNav.classList.add('hidden');
                    mainNav.classList.remove('opacity-100', 'max-h-screen', 'flex');
                    mainNav.classList.add('opacity-0', 'max-h-0');
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                mainNav.classList.remove('hidden', 'opacity-0', 'max-h-0');
                mainNav.classList.add('opacity-100', 'max-h-full', 'flex');
            } else {
                if (!mainNav.classList.contains('hidden') && mainNav.classList.contains('flex')) {
                    mainNav.classList.add('hidden');
                    mainNav.classList.remove('opacity-100', 'max-h-full', 'flex');
                    mainNav.classList.add('opacity-0', 'max-h-0');
                }
            }
        });
    }

    // ----------------------------------------------------
    // 2. On-Load Hero Section Animations
    // ----------------------------------------------------
    const heroElements = document.querySelectorAll('.animate-on-load-hero-text, .animate-on-load-hero-buttons, .animate-on-load-hero-grid');
    heroElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('is-visible');
        }, 100);
    });

    // ----------------------------------------------------
    // 3. On-Scroll Section Animations (Intersection Observer)
    // ----------------------------------------------------
    const animatedSections = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport as root
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // ----------------------------------------------------
    // 4. Sticky Header Behavior
    // ----------------------------------------------------
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add 'scrolled' class after scrolling down 50px
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }

    // ----------------------------------------------------
    // 5. Navigation Active State on Scroll (using Intersection Observer)
    // ----------------------------------------------------
    const sections = document.querySelectorAll('main section'); // Select all main content sections
    const navLinksList = document.querySelectorAll('#main-nav .nav-link');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -49% 0px', // When the section is roughly in the middle of the viewport
        threshold: 0 // No specific threshold needed, just looking for intersection changes
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                // Remove active class from all links first
                navLinksList.forEach(link => {
                    link.classList.remove('current-active-link');
                });
                // Add active class to the link corresponding to the intersecting section
                const activeLink = document.querySelector(`#main-nav a[href="#${currentSectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('current-active-link');
                }
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Special handling for initial load to set active link for 'home'
    // This is because the IntersectionObserver might not trigger immediately for the first section
    // or if the page is reloaded at a different scroll position.
    // This ensures "Home" is active if at the top, or the correct section if scrolled.
    const initialActiveSection = document.querySelector('main section.is-visible'); // Check for the first animated section
    if (!initialActiveSection) {
        // If no animated section is visible (e.g., initial load at top), set Home as active
        const homeLink = document.querySelector('#main-nav a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('current-active-link');
        }
    }
});

