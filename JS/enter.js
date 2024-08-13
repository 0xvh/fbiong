document.getElementById('enter').addEventListener('click', function() {
   
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
        // Remove blur effect and show landing page
        document.body.style.filter = 'none';
        document.querySelector('.landing').style.display = 'block';
        document.getElementById("audio").play();
    }, 300); 
});