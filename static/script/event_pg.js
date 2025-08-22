// Custom Cursor
const cursor = document.getElementById('customCursor');
let mouseX = 0;
let mouseY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursor.style.opacity = '1';
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Show cursor when entering window
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

// Cursor hover effects
const interactiveElements = document.querySelectorAll('button, a, .content-section, .rule-item, .status-item');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = 'rgba(255, 195, 0, 0.2)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
    });
});

// Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Title Animation
function animateTitle() {
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0) rotateX(0deg)';
        }, index * 200);
    });
}

// Register Button Click Effect
const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', (e) => {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = registerBtn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    registerBtn.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
});

// Ripple effect styles
const rippleStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    animation: ripple-animation 0.6s linear forwards;
    pointer-events: none;
    transform: scale(0);
    z-index: 1;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add ripple styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Scroll-triggered animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.content-section, .status-panel');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Parallax effect for background
function handleParallax() {
    const rotatingBg = document.querySelector('.rotating-bg');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (rotatingBg) {
            rotatingBg.style.transform = `translate(-50%, -50%) rotate(${rate * 0.1}deg)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Glitch effect for title on hover
function addGlitchEffect() {
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach(word => {
        word.addEventListener('mouseenter', () => {
            word.style.animation = 'none';
            word.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ff00,
                0 2px #0000ff,
                0 -2px #ffff00
            `;
            
            setTimeout(() => {
                word.style.animation = 'titleGlow 4s ease-in-out infinite';
                word.style.textShadow = '0 0 20px var(--spice-gold-glow), 0 0 40px var(--spice-gold-glow)';
            }, 200);
        });
    });
}

// Status panel pulse effect
function addStatusEffects() {
    const registrationStatus = document.querySelector('.registration-status .status-value');
    const prizePool = document.querySelector('.prize-pool .status-value');
    
    if (registrationStatus) {
        setInterval(() => {
            registrationStatus.style.transform = 'scale(1.1)';
            setTimeout(() => {
                registrationStatus.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    if (prizePool) {
        prizePool.addEventListener('mouseenter', () => {
            prizePool.style.color = 'var(--spice-gold)';
            prizePool.style.textShadow = '0 0 20px var(--spice-gold-glow)';
        });
        
        prizePool.addEventListener('mouseleave', () => {
            prizePool.style.color = 'white';
            prizePool.style.textShadow = 'none';
        });
    }
}

// Keyboard navigation
function handleKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('register-btn')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });
}

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateTitle();
    handleScrollAnimations();
    handleParallax();
    addGlitchEffect();
    addStatusEffects();
    handleKeyboardNavigation();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', throttle(() => {
    // Recreate particles on resize
    const particlesContainer = document.getElementById('particlesContainer');
    particlesContainer.innerHTML = '';
    createParticles();
}, 250));

// Add focus styles for accessibility
const focusStyles = `
button:focus,
a:focus {
    outline: 2px solid var(--spice-gold);
    outline-offset: 2px;
}

.register-btn:focus {
    box-shadow: 0 0 0 3px rgba(255, 195, 0, 0.3);
}
`;

const focusStyleSheet = document.createElement('style');
focusStyleSheet.textContent = focusStyles;
document.head.appendChild(focusStyleSheet);