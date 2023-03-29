const isDebugging = false;
if (isDebugging) console.log(`isDebugging: ${isDebugging}`);

const ramadan = [{ day: 1, date: 1679594400, seheri: 1679611140, iftar: 1679660040, },
{ day: 2, date: 1679680800, seheri: 1679697480, iftar: 1679746500, },
{ day: 3, date: 1679767200, seheri: 1679783760, iftar: 1679832900, },
{ day: 4, date: 1679853600, seheri: 1679870100, iftar: 1679919360, },
{ day: 5, date: 1679940000, seheri: 1679956440, iftar: 1680005760, },
{ day: 6, date: 1680026400, seheri: 1680042780, iftar: 1680092220, },
{ day: 7, date: 1680112800, seheri: 1680129060, iftar: 1680178620, },
{ day: 8, date: 1680199200, seheri: 1680215400, iftar: 1680265080, },
{ day: 9, date: 1680285600, seheri: 1680301740, iftar: 1680351480, },
{ day: 10, date: 1680372000, seheri: 1680388080, iftar: 1680437940, },
{ day: 11, date: 1680458400, seheri: 1680474420, iftar: 1680524340, },
{ day: 12, date: 1680544800, seheri: 1680560760, iftar: 1680610740, },
{ day: 13, date: 1680631200, seheri: 1680647040, iftar: 1680697200, },
{ day: 14, date: 1680717600, seheri: 1680733440, iftar: 1680783600, },
{ day: 15, date: 1680804000, seheri: 1680819780, iftar: 1680870060, },
{ day: 16, date: 1680890400, seheri: 1680906120, iftar: 1680956460, },
{ day: 17, date: 1680976800, seheri: 1680992460, iftar: 1681042860, },
{ day: 18, date: 1681063200, seheri: 1681078800, iftar: 1681129320, },
{ day: 19, date: 1681149600, seheri: 1681165140, iftar: 1681215720, },
{ day: 20, date: 1681236000, seheri: 1681251480, iftar: 1681302180, },
{ day: 21, date: 1681322400, seheri: 1681337820, iftar: 1681388580, },
{ day: 22, date: 1681408800, seheri: 1681424100, iftar: 1681474980, },
{ day: 23, date: 1681495200, seheri: 1681510440, iftar: 1681561440, },
{ day: 24, date: 1681581600, seheri: 1681596780, iftar: 1681647840, },
{ day: 25, date: 1681668000, seheri: 1681683120, iftar: 1681734240, },
{ day: 26, date: 1681754400, seheri: 1681769460, iftar: 1681820700, },
{ day: 27, date: 1681840800, seheri: 1681855800, iftar: 1681907100, },
{ day: 28, date: 1681927200, seheri: 1681942140, iftar: 1681993560, },
{ day: 29, date: 1682013600, seheri: 1682028480, iftar: 1682079960, },
{ day: 30, date: 1682100000, seheri: 1682114820, iftar: 1682166420, },];


const currentTime = parseInt(Date.now() / 1000);
if (isDebugging) console.log(`current time: ${currentTime}`);


/// consts
const todayDateSpan = document.getElementById('todayDate');
const ramadanDateSpan = document.getElementById('ramadanDate');
const iftarOrSeheriSpan = document.getElementById('iftarOrSeheri');
const locationText = document.getElementById('locationText');
const staticTime = document.getElementById('staticTime');



todayDateSpan.innerHTML = `${timeConverterDateOnly(currentTime)}`;

//location first setup
let prefLocation = localStorage.getItem('userLocation');
if (isDebugging) console.log(`prefLocation from localStorage: ${prefLocation}`);
if (prefLocation === null) {
    prefLocation = 'dhk'; //default location if user hasn't set any or interacted with location
    localStorage.setItem('userLocation', 'dhk');
}
locationText.innerHTML = prefLocation;



// find out the ramadam days before current time (inclusides today's ramadan)
const whichDay = ramadan.filter((ramadan) => {
    return ramadan.date < currentTime;
});

//last obj will be today

if (isDebugging) console.log(whichDay);

let currentRamadanDate = 0;

if (whichDay.length < 1) {
    if (isDebugging) console.log("ramanday not yet");
    currentRamadanDate = 0;
} else {
    currentRamadanDate = whichDay[whichDay.length - 1].day;
    if (isDebugging) console.log(currentRamadanDate);
    if (isDebugging) console.log(typeof (currentRamadanDate));
}

let currentTimer;
let isIftar;

if (currentRamadanDate < 1) { // not ramadan yet, show countdown for day1 seheri
    if (isDebugging) console.log("no ramandan yet, show day1 seheri timer")
    isIftar = false;
    startCountdown(getTimeWithLocation(ramadan[0].seheri, prefLocation, isIftar));
    currentTimer = ramadan[0].seheri;
    ramadanDateSpan.innerHTML = "~ramadan is not here yet~";
    iftarOrSeheriSpan.innerHTML = "first seheri";
    staticTime.innerHTML = formatAMPM(getTimeWithLocation(ramadan[0].seheri, prefLocation, isIftar));
} else { //ramadan started, show normal

    //finding todays' radaman object, and tomorrows ramadan object, incase todays iftar time passed
    // and we need to show tomorrows seheri time
    const currentRamadanObj = ramadan.find((item) => item.day === currentRamadanDate);
    const nextRamadanObj = ramadan.find((item) => item.day === currentRamadanDate + 1);

    if (isDebugging) console.log(currentRamadanObj);


    if (getTimeWithLocation(currentRamadanObj.seheri, prefLocation) > currentTime) { // Seheri Time
        isIftar = false;
        startCountdown(getTimeWithLocation(currentRamadanObj.seheri, prefLocation, isIftar));
        currentTimer = currentRamadanObj.seheri;
        //ramadanDateSpan.innerHTML = currentRamadanDateFormat(toString(currentRamadanObj.day));
        ramadanDateSpan.innerHTML = currentRamadanDateFormat(currentRamadanObj.day.toString());
        iftarOrSeheriSpan.innerHTML = `today's seheri`;
        staticTime.innerHTML = formatAMPM(getTimeWithLocation(currentRamadanObj.seheri, prefLocation, isIftar));
        staticTime.dataset.time = currentRamadanObj.seheri;
        //NOTE: dataset.time will be absolute time, no location pref time added.
        staticTime.dataset.isiftar = false;
        hideProgressBarSection();
    }
    else if (getTimeWithLocation(currentRamadanObj.iftar, prefLocation) > currentTime) { // Iftar Time
        if (isDebugging) console.log("iftar time");
        isIftar = true;
        //we also send progressbar stuff:
        // (targetTime=endTime, showProgress=True, seheriTime = startTime)
        startCountdown(getTimeWithLocation(currentRamadanObj.iftar, prefLocation, isIftar), true, (getTimeWithLocation(currentRamadanObj.seheri, prefLocation, isIftar)));
        currentTimer = currentRamadanDate.iftar;
        ramadanDateSpan.innerHTML = currentRamadanDateFormat(currentRamadanObj.day.toString());
        iftarOrSeheriSpan.innerHTML = `today's iftar`;
        staticTime.innerHTML = formatAMPM(getTimeWithLocation(currentRamadanObj.iftar, prefLocation, isIftar));
        staticTime.dataset.time = currentRamadanObj.iftar;
        staticTime.dataset.isiftar = true;
        //since iftar, we run progressbar!!
    }
    else { // Next day Seheri time, Iftar done for today
        if (isDebugging) console.log(nextRamadanObj.date);
        isIftar = false;
        startCountdown(getTimeWithLocation(nextRamadanObj.seheri, prefLocation, isIftar));
        currentTimer = nextRamadanObj.seheri;
        ramadanDateSpan.innerHTML = currentRamadanDateFormat(nextRamadanObj.day.toString());
        iftarOrSeheriSpan.innerHTML = `tomorrow's seheri`;
        staticTime.innerHTML = formatAMPM(getTimeWithLocation(nextRamadanObj.seheri, prefLocation, isIftar));
        staticTime.dataset.time = nextRamadanObj.seheri;
        staticTime.dataset.isiftar = false;
        hideProgressBarSection();
    }
}

//let countdownInterval;

function startCountdown(targetTime, isProgress, startTime) {
    if (isDebugging) console.log("starting new countdown...");
    // if (countdownInterval) {
    //     clearInterval(countdownInterval);
    //     if (isDebugging) console.log("cleared the timer to start a new one");
    // }

    // Get the HTML paragraph element to display the remaining time
    const countdownElement = document.getElementById("countdownSpan");
    const countdownElementSecond = document.getElementById("countdownSpanSecond");

    // Update the content of the paragraph element with the initial time
    const currentTime = parseInt(Date.now() / 1000);
    const initialTime = Math.floor(targetTime - currentTime);
    const initialHours = Math.floor(initialTime / 3600);
    const initialMinutes = Math.floor((initialTime % 3600) / 60);
    const initialSeconds = initialTime % 60;
    if (initialHours === 0) { // dont show hours
        countdownElement.textContent = `${initialMinutes} minutes, ${initialSeconds} seconds`;
    } else {
        countdownElement.textContent = `${initialHours} hours, ${initialMinutes} minutes`;
        countdownElementSecond.textContent = `${initialSeconds} seconds`
    }

    // Update the content of the paragraph element every second until the target time is reached
    const countdownInterval = setInterval(() => {
        let currentTimeNow = parseInt(Date.now() / 1000);
        const remainingTime = Math.floor(targetTime - currentTimeNow);
        const remainingHours = Math.floor(remainingTime / 3600);
        const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
        const remainingSeconds = remainingTime % 60;
        if (remainingHours === 0) { // dont show hours
            countdownElement.textContent = `${remainingMinutes} minutes, ${remainingSeconds} seconds`;
        } else {
            countdownElement.textContent = `${remainingHours} hours, ${remainingMinutes} minutes`;
            countdownElementSecond.textContent = `${remainingSeconds} seconds`
        }

        if (isProgress == true) {//show progressbar
            const start = startTime;
            const end = targetTime;
            const now = currentTimeNow;

            const progress = (now - start) / (end - start) * 100;
            document.querySelector('.progress').style.width = `${progress}%`;
            document.querySelector('#progressPercentage').innerHTML = `${progress.toFixed(2)}%`;
        }

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "u looking at? stop/start eating lol";
        }
    }, 1000);
};

function hideProgressBarSection() {
    var progressElement = document.querySelector('.progress-bar');
    var toggleText = document.querySelector('.toggleBar');
    progressElement.style.display = "none";
    toggleText.style.display = "none";
    console.log(`hidden progressbar!`);
}

function timeConverterDateOnly(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = `${date} ${month} ${year}`
    return time;
}

function formatAMPM(UNIX_timestamp) {

    var date = new Date(UNIX_timestamp * 1000);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var secends = date.getSeconds();

    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    secends = secends < 10 ? '0' + secends : secends;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    return strTime;
}


function currentRamadanDateFormat(ramadanDate) {
    if (ramadanDate == 3) {
        return `3rd`;
    } else if (ramadanDate == 1) {
        return `1st`;
    } else if (ramadanDate == 2) {
        return `2nd`;
    } else {
        return `${ramadanDate}th`;
    }
}


let locations = ["dhk", "jhd", "naqi"];
let index;
if (prefLocation === 'dhk') {
    index = 0;
} else if (prefLocation === 'jhd') {
    index = 1;
} else {
    index = 2;
};

// TODO: Location is changing in localstorage, but countdown not updating in realtime.
function changeLocation() {
    if (isDebugging) console.log(`currentTimer: ${currentTimer}`);
    let staticTimeSpan = document.getElementById('staticTime');
    if (isDebugging) console.log(`in changeloc, dataset time: ${staticTime.dataset.isiftar}`);
    if (isDebugging) console.log("changeLoc() in");
    let locationSpan = document.getElementById('location');
    if (isDebugging) console.log(`locationspan: ${locationSpan}`);
    index = ++index % locations.length;
    if (isDebugging) console.log(`index: ${index}`);
    if (index === 0) { //locatin is dhk
        if (isDebugging) console.log("chaning loc to dhk");
        locationSpan.innerHTML = 'dhk';
        staticTimeSpan.innerHTML = formatAMPM(getTimeWithLocation(staticTime.dataset.time, "dhk", staticTime.dataset.isiftar));
        localStorage.setItem('userLocation', 'dhk');
        clearInterval(countdownInterval);
        startCountdown(getTimeWithLocation(staticTime.dataset.time, "dhk", isIftar));
    } else if (index === 1) { //jhenidah
        if (isDebugging) console.log("chaning loc to jhd");
        locationSpan.innerHTML = 'jhd';
        staticTimeSpan.innerHTML = formatAMPM(getTimeWithLocation(staticTime.dataset.time, "jhd", staticTime.dataset.isiftar));
        localStorage.setItem('userLocation', 'jhd');
        clearInterval(countdownInterval);
        startCountdown(getTimeWithLocation(staticTime.dataset.time, "jhd", isIftar));

    } else { // location is naqi
        if (isDebugging) console.log("chaning loc to naqi");
        locationSpan.innerHTML = 'naqi';
        staticTimeSpan.innerHTML = formatAMPM(getTimeWithLocation(staticTime.dataset.time, "naqi", staticTime.dataset.isiftar));
        localStorage.setItem('userLocation', 'naqi');
        clearInterval(countdownInterval);
        startCountdown(getTimeWithLocation(staticTime.dataset.time, "naqi", isIftar));
    };
};



function getTimeWithLocation(time, location, isIftar) {
    time = parseInt(time);
    switch (location) {
        case "dhk":
            if (isDebugging) console.log(`returning time for ${location}`);
            return time;
        case "jhd":
            if (isDebugging) console.log(`returning time for ${location}`);
            return time + 300;
        case "naqi":
            if (isDebugging) console.log(`returning time for ${location}`);
            if (isDebugging) console.log(isIftar ? time + 900 : time);
            return isIftar ? time + 900 : time;
    }
}


//countdown

function progress(start, end) {

    // Get the start and end timestamps in milliseconds
    // Get the current timestamp in milliseconds
    const now = parseInt(Date.now() / 1000);

    console.log(now);


    // Get the start and end timestamps in milliseconds
    // Calculate the progress percentage
    const progress = (now - start) / (end - start) * 100;


    // Update the progress bar width
    document.querySelector('.progress').style.width = `${progress}%`;

    // Update the progress bar width every second
    setInterval(() => {
        const now = Date.now();
        const progress = (now - start) / (end - start) * 100;
        document.querySelector('.progress').style.width = `${progress}%`;
    }, 1000);


}

function toggleBar() {
    var progressElement = document.querySelector('.progress-bar');
    if (progressElement.style.display === "none") {
        progressElement.style.display = "block";
    } else {
        progressElement.style.display = "none";
    }
}

//monochrome section
//https://stackoverflow.com/a/68824350/4389146

function onLoadFunction() {
    const prefersMono = localStorage.getItem('prefersMono');
    if (isDebugging) console.log(`localstorage prefers mono: ${prefersMono}`);
    if (prefersMono == 1) {
        if (isDebugging) console.log(`prefersmono is TRUE here`); // 0 is false
        document.documentElement.classList.add("mono");
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
    } else {
        if (isDebugging) console.log(`prefersmono is FALSE here`); // 1 is true
        //document.documentElement.classList.remove("mono");
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { //dark mode using prefers
            if (isDebugging) console.log(`on dark mode so setting dark mode theme color`);
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#171717');
        } else {
            if (isDebugging) console.log(`on light mode so setting light mode theme color`);
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#fc4445');
        }

    }

}



function toggleMonochrome() {
    if (isDebugging) console.log(`should try to toggle to monochrome`);
    // if we are already in mono, remove the mono class and let
    // prefer-color-scheme deal with it
    if (document.documentElement.classList.contains("mono")) {
        document.documentElement.classList.remove("mono");
        localStorage.setItem('prefersMono', 0);
        const colorSchemeCode = getCurrentColorSchemeCode();
        metaThemeColorChanger(colorSchemeCode);
        return;
    }

    if (document.documentElement.classList.contains("light")) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("mono");
        metaThemeColorChanger('#000000');
        localStorage.setItem('prefersMono', 1);
    } else if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("mono");
        metaThemeColorChanger('#000000');
        localStorage.setItem('prefersMono', 1);
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { //dark mode using prefers
            if (isDebugging) console.log(`from prefers-color-scheme`);
            document.documentElement.classList.add("mono");
            metaThemeColorChanger('#000000');
            localStorage.setItem('prefersMono', 1);
        } else {
            if (isDebugging) console.log(`from prefers-color-scheme`);
            document.documentElement.classList.add("mono");
            metaThemeColorChanger('#000000');
            localStorage.setItem('prefersMono', 1);
        }
    }
}

function getCurrentColorSchemeCode(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { //dark mode using prefers
        if (isDebugging) console.log(`dark mode prefers`);
        return `#171717`;
    } else {
        if (isDebugging) console.log(`light mode prefers`);
        return `#fc4445`;
    }

}


function metaThemeColorChanger(colorScheme) {
    // remove existing meta tag with name="theme-color"
    var metaTags = document.getElementsByTagName('meta');
    for (var i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute('name') === 'theme-color') {
            metaTags[i].parentNode.removeChild(metaTags[i]);
            break;
        }
    }

    // add new meta tag with name="theme-color"
    var metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'theme-color');
    metaTag.setAttribute('content', colorScheme);
    document.getElementsByTagName('head')[0].appendChild(metaTag);

}
