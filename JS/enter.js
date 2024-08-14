document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('enter').addEventListener('click', function() {
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.display = 'none';
            // Remove blur effect and show landing page and datetime container
            document.body.style.filter = 'none';
            document.querySelector('.landing').style.display = 'block'; // Show the landing page
            document.querySelector('.datetime-container').style.display = 'flex'; // Show the datetime container
            document.getElementById("audio").play();
        }, 300); 
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const text = "click to proceed...";
    const container = document.querySelector('#enter p');
    let index = 0;

    function type() {
        if (index < text.length) {
            container.textContent += text.charAt(index);
            index++;
            setTimeout(type, 40); // Adjust the typing speed here
        }
    }

    type();
});

