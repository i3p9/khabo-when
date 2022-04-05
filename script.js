const iftarTimeDhaka = [1648988340, 1649074740, 1649161200, 1649247600, 1649334060, 1649420460, 1649506860, 1649593320, 1649679720, 1649766180, 1649852580, 1649938980, 1650025440, 1650111840, 1650198240, 1650284700, 1650371100, 1650457560, 1650543960, 1650630420, 1650716820, 1650803280, 1650889680, 1650976140, 1651062540, 1651148940, 1651235400, 1651321800, 1651408260, 1651494660]
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;// + ':' + sec ;
    return time;
}

function timeConverterDateOnly(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = `${date} ${month} ${year}`
    return time;
}


//console.log(timeConverter(iftarTimeDhaka[2]));
//console.log(parseInt(Date.now() / 1000));
const currentTime = parseInt(Date.now() / 1000);
let todaysIftar;
let ramadanDate;

for (let index = 0; index < iftarTimeDhaka.length; index++) {
    console.log(`we took ${index} now.`)
    if (currentTime > iftarTimeDhaka[index]) {
        console.log(index);
        todaysIftar = iftarTimeDhaka[index + 1];
        //console.log(iftarTimeDhaka[index + 1]);
        ramadanDate = index +2;
    } else{
        break;
    }
}

if(ramadanDate == 3){
    ramadanDate = '3rd';
} else if(ramadanDate == 1){
    ramadanDate = '1st';
} else {
    ramadanDate = ramadanDate + 'nd';
}


console.log(`Today's Iftar time is ${timeConverter(todaysIftar)}`);


var remainingTime = 1649161200;
//var haha = '<span id="haha"></span>';
var countDownSpan = document.getElementById('timer');
var ramadanDateSpan = document.getElementById('ramadanDate');
var todayDateSpna = document.getElementById('todayDate');
todayDateSpna.innerHTML = `${timeConverterDateOnly(currentTime)}`;

let newInterval;
newInterval = setInterval(function () { MModeTimer(todaysIftar+300) }, 1000);


function MModeTimer(todaysIftar) {

    var currentTime = new Date().getTime() / 1000;
    var futureTime = todaysIftar;
    var timeRemaining = futureTime - currentTime;
    var minute = 60;
    var hour = 60 * 60;
    var day = 60 * 60 * 24;
    var dayFloor = Math.floor(timeRemaining / day);
    var hourFloor = Math.floor((timeRemaining - dayFloor * day) / hour);
    var minuteFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour) / minute);
    var secondFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour - minuteFloor * minute));
    var countdownCompleted = "EAT NOW!!!";

    if (secondFloor <= 0 && minuteFloor <= 0) {
        window.location.reload(true);
        //clearInterval(MModeTimer);
        countDownSpan.innerHTML = countdownCompleted;

    } else {

        if (futureTime > currentTime) {
            var content = `${hourFloor} Hours ${minuteFloor} Minutes ${secondFloor} Seconds`;
            countDownSpan.innerHTML = content;
            ramadanDateSpan.innerHTML = ramadanDate;
        }
    }
}

function changeLocation(){
    let locationSpan = document.getElementById('location');
    if(locationSpan.innerHTML === 'jhd'){
        locationSpan.innerHTML = 'dhk';
        clearInterval(newInterval);
        newInterval = setInterval(function () { MModeTimer(todaysIftar) }, 1000);
    } else {
        locationSpan.innerHTML = 'jhd';
        clearInterval(newInterval);
        newInterval = setInterval(function () { MModeTimer(todaysIftar+300) }, 1000);
    }
}
