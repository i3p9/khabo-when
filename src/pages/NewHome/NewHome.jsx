import { Moon, Sun, MapPin } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import useRamadan from "../../hooks/useRamadan";
import { useState, useEffect } from "react";
import { renderUnixTime, renderCountdown } from "../../lib/utils";
import NextMealCard from "../../components/NextMealCard";
import { RefreshCcw } from "lucide-react";

const renderTodaysDate = (date) => {
	return new Date(date).toLocaleDateString("en-US", {
		weekday: "long",
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
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
	const [location, setLocation] = useState("Dhaka");
	const { dataDisplay, countdown } = useRamadan(true, null, location);
	const [iftarPercentage, setIftarPercentage] = useState(0);
	const [isSpinning, setIsSpinning] = useState(false);

	const toggleLocationWithAnimation = () => {
		setIsSpinning(true);
		toggleLocation();
		setTimeout(() => setIsSpinning(false), 500);
	};

	const toggleLocation = () => {
		setLocation((prevLocation) =>
			prevLocation === "Dhaka" ? "Jhenaidah" : "Dhaka"
		);
	};

	useEffect(() => {
		const updatePercentage = () => {
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

	return (
		<main className='min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-950 flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<Card
					style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
					className='bg-opacity-10 backdrop-blur-md border-none shadow-lg'
				>
					<CardContent className='p-6'>
						{/* Header */}
						<div className='flex justify-between items-center mb-6'>
							<h1 className='text-2xl font-black text-amber-400 underline underline-offset-2'>
								kokhon khabo?
							</h1>
							<div className='flex space-x-2'>
								<Sun className='text-amber-400 w-6 h-6' />
								<Moon className='text-indigo-200 w-6 h-6' />
							</div>
						</div>

						{/* Date and Ramadan Day */}
						<div className='text-center mb-6'>
							<p className='text-indigo-200 text-md'>
								{renderTodaysDate(dataDisplay?.todaysDate)}
							</p>
							<p className='text-white text-lg font-semibold'>
								{renderRamadanDate(dataDisplay?.ramadanDate)}
							</p>
						</div>
						{/* <FluidCard
							nextMeal={dataDisplay?.nextMeal}
							time={renderUnixTime(dataDisplay?.nextMealTime)}
							countdown={renderCountdown(countdown)}
							percentage={iftarPercentage}
						/> */}

						<NextMealCard
							nextMeal={dataDisplay?.nextMeal}
							time={renderUnixTime(dataDisplay?.nextMealTime)}
							countdown={renderCountdown(countdown)}
						/>

						{/* Iftar Percentage */}
						{dataDisplay?.nextMeal === "Iftar" && (
							<div className='my-6'>
								<div className='relative w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
									<div
										className='absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full'
										style={{
											width: `${iftarPercentage}%`,
											transition:
												"width 1s cubic-bezier(0.4, 0, 0.2, 1)",
										}}
									></div>
								</div>
								<div className='flex justify-between mt-2 text-xs text-indigo-300'>
									<span>Sehri</span>
									<span
										className='text-white'
										style={{
											transition:
												"all 1s cubic-bezier(0.4, 0, 0.2, 1)",
										}}
									>
										{iftarPercentage.toFixed(1)}%
									</span>
									<span>Iftar</span>
								</div>
							</div>
						)}

						<div className='grid grid-cols-2 gap-4 mb-6'>
							<div className='text-center'>
								<p className='text-indigo-300 text-sm'>Sehri</p>
								<p className='text-white font-semibold'>
									{renderUnixTime(dataDisplay?.todaysSeheri)}
								</p>
							</div>
							<div className='text-center'>
								<p className='text-indigo-300 text-sm'>Iftar</p>
								<p className='text-white font-semibold'>
									{renderUnixTime(dataDisplay?.todaysIftar)}
								</p>
							</div>
						</div>

						{/* Location */}
						<div className='flex items-center justify-center text-indigo-300 mb-4'>
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
					<div className='absolute top-0 left-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
					<div className='absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
					<div className='absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
				</div>
			</div>
		</main>
	);
}
