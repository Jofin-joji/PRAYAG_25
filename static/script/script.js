// Dune-Inspired Event Site JavaScript

class DuneEventSite {
    constructor() {
        this.init();
    }

    init() {
        this.setupCustomCursor();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupEventCards();
        this.setupParallaxEffects();
        this.setupTypewriterEffect();
        this.setupSoundEffects();
    }

    // Preloader with Spice Animation


    // Custom Cursor with Spice Trail
    setupCustomCursor() {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (isTouchDevice) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        // Instant cursor movement
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .event-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.background = 'rgba(212, 175, 55, 0.3)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'transparent';
            });
        });
    }


    // Hero Title Animation
    animateHeroTitle() {
        const titleWords = document.querySelectorAll('.title-word');
        titleWords.forEach((word, index) => {
            setTimeout(() => {
                word.style.animationDelay = '0s';
                word.style.animation = 'titleReveal 0.8s ease-out forwards';
            }, index * 150);
        });
    }

    // Scroll-based Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Special animations for different elements
                    if (entry.target.classList.contains('event-card')) {
                        this.animateEventCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('prophecy-item')) {
                        this.animateProphecyItem(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });

        document.querySelectorAll('.event-card, .prophecy-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Event Card Animations
    animateEventCard(card) {
        const delay = Array.from(card.parentNode.children).indexOf(card) * 200;
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, delay);
    }

    // Prophecy Item Animations
    animateProphecyItem(item) {
        const delay = parseInt(item.dataset.delay) || 0;
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            
            // Animate icon
            const icon = item.querySelector('.prophecy-icon');
            if (icon) {
                setTimeout(() => {
                    icon.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        icon.style.transform = 'scale(1)';
                    }, 300);
                }, 200);
            }
        }, delay);
    }

    // Navigation Effects
    setupNavigation() {
        const nav = document.querySelector('.nav-container');
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        // Scroll effect on navigation
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
                nav.style.boxShadow = '0 2px 20px rgba(212, 175, 55, 0.1)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.9)';
                nav.style.boxShadow = 'none';
            }
        });

        // Mobile navigation toggle
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Event Cards Interactive Effects
    setupEventCards() {
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            // Tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            });

            // Click animation
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            });

            // Glitch effect on hover
            const cardTitle = card.querySelector('.card-title');
            if (cardTitle) {
                card.addEventListener('mouseenter', () => {
                    this.glitchText(cardTitle);
                });
            }
        });
    }

    // Glitch Text Effect
    glitchText(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let iterations = 0;
        
        const glitchInterval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
                element.textContent = originalText;
            }
            
            iterations += 1/3;
        }, 30);
    }

    // Parallax Effects
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-orbs, .energy-waves');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Typewriter Effect for Loading
    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        });
    }

    // Sound Effects (Optional - Web Audio API)
    setupSoundEffects() {
        // Create audio context for sound effects
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();

            // Hover sound effect
            const createHoverSound = () => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            };

            // Add sound to interactive elements
            document.querySelectorAll('.event-card, .cta-button').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (audioContext.state === 'suspended') {
                        audioContext.resume();
                    }
                    createHoverSound();
                });
            });
        }
    }
}

// Utility Functions
class DuneUtils {
    // Generate random particles
    static createParticles() {
        const particleContainer = document.querySelector('.sand-particles');
        if (!particleContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(212, 175, 55, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Smooth scroll to element
    static scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Format date for events
    static formatEventDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}


// Initialize the site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Your existing initializations
    new DuneEventSite();
    DuneUtils.createParticles(); // This might be redundant now, you can choose which particle effect to keep

    // STEP 4: ADD THE PARTICLES.JS INITIALIZATION CODE HERE
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
          "particles": {
            "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#D4AF37" }, // Using your --spice-gold variable color
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 2.5, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": false }, // Set to true if you want lines connecting particles
            "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false }, "resize": true },
            "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
          },
          "retina_detect": true
        });
    }
});