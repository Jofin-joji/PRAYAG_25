document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".sponsor-carousel-track");
    const logos = track.querySelectorAll(".sponsor-logo-wrapper");

    let speed = 0.5; // pixels per frame (adjust for speed)
    let position = 0;

    function animate() {
        position -= speed;

        // Check first logo width + margin
        const firstLogo = track.firstElementChild;
        const logoWidth = firstLogo.offsetWidth + 80; // 40px left + 40px right margin

        if (-position >= logoWidth) {
            // Move first logo to the end
            track.appendChild(firstLogo);
            position += logoWidth;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    animate();
});
