function showTime() {
    let date = new Date();
    let h = date.getHours(); 
    let m = date.getMinutes(); 
    let s = date.getSeconds(); 

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    let time = h + ":" + m + ":" + s; 
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000); 
}

function showDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();

    day = (day < 10) ? "0" + day : day;
    month = (month < 10) ? "0" + month : month;

    let currentDate = day + "/" + month + "/" + year;
    document.getElementById("MyDateDisplay").innerText = currentDate;
    document.getElementById("MyDateDisplay").textContent = currentDate;
}


showTime();
showDate();
