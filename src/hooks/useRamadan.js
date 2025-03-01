import { useState, useEffect } from "react";
import defaultRamadanData from "../lib/data";
import { elapsedPercentage } from "../lib/utils";

const useRamadan = (
	isDebugging = false,
	customData = null,
	location = "Dhaka"
) => {
	const ramadan = customData || defaultRamadanData;

	const [dataDisplay, setDataDisplay] = useState({
		todaysDate: null,
		ramadanDate: null, //will be like Not Ramadan Yet or 1st / 2nd / 3ed day of Ramadan,
		nextMeal: null, //will be either Seheri or Iftar
		nextMealTime: null, //will be the time of the next meal,
		todaysSeheri: null,
		todaysIftar: null,
		location: location, // Use the location parameter
		iftarPercentage: 0, //will be the percentage of the iftar time
	});

	const [countdown, setCountdown] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const adjustTimeForLocation = (time) => {
		if (!time) return null;
		return location === "Jhenaidah" ? time + 300 : time;
	};

	// Define updateRamadanData outside of useEffect so it can be referenced elsewhere
	const updateRamadanData = () => {
		const currentTime = Math.floor(Date.now() / 1000);
		const todaysDate = new Date();

		// Find which Ramadan day it is
		const whichDay = ramadan.filter((day) => {
			return day.date < currentTime;
		});

		let currentRamadanDate = 0;
		let todaysRamadanObj = null;
		let tomorrowsRamadanObj = null;
		let nextMeal = null;
		let nextMealTime = null;
		let todaysSeheri = null;
		let todaysIftar = null;
		let iftarPercentage = 0;

		if (whichDay.length < 1) {
			if (isDebugging) console.log("Ramadan not yet");
			currentRamadanDate = 0;

			// If Ramadan hasn't started, show the first day's seheri as next meal
			nextMeal = "Seheri";
			nextMealTime = adjustTimeForLocation(ramadan[0].seheri);
			todaysSeheri = adjustTimeForLocation(ramadan[0].seheri);
			todaysIftar = adjustTimeForLocation(ramadan[0].iftar);
		} else {
			currentRamadanDate = whichDay[whichDay.length - 1].day;
			if (isDebugging) {
				console.log(currentRamadanDate);
				console.log(typeof currentRamadanDate);
			}

			// Find today's and tomorrow's Ramadan objects
			todaysRamadanObj = ramadan.find(
				(day) => day.day === currentRamadanDate
			);
			tomorrowsRamadanObj = ramadan.find(
				(day) => day.day === currentRamadanDate + 1
			);

			// Set today's seheri and iftar times with location adjustment
			todaysSeheri = adjustTimeForLocation(todaysRamadanObj.seheri);
			todaysIftar = adjustTimeForLocation(todaysRamadanObj.iftar);

			// Determine next meal
			if (
				adjustTimeForLocation(todaysRamadanObj.seheri) > currentTime
			) {
				// It's before today's seheri
				nextMeal = "Seheri";
				nextMealTime = adjustTimeForLocation(todaysRamadanObj.seheri);
			} else if (
				adjustTimeForLocation(todaysRamadanObj.iftar) > currentTime
			) {
				// It's after seheri but before iftar
				nextMeal = "Iftar";
				nextMealTime = adjustTimeForLocation(todaysRamadanObj.iftar);
			} else if (tomorrowsRamadanObj) {
				// Today's iftar has passed, show tomorrow's seheri
				nextMeal = "Seheri";
				nextMealTime = adjustTimeForLocation(
					tomorrowsRamadanObj.seheri
				);
			} else {
				// Last day of Ramadan and iftar has passed
				nextMeal = "Eid Mubarak!";
				nextMealTime = null;
			}
		}

		if (nextMeal === "Iftar") {
			const startTime = todaysSeheri;
			const endTime = todaysIftar;
			iftarPercentage = elapsedPercentage(
				startTime,
				endTime,
				currentTime
			);
		} else {
			iftarPercentage = 0;
		}

		setDataDisplay({
			todaysDate,
			ramadanDate: currentRamadanDate,
			nextMeal,
			nextMealTime,
			todaysSeheri,
			todaysIftar,
			location, // Use the location parameter
			iftarPercentage,
		});
	};

	useEffect(() => {
		// Initial update
		updateRamadanData();

		// Set up interval to update every minute
		const intervalId = setInterval(updateRamadanData, 60000);

		// Clean up interval on component unmount
		return () => clearInterval(intervalId);
	}, [isDebugging, location]); // Add location as a dependency

	// Add a new useEffect for the countdown timer
	useEffect(() => {
		const updateCountdown = () => {
			if (!dataDisplay.nextMealTime) return;

			const now = Math.floor(Date.now() / 1000);
			const timeRemaining = dataDisplay.nextMealTime - now;

			if (timeRemaining <= 0) {
				// Time has passed, trigger a refresh of the Ramadan data
				updateRamadanData();
				return;
			}

			// Calculate hours, minutes, seconds without days
			const hours = Math.floor(timeRemaining / 3600);
			const minutes = Math.floor((timeRemaining % 3600) / 60);
			const seconds = Math.floor(timeRemaining % 60);

			setCountdown({ hours, minutes, seconds });
		};

		// Run immediately
		updateCountdown();

		// Update every second
		const countdownInterval = setInterval(updateCountdown, 1000);

		// Clean up
		return () => clearInterval(countdownInterval);
	}, [dataDisplay.nextMealTime]);

	// Return both dataDisplay and countdown
	return { dataDisplay, countdown };
};

export default useRamadan;
