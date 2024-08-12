function showTime() {
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    let time = h + ":" + m + ":" + s; // Include seconds
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000); // Update every second
}

function showDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; // January is 0!
    let year = date.getFullYear();

    day = (day < 10) ? "0" + day : day;
    month = (month < 10) ? "0" + month : month;

    let currentDate = day + "/" + month + "/" + year;
    document.getElementById("MyDateDisplay").innerText = currentDate;
    document.getElementById("MyDateDisplay").textContent = currentDate;
}

// Call the functions to start updating the time and date
showTime();
showDate();
