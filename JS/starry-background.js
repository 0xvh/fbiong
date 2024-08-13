document.addEventListener('DOMContentLoaded', function() {
    const starCount = 500; 
    const starContainer = document.createElement('div');
    starContainer.id = 'stars';
    document.body.appendChild(starContainer);

    const width = window.innerWidth;
    const height = window.innerHeight;
    
  
    let stars = [];

    function createStar() {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1 + 'px'; 
        const x = Math.random() * width + 'px';
        const y = Math.random() * height + 'px';
        const opacity = Math.random() * 0.5 + 0.5; 
        const direction = Math.random() > 0.5 ? 'up' : 'down'; 

        star.style.position = 'absolute';
        star.style.background = 'white';
        star.style.width = size;
        star.style.height = size;
        star.style.borderRadius = '50%';
        star.style.left = x;
        star.style.top = y;
        star.style.opacity = opacity;

       
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

      
        stars.forEach((star, index) => {
            const rect = star.getBoundingClientRect();
            if (rect.top > viewportHeight || rect.bottom < 0 || rect.left > viewportWidth || rect.right < 0) {
                star.remove();
                stars.splice(index, 1); 

                // Generate a new star at the edge of the viewport
                const newStar = document.createElement('div');
                const size = Math.random() * 2 + 1 + 'px'; 
                const direction = Math.random() > 0.5 ? 'up' : 'down';

                if (direction === 'up') {
                    newStar.style.left = Math.random() * viewportWidth + 'px';
                    newStar.style.top = viewportHeight + 'px'; 
                } else {
                    newStar.style.left = Math.random() * viewportWidth + 'px';
                    newStar.style.top = -parseFloat(size) + 'px'; 
                }

                newStar.style.position = 'absolute';
                newStar.style.background = 'white';
                newStar.style.width = size;
                newStar.style.height = size;
                newStar.style.borderRadius = '50%';
                newStar.style.opacity = Math.random() * 0.5 + 0.5; 

                
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
            starContainer.remove(); 
            stars = []; 
        }
        createInitialStars(); 
    }

    window.addEventListener('resize', updateStarsOnResize);
    window.addEventListener('scroll', updateStars); 

    createInitialStars(); 

   
    setInterval(updateStars, 100); 
});
