import { Dot } from "lucide-react";
import { Star } from "lucide-react";
const NextMealCard = ({
	nextMeal,
	time,
	countdown,
	darkMode = true,
}) => {
	return (
		<div className='bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-4 mb-6 transition-all duration-500 transform hover:scale-[1.01]'>
			<p className='text-indigo-950 opacity-80 text-sm font-medium'>
				Next Meal
			</p>
			<div className='flex justify-between items-center'>
				<h2 className='text-indigo-950 text-3xl font-bold mb-2'>
					{nextMeal}
				</h2>
				<h2 className='text-indigo-950 text-2xl font-bold mb-2'>
					{time}
				</h2>
			</div>

			<div className='flex items-center justify-center'>
				{/* <p className='text-indigo-950 text-xl font-semibold'>
					{time}
				</p> */}
				<div className='flex items-center'>
					<span className='relative flex size-2 mr-3'>
						<span className='absolute inline-flex h-full w-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-indigo-600 opacity-80'></span>
						<span className='relative inline-flex size-2 rounded-full bg-indigo-950'></span>
					</span>

					<p className='text-indigo-950 text-sm font-base font-mono'>
						in {countdown}
					</p>
				</div>
			</div>
		</div>
	);
};

export default NextMealCard;
