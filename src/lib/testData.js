// Scenario 1: 2 hours left for Seheri
// Current time + 2 hours = Seheri time
const twoHoursBeforeSeheriData = [
	{
		day: 1,
		date: 1740760000, // Earlier than current time (1740768266)
		seheri: 1740775466, // Current time + 2 hours (7200 seconds)
		iftar: 1740820000,
	},
	{
		day: 2,
		date: 1740846400,
		seheri: 1740861866,
		iftar: 1740906400,
	},
];

// Scenario 2: 3 hours left for Iftar
// Current time + 3 hours = Iftar time
const threeHoursBeforeIftarData = [
	{
		day: 1,
		date: 1740760000, // Earlier than current time (1740768266)
		seheri: 1740760000, // Earlier than current time (already passed)
		iftar: 1740779066, // Current time + 3 hours (10800 seconds)
	},
	{
		day: 2,
		date: 1740846400,
		seheri: 1740846400,
		iftar: 1740865466,
	},
];

// Scenario 3: 1 hour after Iftar (showing tomorrow's Seheri)
// Current time - 1 hour = Iftar time (already passed)
// Tomorrow's Seheri is the next meal
const oneHourAfterIftarData = [
	{
		day: 1,
		date: 1740760000, // Earlier than current time (1740768266)
		seheri: 1740760000, // Earlier than current time (already passed)
		iftar: 1740764666, // Current time - 1 hour (3600 seconds) (already passed)
	},
	{
		day: 2,
		date: 1740846400,
		seheri: 1740850000, // Tomorrow's Seheri time
		iftar: 1740865466,
	},
];

export {
	twoHoursBeforeSeheriData,
	threeHoursBeforeIftarData,
	oneHourAfterIftarData,
};
