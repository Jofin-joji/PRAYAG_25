document.addEventListener("DOMContentLoaded", function() {

    // Check the screen width to decide which gallery to initialize
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    if (isMobile) {
        // ===================================================================
        // --- MOBILE SCRIPT (Original 3D Carousel) ---
        // ===================================================================

        // 1. The TOTAL NUMBER of images in your '/images' folder.
        const totalImagesInFolder = 40; // <-- UPDATED FROM 36 TO 40
        const imageExtension = 'jpg';

        const sliderItems = document.querySelectorAll(".slider .item img");
        const FADE_DURATION_MS = 500;
        const DELAY_BETWEEN_CHANGES_MS = 200;
        const ROTATION_DURATION_MS = 20000; // 20 seconds, matches your CSS animation

        const allImageFiles = [];
        for (let i = 1; i <= totalImagesInFolder; i++) {
            allImageFiles.push(`${i}.${imageExtension}`);
        }
        
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        function getNewRandomImages() {
            const currentImages = Array.from(sliderItems).map(img => img.src.split('/').pop());
            const availableImages = allImageFiles.filter(file => !currentImages.includes(file));
            const shuffled = availableImages.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, sliderItems.length);
        }

        async function updateImagesSequentially() {
            const newImages = getNewRandomImages();
            for (let i = 0; i < sliderItems.length; i++) {
                const imgElement = sliderItems[i];
                const newImageFile = newImages[i];
                if (newImageFile) {
                    imgElement.classList.add('fade-out');
                    await sleep(FADE_DURATION_MS);
                    imgElement.src = `images/${newImageFile}`;
                    imgElement.classList.remove('fade-out');
                    await sleep(DELAY_BETWEEN_CHANGES_MS);
                }
            }
        }
        
        function setInitialImages() {
            const initialImages = getNewRandomImages();
            sliderItems.forEach((imgElement, index) => {
                if(initialImages[index]) {
                    imgElement.src = `images/${initialImages[index]}`;
                }
            });
        }

        setInitialImages();
        setInterval(updateImagesSequentially, ROTATION_DURATION_MS);

    } else {
        // ===================================================================
        // --- DESKTOP SCRIPT (New Swiper.js Gallery) ---
        // ===================================================================
        
        const totalImages = 40;
        const folderPath = "images/";
        const fileExtension = ".jpg";
        const wrapper = document.getElementById("slider-wrapper");

        // Generate slides dynamically
        for (let i = 1; i <= totalImages; i++) {
          const slide = document.createElement("div");
          slide.classList.add("swiper-slide");
          slide.innerHTML = `<img src="${folderPath}${i}${fileExtension}" alt="Image ${i}">`;
          wrapper.appendChild(slide);
        }
        
        // Swiper configuration for desktop
        const swiperConfig = {
          effect: "coverflow",
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: "auto",
          loop: true,
          speed: 900,
          coverflowEffect: {
            rotate: 40,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: true,
          },
          autoplay: {
            delay: 500, // A slightly slower delay might be better for desktop
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        };

        // Initialize Swiper
        var swiper = new Swiper(".swiper", swiperConfig);
    }
});