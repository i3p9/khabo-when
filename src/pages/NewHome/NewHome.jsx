import { Moon, Sun, MapPin } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import useRamadan from "../../hooks/useRamadan";
import React, { useState, useEffect } from "react";
import { renderUnixTime, renderCountdown } from "../../lib/utils";
import NextMealCard from "../../components/NextMealCard";
import { RefreshCcw } from "lucide-react";

const RenderTodaysDate = ({ currentTime }) => {
	const dateObj = new Date(currentTime);

	const formattedDate = dateObj.toLocaleDateString("en-US", {
		weekday: "long",
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	const formattedTimeHour = dateObj
		.toLocaleTimeString("en-US", {
			hour: "2-digit",
			hour12: true,
		})
		.replace(/AM|PM/, "");

	const timeString = dateObj.toLocaleTimeString("en-US", {
		minute: "2-digit",
		hour12: true,
	});

	const minutes = timeString.substring(0, 2);
	const ampm = timeString.includes("AM") ? "AM" : "PM";

	return (
		<React.Fragment>
			{formattedDate} / {formattedTimeHour.trim()}
			<span className='animate-pulse'>:</span>
			{minutes} {ampm}
		</React.Fragment>
	);
};

const renderRamadanDate = (date) => {
	if (date === 0) {
		return "Not Ramadan Yet";
	} else if (date === 1) {
		return "1st Day of Ramadan";
	} else if (date === 2) {
		return "2nd Day of Ramadan";
	} else if (date === 3) {
		return "3rd Day of Ramadan";
	} else {
		return `${date}th Day of Ramadan`;
	}
};

export default function NewHome() {
	const [location, setLocation] = useState(() => {
		return localStorage.getItem("location") || "Dhaka";
	});
	const { dataDisplay, countdown } = useRamadan(true, null, location);
	const [iftarPercentage, setIftarPercentage] = useState(0);
	const [isSpinning, setIsSpinning] = useState(false);
	const [currentTime, setCurrentTime] = useState(new Date());
	const [darkMode, setDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme ? savedTheme === "dark" : true;
	});
	const [isThemeChanging, setIsThemeChanging] = useState(false);

	const toggleLocationWithAnimation = () => {
		setIsSpinning(true);
		toggleLocation();
		setTimeout(() => setIsSpinning(false), 500);
	};

	const toggleLocation = () => {
		const newLocation = location === "Dhaka" ? "Jhenaidah" : "Dhaka";
		setLocation(newLocation);
		localStorage.setItem("location", newLocation);
	};

	const toggleTheme = () => {
		setIsThemeChanging(true);
		setTimeout(() => {
			const newTheme = !darkMode;
			setDarkMode(newTheme);
			localStorage.setItem("theme", newTheme ? "dark" : "light");
			setTimeout(() => setIsThemeChanging(false), 300);
		}, 150);
	};

	useEffect(() => {
		const updatePercentage = () => {
			setCurrentTime(new Date());
			if (
				dataDisplay.nextMeal === "Iftar" &&
				dataDisplay.nextMealTime
			) {
				const now = Math.floor(Date.now() / 1000);
				const totalDuration =
					dataDisplay.nextMealTime - dataDisplay.todaysSeheri;
				const elapsed = now - dataDisplay.todaysSeheri;
				const percentage = Math.min(
					100,
					Math.max(0, (elapsed / totalDuration) * 100)
				);
				const roundedPercentage = Math.round(percentage * 100) / 100;

				setIftarPercentage(roundedPercentage);
			}
		};

		updatePercentage();

		const intervalId = setInterval(updatePercentage, 1000);

		return () => clearInterval(intervalId);
	}, [
		dataDisplay.nextMeal,
		dataDisplay.nextMealTime,
		dataDisplay.todaysSeheri,
	]);

	// Light mode and dark mode color schemes
	const bgGradient = darkMode
		? "bg-gradient-to-b from-indigo-900 to-indigo-950"
		: "bg-gradient-to-b from-blue-100 to-indigo-100";

	const cardBg = darkMode
		? { backgroundColor: "rgba(255, 255, 255, 0.1)" }
		: { backgroundColor: "rgba(255, 255, 255, 0.8)" };

	const cardClass = darkMode
		? "bg-opacity-10 backdrop-blur-md border-none shadow-lg"
		: "bg-opacity-80 backdrop-blur-md border-none shadow-lg";

	const titleColor = darkMode ? "text-amber-400" : "text-amber-600";
	const textColor = darkMode ? "text-indigo-200" : "text-indigo-700";
	const headingColor = darkMode ? "text-white" : "text-indigo-900";
	const subTextColor = darkMode
		? "text-indigo-300"
		: "text-indigo-600";
	const percentageTextColor = darkMode
		? "text-white"
		: "text-indigo-900";

	// Common transition class for text elements
	const textTransition = "transition-colors duration-500";

	return (
		<main
			className={`min-h-screen ${bgGradient} flex items-center justify-center p-4 transition-colors duration-700 overflow-hidden`}
		>
			<div className='w-full max-w-md'>
				<Card
					style={cardBg}
					className={`${cardClass} transition-all duration-500`}
				>
					<CardContent className='p-6'>
						{/* Header */}
						<div className='flex justify-between items-center mb-6'>
							<h1
								className={`text-2xl font-black ${titleColor} ${textTransition} underline underline-offset-2`}
							>
								kokhon khabo?
							</h1>
							<div className='flex space-x-2'>
								<button
									onClick={toggleTheme}
									className='p-1 rounded-full hover:bg-opacity-20 hover:cursor-pointer hover:bg-gray-500 transition-colors relative overflow-hidden'
									title={
										darkMode
											? "Switch to Light Mode"
											: "Switch to Dark Mode"
									}
									disabled={isThemeChanging}
								>
									<div
										className={`absolute inset-0 bg-gray-400 bg-opacity-30 rounded-full scale-0 ${
											isThemeChanging ? "animate-ripple" : ""
										}`}
									></div>
									<div
										className={`transform transition-all duration-500 ${
											isThemeChanging
												? darkMode
													? "scale-75 rotate-180 opacity-0"
													: "scale-75 rotate-180 opacity-0"
												: "scale-100 rotate-0 opacity-100"
										}`}
									>
										{darkMode ? (
											<Sun className='text-amber-400 w-6 h-6' />
										) : (
											<Moon className='text-indigo-600 w-6 h-6' />
										)}
									</div>
								</button>
							</div>
						</div>

						{/* Date and Ramadan Day */}
						<div className='text-center mb-6'>
							<p className={`${textColor} ${textTransition} text-md`}>
								<RenderTodaysDate currentTime={currentTime} />
							</p>
							<p
								className={`${headingColor} ${textTransition} text-lg font-semibold`}
							>
								{renderRamadanDate(dataDisplay?.ramadanDate)}
							</p>
						</div>

						<NextMealCard
							nextMeal={dataDisplay?.nextMeal}
							time={renderUnixTime(dataDisplay?.nextMealTime)}
							countdown={renderCountdown(countdown)}
							darkMode={darkMode}
						/>

						{/* Iftar Percentage */}
						{dataDisplay?.nextMeal === "Iftar" && (
							<div className='my-6'>
								<div
									className={`relative w-full h-2 ${
										darkMode ? "bg-gray-200" : "bg-gray-300"
									} rounded-full mb-6`}
								>
									<div
										className='absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full'
										style={{
											width: `${iftarPercentage}%`,
											transition:
												"width 1s cubic-bezier(0.4, 0, 0.2, 1)",
										}}
									></div>
								</div>
								{/* date icon on top of bar */}
								<div className='relative w-full h-0'>
									<div
										className='absolute -top-11'
										style={{
											left: `${iftarPercentage}%`,
											transform: "translateX(-50%)",
											transition:
												"left 1s cubic-bezier(0.4, 0, 0.2, 1)",
										}}
									>
										<img
											src='/assets/date_icon.png'
											alt='Citrus'
											width={20}
											height={20}
											className='w-7 h-7 text-amber-500'
										/>
									</div>
								</div>

								<div className='flex justify-between mt-2 text-xs'>
									<span className={subTextColor}>Sehri</span>
									<span
										className={`${percentageTextColor} ${textTransition}`}
										style={{
											transition:
												"all 1s cubic-bezier(0.4, 0, 0.2, 1)",
										}}
									>
										{iftarPercentage.toFixed(1)}%
									</span>
									<span className={subTextColor}>Iftar</span>
								</div>
							</div>
						)}

						<div className='grid grid-cols-2 gap-4 mb-6'>
							<div className='text-center'>
								<p
									className={`${subTextColor} ${textTransition} text-sm`}
								>
									Sehri
								</p>
								<p
									className={`${headingColor} ${textTransition} font-semibold`}
								>
									{renderUnixTime(dataDisplay?.todaysSeheri)}
								</p>
							</div>
							<div className='text-center'>
								<p
									className={`${subTextColor} ${textTransition} text-sm`}
								>
									Iftar
								</p>
								<p
									className={`${headingColor} ${textTransition} font-semibold`}
								>
									{renderUnixTime(dataDisplay?.todaysIftar)}
								</p>
							</div>
						</div>

						{/* Location */}
						<div
							className={`flex items-center justify-center ${subTextColor} ${textTransition} mb-4`}
						>
							<MapPin className='w-4 h-4 mr-1 self-center' />
							<span className='text-sm'>{dataDisplay?.location}</span>
							<button
								onClick={toggleLocationWithAnimation}
								className='hover:cursor-pointer p-1 hover:text-amber-500 transition-colors duration-300'
								title={`change location to ${
									location === "Dhaka" ? "Jhenaidah" : "Dhaka"
								}`}
							>
								{" "}
								<RefreshCcw
									style={{
										transform: isSpinning
											? "rotate(360deg)"
											: "rotate(0deg)",
										transition: "transform 0.5s ease-in-out",
									}}
									className='w-4 h-4 ml-3'
								/>
							</button>
						</div>
					</CardContent>
				</Card>

				{/* Decorative Elements */}
				<div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
					<div
						className={`absolute top-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-amber-700 rounded-full mix-blend-multiply filter blur-xl opacity-${
							darkMode ? "20" : "10"
						} animate-blob`}
					></div>
					<div
						className={`absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-${
							darkMode ? "20" : "10"
						} animate-blob animation-delay-2000`}
					></div>
					<div
						className={`absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-pink-700 rounded-full mix-blend-multiply filter blur-xl opacity-${
							darkMode ? "20" : "10"
						} animate-blob animation-delay-4000`}
					></div>
				</div>
			</div>
		</main>
	);
}
