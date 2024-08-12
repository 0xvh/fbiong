document.addEventListener('DOMContentLoaded', function() {
    const starCount = 500; // Total number of stars to start with
    const starContainer = document.createElement('div');
    starContainer.id = 'stars';
    document.body.appendChild(starContainer);

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Array to keep track of stars
    let stars = [];

    function createStar() {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1 + 'px'; // Size range from 1px to 3px
        const x = Math.random() * width + 'px';
        const y = Math.random() * height + 'px';
        const opacity = Math.random() * 0.5 + 0.5; // Random opacity
        const direction = Math.random() > 0.5 ? 'up' : 'down'; // Random direction

        star.style.position = 'absolute';
        star.style.background = 'white';
        star.style.width = size;
        star.style.height = size;
        star.style.borderRadius = '50%';
        star.style.left = x;
        star.style.top = y;
        star.style.opacity = opacity;

        // Add class and data attribute for direction
        if (parseFloat(size) <= 2) {
            star.classList.add('small-star');
        } else {
            star.classList.add('large-star');
        }
        star.setAttribute('data-direction', direction);

        starContainer.appendChild(star);
        stars.push(star);
    }

    function updateStars() {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Remove stars that have moved out of the viewport and create new ones
        stars.forEach((star, index) => {
            const rect = star.getBoundingClientRect();
            if (rect.top > viewportHeight || rect.bottom < 0 || rect.left > viewportWidth || rect.right < 0) {
                star.remove();
                stars.splice(index, 1); // Remove star from array

                // Generate a new star at the edge of the viewport
                const newStar = document.createElement('div');
                const size = Math.random() * 2 + 1 + 'px'; // Size range from 1px to 3px
                const direction = Math.random() > 0.5 ? 'up' : 'down'; // Random direction

                if (direction === 'up') {
                    newStar.style.left = Math.random() * viewportWidth + 'px';
                    newStar.style.top = viewportHeight + 'px'; // Start from the bottom
                } else {
                    newStar.style.left = Math.random() * viewportWidth + 'px';
                    newStar.style.top = -parseFloat(size) + 'px'; // Start from the top
                }

                newStar.style.position = 'absolute';
                newStar.style.background = 'white';
                newStar.style.width = size;
                newStar.style.height = size;
                newStar.style.borderRadius = '50%';
                newStar.style.opacity = Math.random() * 0.5 + 0.5; // Random opacity

                // Add class and data attribute for direction
                if (parseFloat(size) <= 2) {
                    newStar.classList.add('small-star');
                } else {
                    newStar.classList.add('large-star');
                }
                newStar.setAttribute('data-direction', direction);

                starContainer.appendChild(newStar);
                stars.push(newStar);
            }
        });
    }

    function createInitialStars() {
        for (let i = 0; i < starCount; i++) {
            createStar();
        }
    }

    function updateStarsOnResize() {
        const starContainer = document.getElementById('stars');
        if (starContainer) {
            starContainer.remove(); // Remove existing stars
            stars = []; // Clear the array of stars
        }
        createInitialStars(); // Create new stars
    }

    window.addEventListener('resize', updateStarsOnResize);
    window.addEventListener('scroll', updateStars); // To check if stars need updating when scrolling

    createInitialStars(); // Initial star creation

    // Continuously update stars
    setInterval(updateStars, 100); // Adjust the interval as needed
});
