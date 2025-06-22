document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Universal Navigation Toggle Logic
    // ----------------------------------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle the visibility and opacity/height for smooth transition
            mainNav.classList.toggle('hidden');
            if (mainNav.classList.contains('hidden')) {
                mainNav.classList.remove('opacity-100', 'max-h-screen', 'flex'); // Ensure flex is removed when hiding
                mainNav.classList.add('opacity-0', 'max-h-0');
            } else {
                mainNav.classList.remove('opacity-0', 'max-h-0');
                mainNav.classList.add('opacity-100', 'max-h-screen', 'flex'); // Ensure flex is added when showing
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Only close the menu if it's currently open
                if (!mainNav.classList.contains('hidden')) {
                    mainNav.classList.add('hidden');
                    mainNav.classList.remove('opacity-100', 'max-h-screen', 'flex');
                    mainNav.classList.add('opacity-0', 'max-h-0');
                }
            });
        });

        // Removed window.resize listener as navigation is now always toggle-based
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
    // Removed active link logic as menu is always collapsed now
    // If you still want an active state for the links INSIDE the collapsed menu,
    // you would re-implement a simpler version of this.
    // For now, I'm assuming the primary focus is on the "always collapsed" behavior.
    // ----------------------------------------------------
});

