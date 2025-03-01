import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
export function elapsedPercentage(startTime, endTime, currentTime) {
	if (currentTime < startTime) return 0;
	if (currentTime > endTime) return 100;

	let elapsedPct =
		((currentTime - startTime) / (endTime - startTime)) * 100;
	return Math.round(elapsedPct * 100) / 100;
}

export const renderUnixTime = (time) => {
	return new Date(time * 1000).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

export const renderCountdown = (countdown) => {
	const paddedMinutes = String(countdown.minutes).padStart(2, "0");
	const paddedSeconds = String(countdown.seconds).padStart(2, "0");

	if (countdown.hours > 0) {
		return `${countdown.hours} hours ${paddedMinutes} minutes ${paddedSeconds}s`;
	} else if (countdown.minutes > 0) {
		return `${paddedMinutes} minutes ${paddedSeconds} seconds`;
	} else {
		return `${paddedSeconds} seconds`;
	}
};
