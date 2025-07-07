document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('section[id]');
    const socialSidebar = document.getElementById('social-sidebar');
    const themeToggleButton = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // --- Theme Toggle Logic ---
    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.remove('light-mode');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.body.classList.add('light-mode');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
        localStorage.setItem('theme', theme);
    }

    // Initialize theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no theme saved
    setTheme(savedTheme);

    // Event listener for theme toggle button
    themeToggleButton.addEventListener('click', function() {
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // --- Mobile Navigation Toggle ---
    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', function() {
            mainNav.classList.toggle('hidden');
            if (mainNav.classList.contains('hidden')) {
                mainNav.classList.remove('opacity-100', 'max-h-screen', 'flex');
                mainNav.classList.add('opacity-0', 'max-h-0');
            } else {
                mainNav.classList.remove('opacity-0', 'max-h-0');
                mainNav.classList.add('opacity-100', 'max-h-screen', 'flex');
            }
        });

        // Close mobile menu when a nav link is clicked (for smooth UX)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Only close if on a mobile view and menu is open
                if (window.innerWidth < 768 && !mainNav.classList.contains('hidden')) {
                    mainNav.classList.add('hidden');
                    mainNav.classList.remove('opacity-100', 'max-h-screen');
                    mainNav.classList.add('opacity-0', 'max-h-0');
                }
            });
        });

        // Handle window resize to ensure correct menu state for desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) { // If desktop view
                mainNav.classList.remove('hidden', 'opacity-0', 'max-h-0');
                mainNav.classList.add('opacity-100', 'max-h-full');
            } else { // If mobile view
                // If menu is currently open (from desktop resize) and now mobile, hide it
                if (!mainNav.classList.contains('hidden')) {
                    mainNav.classList.add('hidden');
                    mainNav.classList.remove('opacity-100', 'max-h-screen');
                    mainNav.classList.add('opacity-0', 'max-h-0');
                }
            }
        });
    }

    // --- Sticky Header and Active Nav Link Logic ---
    window.addEventListener('scroll', function() {
        // Sticky Header: Add 'scrolled' class when scrolled past a certain point
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Navigation Link: Highlight current section in navigation
        let currentSectionId = '';
        const headerHeight = header.offsetHeight; // Get dynamic header height

        sections.forEach(section => {
            // Adjust sectionTop to consider the fixed header and a small buffer
            const sectionTop = section.offsetTop - headerHeight - 30;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('current-active-link');
            // Special handling for album.html link, which is external
            if (link.getAttribute('href') === 'album.html' && window.location.pathname.includes('album.html')) {
                link.classList.add('current-active-link');
            } else if (link.getAttribute('href').includes(currentSectionId) && currentSectionId !== '') {
                link.classList.add('current-active-link');
            }
        });
    });

    // --- Initial Load Animations for Hero Section ---
    const heroTextElements = document.querySelectorAll('.animate-on-load-hero-text');
    const heroButtonElements = document.querySelectorAll('.animate-on-load-hero-buttons');

    // Trigger hero section animations after a slight delay to ensure CSS is loaded
    setTimeout(() => {
        heroTextElements.forEach(el => el.classList.add('is-visible'));
        heroButtonElements.forEach(el => el.classList.add('is-visible'));
    }, 100);

    // --- On-Scroll Animations for other sections (using IntersectionObserver) ---
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // Use the viewport as the root for observation
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible in the viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply a staggered delay for grid items (like course cards, facility cards)
                // This uses a CSS custom property '--delay' for animation-delay
                if (entry.target.classList.contains('card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.setProperty('--delay', `${index * 0.1}s`);
                }
                entry.target.classList.add('is-visible'); // Add class to trigger animation
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe each element marked for scroll animation
    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // --- Social Media Sidebar Animation (Slide-in) ---
    // Trigger social media sidebar to slide in after hero animation
    setTimeout(() => {
        if (socialSidebar) { // Check if the element exists
            socialSidebar.classList.add('is-visible');
        }
    }, 800); // Adjust delay as needed

    // --- Ripple Effect for Buttons ---
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.offsetWidth, button.offsetHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");

        // Remove any existing ripples to prevent accumulation
        const oldRipple = button.querySelector(".ripple");
        if (oldRipple) {
            oldRipple.remove();
        }

        button.appendChild(circle);
    }

    // Apply ripple effect to primary/secondary buttons and social media links
    document.querySelectorAll('.btn-primary, .btn-secondary, .social-icon-link').forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

