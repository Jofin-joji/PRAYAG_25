document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Functionality ---
    const navItems = document.querySelectorAll('.nav-item');
    const navbar = document.querySelector('.navbar-right');
    const hamburgerBtn = document.querySelector('.hamburger-menu');

    // Function to close the mobile menu
    function closeMobileMenu() {
        navbar.classList.remove('nav-open');
        hamburgerBtn.classList.remove('is-active');
    }

    // Toggle Mobile Navbar on Hamburger Click
    hamburgerBtn.addEventListener('click', () => {
        navbar.classList.toggle('nav-open');
        hamburgerBtn.classList.toggle('is-active');
    });

    // Handle Navbar Item Clicks
    navItems.forEach(item => {
        // We add the event listener to the anchor tag's PARENT (the <li>)
        item.addEventListener('click', function(event) {
            // This allows the ripple effect to trigger, but does NOT
            // interfere with the link's primary navigation job.

            // The 'active' class logic is handled by which page you are on.
            // The ripple effect is purely visual.
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            // IMPORTANT: We need to check if the click was on the SVG or the <li>
            const clickEvent = event.touches ? event.touches[0] : event;
            const x = clickEvent.clientX - rect.left;
            const y = clickEvent.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // We need to append it to the clicked item (the li)
            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });

            // No event.preventDefault() means the link will work as intended.
        });
    });

    // Optional: Close menu if user clicks outside of it on mobile
    document.addEventListener('click', (event) => {
        if (navbar.classList.contains('nav-open') && 
            !navbar.contains(event.target) && 
            !hamburgerBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Optional: Hide hamburger button on resize if desktop mode
    window.addEventListener('resize', () => {
        // Check if the hamburger button is hidden via CSS
        if (window.getComputedStyle(hamburgerBtn).display === 'none') {
            closeMobileMenu();
        }
    });
});