const isDebugging = false;
if (isDebugging) console.log(`isDebugging: ${isDebugging}`);

const ramadan = [
	{ day: 1, date: 1740852000, seheri: 1740870240, iftar: 1740916920 },
	{ day: 2, date: 1740938400, seheri: 1740956580, iftar: 1741003380 },
	{ day: 3, date: 1741024800, seheri: 1741042920, iftar: 1741089780 },
	{ day: 4, date: 1741111200, seheri: 1741129260, iftar: 1741176240 },
	{ day: 5, date: 1741197600, seheri: 1741215600, iftar: 1741262640 },
	{ day: 6, date: 1741284000, seheri: 1741301940, iftar: 1741349100 },
	{ day: 7, date: 1741370400, seheri: 1741388280, iftar: 1741435500 },
	{ day: 8, date: 1741456800, seheri: 1741474620, iftar: 1741521960 },
	{ day: 9, date: 1741543200, seheri: 1741560960, iftar: 1741608360 },
	{
		day: 10,
		date: 1741629600,
		seheri: 1741647300,
		iftar: 1741694760,
	},
	{
		day: 11,
		date: 1741716000,
		seheri: 1741733640,
		iftar: 1741781220,
	},
	{
		day: 12,
		date: 1741802400,
		seheri: 1741819980,
		iftar: 1741867620,
	},
	{
		day: 13,
		date: 1741888800,
		seheri: 1741906320,
		iftar: 1741954080,
	},
	{
		day: 14,
		date: 1741975200,
		seheri: 1741992660,
		iftar: 1742040480,
	},
	{
		day: 15,
		date: 1742061600,
		seheri: 1742079000,
		iftar: 1742126880,
	},
	{
		day: 16,
		date: 1742148000,
		seheri: 1742165340,
		iftar: 1742213340,
	},
	{
		day: 17,
		date: 1742234400,
		seheri: 1742251680,
		iftar: 1742299740,
	},
	{
		day: 18,
		date: 1742320800,
		seheri: 1742338020,
		iftar: 1742386200,
	},
	{
		day: 19,
		date: 1742407200,
		seheri: 1742424360,
		iftar: 1742472600,
	},
	{
		day: 20,
		date: 1742493600,
		seheri: 1742510700,
		iftar: 1742559000,
	},
	{
		day: 21,
		date: 1742580000,
		seheri: 1742597040,
		iftar: 1742645460,
	},
	{
		day: 22,
		date: 1742666400,
		seheri: 1742683380,
		iftar: 1742731860,
	},
	{
		day: 23,
		date: 1742752800,
		seheri: 1742769720,
		iftar: 1742818260,
	},
	{
		day: 24,
		date: 1742839200,
		seheri: 1742856060,
		iftar: 1742904720,
	},
	{
		day: 25,
		date: 1742925600,
		seheri: 1742942400,
		iftar: 1742991120,
	},
	{
		day: 26,
		date: 1743012000,
		seheri: 1743028740,
		iftar: 1743077580,
	},
	{
		day: 27,
		date: 1743098400,
		seheri: 1743115080,
		iftar: 1743163980,
	},
	{
		day: 28,
		date: 1743184800,
		seheri: 1743201360,
		iftar: 1743250440,
	},
	{
		day: 29,
		date: 1743271200,
		seheri: 1743287700,
		iftar: 1743336840,
	},
	{
		day: 30,
		date: 1743357600,
		seheri: 1743374040,
		iftar: 1743423300,
	},
];

const currentTime = parseInt(Date.now() / 1000);
if (isDebugging) console.log(`current time: ${currentTime}`);

/// consts
const todayDateSpan = document.getElementById("todayDate");
const ramadanDateSpan = document.getElementById("ramadanDate");
const iftarOrSeheriSpan = document.getElementById("iftarOrSeheri");
const locationText = document.getElementById("locationText");
const staticTime = document.getElementById("staticTime");

todayDateSpan.innerHTML = `${timeConverterDateOnly(currentTime)}`;

//location first setup
let prefLocation = localStorage.getItem("userLocation");
if (isDebugging)
	console.log(`prefLocation from localStorage: ${prefLocation}`);
if (prefLocation === null) {
	prefLocation = "dhk"; //default location if user hasn't set any or interacted with location
	localStorage.setItem("userLocation", "dhk");
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
	if (isDebugging) console.log(typeof currentRamadanDate);
}

let currentTimer;
let isIftar;

if (currentRamadanDate < 1) {
	// not ramadan yet, show countdown for day1 seheri
	if (isDebugging)
		console.log("no ramandan yet, show day1 seheri timer");
	isIftar = false;
	startCountdown(
		getTimeWithLocation(ramadan[0].seheri, prefLocation, isIftar)
	);
	currentTimer = ramadan[0].seheri;
	ramadanDateSpan.innerHTML = "~ramadan is not here yet~";
	iftarOrSeheriSpan.innerHTML = "first seheri";
	staticTime.innerHTML = formatAMPM(
		getTimeWithLocation(ramadan[0].seheri, prefLocation, isIftar)
	);
} else {
	//ramadan started, show normal

	//finding todays' radaman object, and tomorrows ramadan object, incase todays iftar time passed
	// and we need to show tomorrows seheri time
	const currentRamadanObj = ramadan.find(
		(item) => item.day === currentRamadanDate
	);
	const nextRamadanObj = ramadan.find(
		(item) => item.day === currentRamadanDate + 1
	);

	if (isDebugging) console.log(currentRamadanObj);

	if (
		getTimeWithLocation(
			currentRamadanObj.seheri,
			prefLocation,
			false
		) > currentTime
	) {
		// Seheri Time
		isIftar = false;
		startCountdown(
			getTimeWithLocation(
				currentRamadanObj.seheri,
				prefLocation,
				isIftar
			)
		);
		currentTimer = currentRamadanObj.seheri;
		//ramadanDateSpan.innerHTML = currentRamadanDateFormat(toString(currentRamadanObj.day));
		ramadanDateSpan.innerHTML = currentRamadanDateFormat(
			currentRamadanObj.day.toString()
		);
		iftarOrSeheriSpan.innerHTML = `today's seheri`;
		staticTime.innerHTML = formatAMPM(
			getTimeWithLocation(
				currentRamadanObj.seheri,
				prefLocation,
				isIftar
			)
		);
		staticTime.dataset.time = currentRamadanObj.seheri;
		//NOTE: dataset.time will be absolute time, no location pref time added.
		staticTime.dataset.isiftar = false;
		hideProgressBarSection();
	} else if (
		getTimeWithLocation(currentRamadanObj.iftar, prefLocation, true) >
		currentTime
	) {
		// Iftar Time
		if (isDebugging) console.log("iftar time");
		isIftar = true;
		//we also send progressbar stuff:
		// (targetTime=endTime, showProgress=True, seheriTime = startTime)
		startCountdown(
			getTimeWithLocation(
				currentRamadanObj.iftar,
				prefLocation,
				isIftar
			),
			true,
			getTimeWithLocation(
				currentRamadanObj.seheri,
				prefLocation,
				isIftar
			)
		);
		currentTimer = currentRamadanDate.iftar;
		ramadanDateSpan.innerHTML = currentRamadanDateFormat(
			currentRamadanObj.day.toString()
		);
		iftarOrSeheriSpan.innerHTML = `today's iftar`;
		staticTime.innerHTML = formatAMPM(
			getTimeWithLocation(
				currentRamadanObj.iftar,
				prefLocation,
				isIftar
			)
		);
		staticTime.dataset.time = currentRamadanObj.iftar;
		staticTime.dataset.isiftar = true;
		//since iftar, we run progressbar!!
	} else {
		// Next day Seheri time, Iftar done for today
		if (isDebugging) console.log(nextRamadanObj.date);
		isIftar = false;
		startCountdown(
			getTimeWithLocation(
				nextRamadanObj.seheri,
				prefLocation,
				isIftar
			)
		);
		currentTimer = nextRamadanObj.seheri;
		ramadanDateSpan.innerHTML = currentRamadanDateFormat(
			nextRamadanObj.day.toString()
		);
		iftarOrSeheriSpan.innerHTML = `tomorrow's seheri`;
		staticTime.innerHTML = formatAMPM(
			getTimeWithLocation(
				nextRamadanObj.seheri,
				prefLocation,
				isIftar
			)
		);
		staticTime.dataset.time = nextRamadanObj.seheri;
		staticTime.dataset.isiftar = false;
		hideProgressBarSection();
	}
}

//let countdownInterval;

function startCountdown(targetTime, isProgress, startTime) {
	if (isDebugging) console.log("starting new countdown...");

	// Get the HTML paragraph element to display the remaining time
	const countdownElement = document.getElementById("countdownSpan");
	const countdownElementSecond = document.getElementById(
		"countdownSpanSecond"
	);

	// Update the content of the paragraph element with the initial time
	const currentTime = parseInt(Date.now() / 1000);
	const initialTime = Math.floor(targetTime - currentTime);
	const initialHours = Math.floor(initialTime / 3600);
	const initialMinutes = Math.floor((initialTime % 3600) / 60);
	const initialSeconds = initialTime % 60;
	if (initialHours === 0) {
		// dont show hours
		countdownElement.textContent = `${initialMinutes} minutes, ${initialSeconds} seconds`;
		countdownElementSecond.style.display = "none";
	} else {
		countdownElement.textContent = `${initialHours} hours, ${initialMinutes} minutes`;
		countdownElementSecond.textContent = `${initialSeconds} seconds`;
	}

	// Update the content of the paragraph element every second until the target time is reached
	const countdownInterval = setInterval(() => {
		let currentTimeNow = parseInt(Date.now() / 1000);
		const remainingTime = Math.floor(targetTime - currentTimeNow);
		const remainingHours = Math.floor(remainingTime / 3600);
		const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
		const remainingSeconds = remainingTime % 60;
		if (remainingHours === 0) {
			// dont show hours
			countdownElement.textContent = `${remainingMinutes} minutes, ${remainingSeconds} seconds`;
			countdownElementSecond.style.display = "none";
		} else {
			countdownElement.textContent = `${remainingHours} hours, ${remainingMinutes} minutes`;
			countdownElementSecond.textContent = `${remainingSeconds} seconds`;
		}

		if (isProgress == true) {
			//show progressbar
			const start = startTime;
			const end = targetTime;
			const now = currentTimeNow;
			console.log(end);

			const progress = ((now - start) / (end - start)) * 100;
			document.querySelector(
				".progress"
			).style.width = `${progress}%`;
			document.querySelector(
				"#progressPercentage"
			).innerHTML = `${progress.toFixed(2)}%`;
		}

		if (remainingTime <= 0) {
			clearInterval(countdownInterval);
			countdownElement.textContent =
				"u looking at? stop/start eating lol";
		}
	}, 1000);
}

function hideProgressBarSection() {
	var progressElement = document.querySelector(".progress-bar");
	var toggleText = document.querySelector(".toggleBar");
	progressElement.style.display = "none";
	toggleText.style.display = "none";
	console.log(`hidden progressbar!`);
}

function timeConverterDateOnly(UNIX_timestamp) {
	let a = new Date(UNIX_timestamp * 1000);
	let months = [
		"Jan",
		"Feb",
		"Mar",
		"April",
		"May",
		"June",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes();
	let sec = a.getSeconds();
	let time = `${date} ${month} ${year}`;
	return time;
}

function formatAMPM(UNIX_timestamp) {
	var date = new Date(UNIX_timestamp * 1000);

	var hours = date.getHours();
	var minutes = date.getMinutes();
	var secends = date.getSeconds();

	var ampm = hours >= 12 ? "pm" : "am";
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	secends = secends < 10 ? "0" + secends : secends;
	var strTime = hours + ":" + minutes + " " + ampm;

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
if (prefLocation === "dhk") {
	index = 0;
} else if (prefLocation === "jhd") {
	index = 1;
} else {
	index = 2;
}

// TODO: Location is changing in localstorage, but countdown not updating in realtime.
function changeLocation() {
	if (isDebugging) console.log(`currentTimer: ${currentTimer}`);
	let staticTimeSpan = document.getElementById("staticTime");
	if (isDebugging)
		console.log(
			`in changeloc, dataset time: ${staticTime.dataset.isiftar}`
		);
	if (isDebugging) console.log("changeLoc() in");
	let locationSpan = document.getElementById("location");
	if (isDebugging) console.log(`locationspan: ${locationSpan}`);
	index = ++index % locations.length;
	if (isDebugging) console.log(`index: ${index}`);
	if (index === 0) {
		//locatin is dhk
		if (isDebugging) console.log("chaning loc to dhk");
		locationSpan.innerHTML = "dhk";
		staticTimeSpan.innerHTML = formatAMPM(
			getTimeWithLocation(
				staticTime.dataset.time,
				"dhk",
				staticTime.dataset.isiftar
			)
		);
		localStorage.setItem("userLocation", "dhk");
		clearInterval(countdownInterval);
		startCountdown(
			getTimeWithLocation(staticTime.dataset.time, "dhk", isIftar)
		);
	} else if (index === 1) {
		//jhenidah
		if (isDebugging) console.log("chaning loc to jhd");
		locationSpan.innerHTML = "jhd";
		staticTimeSpan.innerHTML = formatAMPM(
			getTimeWithLocation(
				staticTime.dataset.time,
				"jhd",
				staticTime.dataset.isiftar
			)
		);
		localStorage.setItem("userLocation", "jhd");
		clearInterval(countdownInterval);
		startCountdown(
			getTimeWithLocation(staticTime.dataset.time, "jhd", isIftar)
		);
	} else {
		// location is naqi
		if (isDebugging) console.log("chaning loc to naqi");
		locationSpan.innerHTML = "naqi";
		staticTimeSpan.innerHTML = formatAMPM(
			getTimeWithLocation(
				staticTime.dataset.time,
				"naqi",
				staticTime.dataset.isiftar
			)
		);
		localStorage.setItem("userLocation", "naqi");
		clearInterval(countdownInterval);
		startCountdown(
			getTimeWithLocation(staticTime.dataset.time, "naqi", isIftar)
		);
	}
}

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
	const progress = ((now - start) / (end - start)) * 100;

	// Update the progress bar width
	document.querySelector(".progress").style.width = `${progress}%`;

	// Update the progress bar width every second
	setInterval(() => {
		const now = Date.now();
		const progress = ((now - start) / (end - start)) * 100;
		document.querySelector(".progress").style.width = `${progress}%`;
	}, 1000);
}

function toggleBar() {
	var progressElement = document.querySelector(".progress-bar");
	if (progressElement.style.display === "none") {
		progressElement.style.display = "block";
	} else {
		progressElement.style.display = "none";
	}
}

//monochrome section
//https://stackoverflow.com/a/68824350/4389146

function onLoadFunction() {
	const prefersMono = localStorage.getItem("prefersMono");
	if (isDebugging)
		console.log(`localstorage prefers mono: ${prefersMono}`);
	if (prefersMono == 1) {
		if (isDebugging) console.log(`prefersmono is TRUE here`); // 0 is false
		document.documentElement.classList.add("mono");
		document
			.querySelector('meta[name="theme-color"]')
			.setAttribute("content", "#000000");
	} else {
		if (isDebugging) console.log(`prefersmono is FALSE here`); // 1 is true
		//document.documentElement.classList.remove("mono");
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			//dark mode using prefers
			if (isDebugging)
				console.log(`on dark mode so setting dark mode theme color`);
			document
				.querySelector('meta[name="theme-color"]')
				.setAttribute("content", "#171717");
		} else {
			if (isDebugging)
				console.log(
					`on light mode so setting light mode theme color`
				);
			document
				.querySelector('meta[name="theme-color"]')
				.setAttribute("content", "#fc4445");
		}
	}
}

function toggleMonochrome() {
	if (isDebugging) console.log(`should try to toggle to monochrome`);
	// if we are already in mono, remove the mono class and let
	// prefer-color-scheme deal with it
	if (document.documentElement.classList.contains("mono")) {
		document.documentElement.classList.remove("mono");
		localStorage.setItem("prefersMono", 0);
		const colorSchemeCode = getCurrentColorSchemeCode();
		metaThemeColorChanger(colorSchemeCode);
		return;
	}

	if (document.documentElement.classList.contains("light")) {
		document.documentElement.classList.remove("light");
		document.documentElement.classList.add("mono");
		metaThemeColorChanger("#000000");
		localStorage.setItem("prefersMono", 1);
	} else if (document.documentElement.classList.contains("dark")) {
		document.documentElement.classList.remove("dark");
		document.documentElement.classList.add("mono");
		metaThemeColorChanger("#000000");
		localStorage.setItem("prefersMono", 1);
	} else {
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			//dark mode using prefers
			if (isDebugging) console.log(`from prefers-color-scheme`);
			document.documentElement.classList.add("mono");
			metaThemeColorChanger("#000000");
			localStorage.setItem("prefersMono", 1);
		} else {
			if (isDebugging) console.log(`from prefers-color-scheme`);
			document.documentElement.classList.add("mono");
			metaThemeColorChanger("#000000");
			localStorage.setItem("prefersMono", 1);
		}
	}
}

function getCurrentColorSchemeCode() {
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		//dark mode using prefers
		if (isDebugging) console.log(`dark mode prefers`);
		return `#171717`;
	} else {
		if (isDebugging) console.log(`light mode prefers`);
		return `#fc4445`;
	}
}

function metaThemeColorChanger(colorScheme) {
	// remove existing meta tag with name="theme-color"
	var metaTags = document.getElementsByTagName("meta");
	for (var i = 0; i < metaTags.length; i++) {
		if (metaTags[i].getAttribute("name") === "theme-color") {
			metaTags[i].parentNode.removeChild(metaTags[i]);
			break;
		}
	}

	// add new meta tag with name="theme-color"
	var metaTag = document.createElement("meta");
	metaTag.setAttribute("name", "theme-color");
	metaTag.setAttribute("content", colorScheme);
	document.getElementsByTagName("head")[0].appendChild(metaTag);
}

const namajArrayOrig = [
	getUnixTimefromHHMM("04:35"),
	getUnixTimefromHHMM("13:30"),
	getUnixTimefromHHMM("17:00"),
	getUnixTimefromHHMM("19:35"),
	getUnixTimefromHHMM("20:15"),
];

const namajArray = [
	getUnixTimefromHHMM("04:35"),
	getUnixTimefromHHMM("13:30"),
	getUnixTimefromHHMM("17:00"),
	getUnixTimefromHHMM("18:35"),
	getUnixTimefromHHMM("20:15"),
];
const waqtMap = ["fajr", "dhuhr", "asr", "magrhib", "isha"];
const namajTimeMap = [
	"04:35 am",
	"1:30 pm",
	"5:00 pm",
	"6:35 pm",
	"8:15 pm",
];

function getUnixTimefromHHMM(time) {
	const timeString = time;
	const [hours, minutes] = timeString.split(":");
	const today = new Date();
	const dateObj = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
		hours,
		minutes,
		0
	);
	const unixTimestamp = Math.floor(dateObj.getTime() / 1000);
	return unixTimestamp;
}

function whichNamajNext(arr) {
	for (let index = 0; index < namajArray.length; index++) {
		console.log(`rnn loop`);
		const element = namajArray[index];
		if (element > currentTime) {
			return index;
		}
	}
}

const namajWaqtText = document.querySelector("#namajWaqt");
const namajWaqtTimeText = document.querySelector("#namajWaqtTime");
const currentWaqt = whichNamajNext(namajArray);
namajWaqtText.innerHTML = waqtMap[currentWaqt];
namajWaqtTimeText.innerHTML = namajTimeMap[currentWaqt];
startNamajCountdown(namajArray[currentWaqt]);

function startNamajCountdown(targetTime) {
	if (isDebugging) console.log("starting new countdown...");

	// Get the HTML paragraph element to display the remaining time
	const countdownElement = document.getElementById("namajCountdown");

	// Update the content of the paragraph element with the initial time
	const currentTime = parseInt(Date.now() / 1000);
	const initialTime = Math.floor(targetTime - currentTime);
	const initialHours = Math.floor(initialTime / 3600);
	const initialMinutes = Math.floor((initialTime % 3600) / 60);
	const initialSeconds = initialTime % 60;
	countdownElement.textContent = `${initialHours}h:${initialMinutes}m`;

	// Update the content of the paragraph element every second until the target time is reached
	const NamajCountdownInterval = setInterval(() => {
		let currentTimeNow = parseInt(Date.now() / 1000);
		const remainingTime = Math.floor(targetTime - currentTimeNow);
		const remainingHours = Math.floor(remainingTime / 3600);
		const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
		countdownElement.textContent = `${remainingHours}h:${remainingMinutes}m`;

		if (remainingTime <= 0) {
			clearInterval(NamajCountdownInterval);
			countdownElement.textContent = "time to namaj";
		}
	}, 1000);
}
