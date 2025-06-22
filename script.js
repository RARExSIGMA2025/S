document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a'); // Get all nav links

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle the visibility and opacity for smooth transition
            mainNav.classList.toggle('hidden');
            if (mainNav.classList.contains('hidden')) {
                mainNav.classList.remove('opacity-100', 'max-h-screen');
                mainNav.classList.add('opacity-0', 'max-h-0');
            } else {
                mainNav.classList.remove('opacity-0', 'max-h-0');
                mainNav.classList.add('opacity-100', 'max-h-screen');
            }
        });

        // Close menu when a link is clicked (for mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mainNav.classList.contains('hidden')) { // Only close if menu is open (mobile view)
                    mainNav.classList.add('hidden');
                    mainNav.classList.remove('opacity-100', 'max-h-screen');
                    mainNav.classList.add('opacity-0', 'max-h-0');
                }
            });
        });

        // Close menu if window is resized past mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) { // md breakpoint for Tailwind
                mainNav.classList.remove('hidden', 'opacity-0', 'max-h-0');
                mainNav.classList.add('opacity-100', 'max-h-full');
            } else if (mainNav.classList.contains('opacity-100') && !mobileMenuButton.classList.contains('hidden')) {
                // If it's desktop width, ensure it's open, otherwise if it's mobile and open, close it
                mainNav.classList.add('hidden');
                mainNav.classList.remove('opacity-100', 'max-h-screen');
                mainNav.classList.add('opacity-0', 'max-h-0');
            }
        });
    }
});

