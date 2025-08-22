// --- START OF FILE script.js ---

document.addEventListener('DOMContentLoaded', () => {
    // --- Contact Card Animation on Scroll (for contacts.html) ---
    const contactCards = document.querySelectorAll('.contact-card');
    
    // THE FIX: Remove the check for "contacts.html".
    // Now it will run on any page as long as contact cards are present.
    if (contactCards.length > 0) {
        // Add initial hidden class to all cards
        contactCards.forEach(card => card.classList.add('card-hidden'));

        const observerOptions = {
            root: null, // viewport as root
            rootMargin: '0px',
            threshold: 0.1 // 10% of the item must be visible
        };

        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const index = Array.from(contactCards).indexOf(card);
                    // Set a custom property for animation-delay
                    card.style.setProperty('--animation-delay', `${index * 0.15}s`); // 0.15s delay between cards
                    card.classList.remove('card-hidden');
                    card.classList.add('card-visible');
                    observer.unobserve(card); // Stop observing once animated
                }
            });
        }, observerOptions);

        contactCards.forEach(card => {
            cardObserver.observe(card);
        });
    }


    // --- Interactive Contact Card Logic ---
    const cardsWrapper = document.querySelector('.contact-cards-wrapper');

    if (cardsWrapper) {
        cardsWrapper.addEventListener('click', (event) => {
            const icon = event.target.closest('.phone-btn, .email-btn');
            const backBtn = event.target.closest('.back-btn');

            // If an icon was clicked
            if (icon) {
                event.preventDefault();
                const card = icon.closest('.contact-card');
                const infoText = card.querySelector('.info-text');
                const info = icon.dataset.info;

                if (card && infoText && info) {
                    infoText.textContent = info;
                    card.classList.add('info-mode-active');
                }
            }

            // If the back button was clicked
            if (backBtn) {
                event.preventDefault();
                const card = backBtn.closest('.contact-card');
                if (card) {
                    card.classList.remove('info-mode-active');
                }
            }
        });
    }

    // --- Particle Background Animation (Sand-like Glittering) ---
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) { // Only run particle animation if canvas exists on the page
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId; // To store the requestAnimationFrame ID

        // Function to set canvas size to fill the window
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasSize(); // Initial set

        // Re-initialize particles and animation on window resize
        window.addEventListener('resize', () => {
            cancelAnimationFrame(animationFrameId); // Stop old animation loop
            setCanvasSize();
            initParticles(); // Re-initialize particles for new size
            animateParticles(); // Start new animation loop
        });

        // Particle class definition
        class Particle {
            constructor(x, y, size, initialAlpha, driftSpeed, twinkleSpeed) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.initialAlpha = initialAlpha; // Base opacity for the particle
                this.currentAlpha = initialAlpha; // Current animated opacity
                this.driftX = (Math.random() - 0.5) * driftSpeed; // Small random horizontal drift
                this.driftY = (Math.random() - 0.5) * driftSpeed; // Small random vertical drift
                this.twinkleSpeed = twinkleSpeed + (Math.random() * twinkleSpeed * 0.5); // Vary twinkle speed slightly per particle
                this.twinkleOffset = Math.random() * Math.PI * 2; // Random phase for sine wave to de-synchronize twinkling

                // Randomly pick between Dune's gold and orange for particle color (RGB values)
                this.colorBase = Math.random() < 0.5 ? '212, 175, 55' : '255, 140, 0'; 
            }

            // Draw the particle as a circle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(${this.colorBase}, ${this.currentAlpha})`;
                ctx.fill();
            }

            // Update particle position and alpha for glittering
            update() {
                // Update position with drift
                this.x += this.driftX;
                this.y += this.driftY;

                // Wrap particles around the screen for an endless feel
                if (this.x + this.size < 0) this.x = canvas.width + this.size;
                if (this.x - this.size > canvas.width) this.x = -this.size;
                if (this.y + this.size < 0) this.y = canvas.height + this.size;
                if (this.y - this.size > canvas.height) this.y = -this.size;

                // Update alpha for glittering effect using a sine wave
                // This makes the particle's opacity oscillate between 50% and 100% of its initialAlpha
                this.currentAlpha = this.initialAlpha * (0.5 + 0.5 * Math.sin(Date.now() * this.twinkleSpeed + this.twinkleOffset));
                
                this.draw();
            }
        }

        // Initialize particles
        function initParticles() {
            particles = []; // Clear existing particles
            let numberOfParticles;
            const screenArea = canvas.width * canvas.height;

            // Optimize particle count based on screen size
            if (window.innerWidth <= 768) { // Mobile devices
                numberOfParticles = screenArea / 8000; 
            } else { // Desktop devices
                numberOfParticles = screenArea / 300; 
            }
            
            // Clamp particle count.
            numberOfParticles = Math.min(Math.max(numberOfParticles, 150), 1000); 

            for (let i = 0; i < numberOfParticles; i++) {
                let size = Math.random() * 3.0 + 1.0; // Particle size between 1.0 and 4.0 pixels
                let x = Math.random() * canvas.width; // Random starting X position
                let y = Math.random() * canvas.height; // Random starting Y position
                let initialAlpha = Math.random() * 0.5 + 0.2; // Initial alpha between 0.2 and 0.7
                // ADJUSTED: Increased driftSpeed for faster particle movement
                let driftSpeed = 0.15; // Base speed for subtle drift (increased from 0.05)
                let twinkleSpeed = 0.001; // Base speed for alpha oscillation (twinkling)

                particles.push(new Particle(x, y, size, initialAlpha, driftSpeed, twinkleSpeed));
            }
        }

        // Animation Loop
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas each frame

            for (let i = 0; i < particles.length; i++) {
                particles[i].update(); // Update and draw each particle
            }
            animationFrameId = requestAnimationFrame(animateParticles); // Request next frame
        }

        // Start the particle system
        initParticles();
        animateParticles();
    }
});