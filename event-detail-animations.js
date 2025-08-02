document.addEventListener('DOMContentLoaded', function() {

    // --- INITIALIZE CURSOR AND PARTICLES (for consistency) ---
    const cursor = document.querySelector('.custom-cursor');
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => { 
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'var(--spice-gold)';
            });
            el.addEventListener('mouseleave', () => { 
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    } else {
        cursor.style.display = 'none';
    }

    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#FFD700" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false } }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false }, "resize": true }, "modes": { "repulse": { "distance": 100, "duration": 0.4 } } }, "retina_detect": true
        });
    }
    
    // --- GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate the starfield background on scroll for a parallax effect
    gsap.to("#stars-bg", {
        scrollTrigger: {
            scrub: 1
        },
        y: -200
    });

    // Animate the page elements on load
    gsap.from("#event-detail-page > *", {
        duration: 1,
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: "power3.out"
    });
    gsap.from(".status-item", {
         duration: 0.8,
         opacity: 0,
         x: 20,
         stagger: 0.15,
         delay: 0.5,
         ease: "power3.out"
    });
});