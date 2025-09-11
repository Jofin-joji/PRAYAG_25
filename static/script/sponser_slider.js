document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".sponsor-carousel-track");

    // Clone the logos to create a seamless loop
    const logos = Array.from(track.children);
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });

    let position = 0;
    const speed = 0.5; // Adjust for speed

    function animate() {
        position -= speed;
        
        // If the track has scrolled by half its width, reset the position
        if (position <= -track.scrollWidth / 2) {
            position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
        
        // Continue the animation loop
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
});