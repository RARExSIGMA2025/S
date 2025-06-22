document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Mobile Navigation Toggle Logic
    // ----------------------------------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');
    // Select all links within the navigation menu, including those for index.html
    const navLinks = mainNav.querySelectorAll('a');

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle the visibility and opacity/height for smooth transition
            mainNav.classList.toggle('hidden');
            if (mainNav.classList.contains('hidden')) {
                mainNav.classList.remove('opacity-100', 'max-h-screen', 'flex'); // Remove flex when hiding
                mainNav.classList.add('opacity-0', 'max-h-0');
            } else {
                mainNav.classList.remove('opacity-0', 'max-h-0');
                mainNav.classList.add('opacity-100', 'max-h-screen', 'flex'); // Add flex when showing
            }
        });

        // Close menu when a link is clicked (for mobile UX)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Check if the menu is currently visible (i.e., not hidden) and it's a mobile view
                if (!mainNav.classList.contains('hidden') && window.innerWidth < 768) { // md breakpoint for Tailwind is 768px
                    mainNav.classList.add('hidden');
                    mainNav.classList.remove('opacity-100', 'max-h-screen', 'flex');
                    mainNav.classList.add('opacity-0', 'max-h-0');
                }
            });
        });

        // Handle menu state on window resize (from mobile to desktop and vice versa)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) { // If resized to desktop view
                mainNav.classList.remove('hidden', 'opacity-0', 'max-h-0');
                mainNav.classList.add('opacity-100', 'max-h-full', 'flex'); // Ensure it's visible and flex
            } else { // If resized to mobile view
                // If the menu was open in desktop view and now it's mobile, ensure it's hidden properly
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
        // Trigger animation by adding the 'is-visible' class after a short delay
        // This ensures the CSS transition can apply
        setTimeout(() => {
            element.classList.add('is-visible');
        }, 100); // Small delay to ensure CSS is rendered before animation starts
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
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
    });
});

