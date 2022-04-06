const iftarTimeDhaka = [1648988340, 1649074740, 1649161200, 1649247600, 1649334060, 1649420460, 1649506860, 1649593320, 1649679720, 1649766180, 1649852580, 1649938980, 1650025440, 1650111840, 1650198240, 1650284700, 1650371100, 1650457560, 1650543960, 1650630420, 1650716820, 1650803280, 1650889680, 1650976140, 1651062540, 1651148940, 1651235400, 1651321800, 1651408260, 1651494660];
const seheriTimeDhaka = [1648938420,1649024760,1649111040,1649197440,1649283780,1649370120,1649456460,1649542800,1649629140,1649715480,1649801820,1649888160,1649974500,1650060840,1650147180,1650233520,1650319860,1650406200,1650492540,1650578880,1650665220,1650751560,1650837900,1650924240,1651010580,1651096920,1651183260,1651269600,1651355940,1651442280];

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;// + ':' + sec ;
    return time;
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


//console.log(timeConverter(iftarTimeDhaka[2]));
//console.log(parseInt(Date.now() / 1000));
const currentTime = parseInt(Date.now() / 1000);
let todaysIftar;
let ramadanDate;

for (let index = 0; index < iftarTimeDhaka.length; index++) {
    console.log(`iftar: we took ${index} now.`)
    if (currentTime > iftarTimeDhaka[index]) {
        console.log(index);
        todaysIftar = iftarTimeDhaka[index + 1];
        //console.log(iftarTimeDhaka[index + 1]);
        ramadanDate = index + 2;
    } else {
        break;
    }
}

//handle seheri
for (let index = 0; index < seheriTimeDhaka.length; index++) {
    console.log(`seheri: we took ${index} now.`)
    if (currentTime > seheriTimeDhaka[index]) {
        console.log(index);
        todaysSeheri = seheriTimeDhaka[index + 1];
        //console.log(iftarTimeDhaka[index + 1]);
        //ramadanDate = index + 2;
    } else {
        break;
    }
}
let showIftar;

//decide what to show??
if (todaysIftar > todaysSeheri) {
    console.log(`iftar bigger than seheri`);
    //show seheri
    showIftar = false;
} else {
    console.log(`seheri bigger than iftar`);
    //shwo iftar
    showIftar = true;
}

console.log(showIftar);


console.log(`Today's Iftar time is ${timeConverter(todaysIftar)}`);


let remainingTime = 1649161200;
//let haha = '<span id="haha"></span>';
let countDownSpan = document.getElementById('timer');
let ramadanDateSpan = document.getElementById('ramadanDate');
let todayDateSpna = document.getElementById('todayDate');
let iftarOrSeheriSpan = document.getElementById('iftarOrSeheri');
todayDateSpna.innerHTML = `${timeConverterDateOnly(currentTime)}`;

let newInterval;
if (showIftar == true) {
    newInterval = setInterval(function () { MModeTimer(todaysIftar + 300) }, 1000);
    iftarOrSeheriSpan.innerHTML = 'iftar';
} else {
    newInterval = setInterval(function () { MModeTimer(todaysSeheri + 300) }, 1000);
    iftarOrSeheriSpan.innerHTML = 'seheri ends';
    ramadanDate -= 1;
};

if (ramadanDate == 3) {
    ramadanDate = '3rd';
} else if (ramadanDate == 1) {
    ramadanDate = '1st';
} else {
    ramadanDate = ramadanDate + 'th';
}


function MModeTimer(todaysIftar) {

    let currentTime = new Date().getTime() / 1000;
    let futureTime = todaysIftar;
    let timeRemaining = futureTime - currentTime;
    let minute = 60;
    let hour = 60 * 60;
    let day = 60 * 60 * 24;
    let dayFloor = Math.floor(timeRemaining / day);
    let hourFloor = Math.floor((timeRemaining - dayFloor * day) / hour);
    let minuteFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour) / minute);
    let secondFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour - minuteFloor * minute));
    let countdownCompleted = "EAT NOW!!!";

    if (secondFloor <= 0 && minuteFloor <= 0) {
        window.location.reload(true);
        //clearInterval(MModeTimer);
        countDownSpan.innerHTML = countdownCompleted;

    } else {

        if (futureTime > currentTime) {
            let content = `${hourFloor} Hours ${minuteFloor} Minutes ${secondFloor} Seconds`;
            countDownSpan.innerHTML = content;
            ramadanDateSpan.innerHTML = ramadanDate;
        }
    }
}

function changeLocation() {
    let locationSpan = document.getElementById('location');
    if (locationSpan.innerHTML === 'jhd') {
        locationSpan.innerHTML = 'dhk';
        clearInterval(newInterval);
        if (showIftar == true) {
            newInterval = setInterval(function () { MModeTimer(todaysIftar) }, 1000);
        } else {
            newInterval = setInterval(function () { MModeTimer(todaysSeheri) }, 1000);
        };
    } else {
        locationSpan.innerHTML = 'jhd';
        clearInterval(newInterval);
        if (showIftar == true) {
            newInterval = setInterval(function () { MModeTimer(todaysIftar + 300) }, 1000);
        } else {
            newInterval = setInterval(function () { MModeTimer(todaysSeheri + 300) }, 1000);
        };
    }
}
