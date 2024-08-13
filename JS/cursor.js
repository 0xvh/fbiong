document.addEventListener('DOMContentLoaded', () => {
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'cursor-container';
    document.body.appendChild(cursorContainer);

    const stars = [];
    const tinyDots = [];
    const starRemainingTicks = [];
    const tinyRemainingTicks = [];
    const sparkles = 250; 
    const sparkleLifetime = 20; 
    const sparkleDistance = 30; 

    let docHeight;
    let docWidth;
    let sparklesEnabled = true;

    
    function initParticles() {
        docHeight = document.documentElement.scrollHeight;
        docWidth = document.documentElement.scrollWidth;

        for (let i = 0; i < sparkles; i++) {
            // Create star
            const starDiv = document.createElement('div');
            starDiv.className = 'cursor-star';
            const barHorizontal = document.createElement('div');
            barHorizontal.className = 'bar-horizontal';
            const barVertical = document.createElement('div');
            barVertical.className = 'bar-vertical';
            starDiv.appendChild(barHorizontal);
            starDiv.appendChild(barVertical);
            cursorContainer.appendChild(starDiv);
            stars.push(starDiv);
            starRemainingTicks.push(null);

            // Create tiny dot
            const tinyDiv = document.createElement('div');
            tinyDiv.className = 'cursor-tiny';
            cursorContainer.appendChild(tinyDiv);
            tinyDots.push(tinyDiv);
            tinyRemainingTicks.push(null);
        }

        window.addEventListener('resize', () => {
            docHeight = document.documentElement.scrollHeight;
            docWidth = document.documentElement.scrollWidth;
        });

        document.addEventListener('mousemove', (e) => {
            if (sparklesEnabled && !e.buttons) {
                const distance = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
                const deltaX = e.movementX * sparkleDistance * 2 / distance;
                const deltaY = e.movementY * sparkleDistance * 2 / distance;
                const probability = distance / sparkleDistance;
                let cumulativeX = 0;
                let mouseY = e.pageY;
                let mouseX = e.pageX;

                while (Math.abs(cumulativeX) < Math.abs(e.movementX)) {
                    createStar(mouseX, mouseY, probability);
                    let delta = Math.random();
                    mouseX -= deltaX * delta;
                    mouseY -= deltaY * delta;
                    cumulativeX += deltaX * delta;
                }
            }
        });

        animateParticles();
    }

    function createStar(x, y, probability = 1.0) {
        if (x + 5 >= docWidth || y + 5 >= docHeight) {
            return;
        }

        if (Math.random() > probability) {
            return;
        }

        let minLifetime = sparkleLifetime * 2 + 1;
        let minIndex = NaN;

        for (let i = 0; i < sparkles; i++) {
            if (starRemainingTicks[i] === null) {
                minLifetime = null;
                minIndex = i;
                break;
            } else if (starRemainingTicks[i] < minLifetime) {
                minLifetime = starRemainingTicks[i];
                minIndex = i;
            }
        }

        if (minLifetime) {
            starToTiny(minIndex);
        }

        if (minIndex >= 0) {
            starRemainingTicks[minIndex] = sparkleLifetime * 2;
            stars[minIndex].style.left = `${x}px`;
            stars[minIndex].style.top = `${y}px`;
            stars[minIndex].style.visibility = 'visible';
        }
    }

    function updateStar(i) {
        if (starRemainingTicks[i] === null) {
            return false;
        }

        starRemainingTicks[i] -= 1;

        if (starRemainingTicks[i] === 0) {
            starToTiny(i);
            return false;
        }

        if (starRemainingTicks[i] === sparkleLifetime) {
            stars[i].style.width = '4px';
            stars[i].style.height = '4px';
        }

        if (starRemainingTicks[i] > 0) {
            stars[i].style.top = `${parseFloat(stars[i].style.top) + 1 + 3 * Math.random()}px`;
            stars[i].style.left = `${parseFloat(stars[i].style.left) + (i % 5 - 2) / 5}px`;
            return true;
        }

        starRemainingTicks[i] = null;
        stars[i].style.visibility = 'hidden';
        return false;
    }

    function starToTiny(i) {
        if (starRemainingTicks[i] === null) {
            return;
        }

        if (parseFloat(stars[i].style.top) + 3 < docHeight && parseFloat(stars[i].style.left) + 3 < docWidth) {
            tinyRemainingTicks[i] = sparkleLifetime * 2;
            tinyDots[i].style.top = stars[i].style.top;
            tinyDots[i].style.left = stars[i].style.left;
            tinyDots[i].style.visibility = 'visible';
        }

        starRemainingTicks[i] = null;
        stars[i].style.visibility = 'hidden';
    }

    function updateTiny(i) {
        if (tinyRemainingTicks[i] === null) {
            return false;
        }

        tinyRemainingTicks[i] -= 1;

        if (tinyRemainingTicks[i] === sparkleLifetime) {
            tinyDots[i].style.width = '1px';
            tinyDots[i].style.height = '1px';
        }

        if (tinyRemainingTicks[i] > 0) {
            tinyDots[i].style.top = `${parseFloat(tinyDots[i].style.top) + 1 + 2 * Math.random()}px`;
            tinyDots[i].style.left = `${parseFloat(tinyDots[i].style.left) + (i % 4 - 2) / 4}px`;
            return true;
        }

        tinyRemainingTicks[i] = null;
        tinyDots[i].style.visibility = 'hidden';
        return false;
    }

    function animateParticles(fps = 60) {
        const intervalMilliseconds = 1000 / fps;

        let alive = 0;

        for (let i = 0; i < stars.length; i++) {
            alive += updateStar(i);
        }

        for (let i = 0; i < tinyDots.length; i++) {
            alive += updateTiny(i);
        }

        if (alive === 0 && !sparklesEnabled) {
            sparkleDestroy();
        }

        setTimeout(() => animateParticles(fps), intervalMilliseconds);
    }

    function sparkleDestroy() {
        let elem;
        while (tinyDots.length) {
            elem = tinyDots.pop();
            if (elem) {
                cursorContainer.removeChild(elem);
            }
        }

        while (stars.length) {
            elem = stars.pop();
            if (elem) {
                cursorContainer.removeChild(elem);
            }
        }
    }

    initParticles();
});
