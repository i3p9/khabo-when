"use client";
import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
export function FluidCard({ nextMeal, time, countdown, percentage }) {
	return (
		<Card className='w-full max-w-md relative overflow-hidden rounded-xl'>
			{/* Fluid animation container with multiple layers */}
			<div className='absolute inset-0 bg-amber-500'>
				{/* Base fluid layer */}
				<div
					className='absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-[3000ms] ease-in-out'
					style={{
						height: `${percentage}%`,
						filter: "url(#wavy)",
						opacity: 0.9,
					}}
				/>

				{/* Secondary fluid layer */}
				<div
					className='absolute bottom-0 left-0 right-0 bg-blue-400 transition-all duration-[3500ms] ease-in-out'
					style={{
						height: `${percentage - 1}%`,
						filter: "url(#wavy2)",
						opacity: 0.7,
					}}
				/>

				{/* Highlight layer */}
				<div
					className='absolute bottom-0 left-0 right-0 bg-blue-300 transition-all duration-[3200ms] ease-in-out'
					style={{
						height: `${percentage - 2}%`,
						filter: "url(#wavy3)",
						opacity: 0.3,
					}}
				/>
			</div>

			{/* Card content */}
			<CardContent className='relative z-10 p-6 bg-transparent text-indigo-950'>
				<div className='flex flex-col h-30'>
					<div className='text-lg font-medium mb-1'>Next Meal</div>
					<div className='text-5xl font-bold mb-auto'>{nextMeal}</div>
					<div className='flex justify-between items-center'>
						<div className='text-2xl font-bold'>{time}</div>
						<div className='flex items-center gap-1'>
							<Star className='h-5 w-5 fill-current' />
							<span>{countdown}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

// SVG Filters component
export function FluidCardFilters() {
	return (
		<svg width='0' height='0' className='absolute'>
			<defs>
				<filter id='wavy'>
					<feTurbulence
						type='fractalNoise'
						baseFrequency='0.005 0.03'
						numOctaves='2'
						seed='1'
						result='turbulence'
					>
						<animate
							attributeName='baseFrequency'
							from='0.005 0.03'
							to='0.006 0.04'
							dur='30s'
							repeatCount='indefinite'
						/>
					</feTurbulence>
					<feDisplacementMap
						in='SourceGraphic'
						in2='turbulence'
						scale='12'
						xChannelSelector='R'
						yChannelSelector='G'
					/>
				</filter>

				<filter id='wavy2'>
					<feTurbulence
						type='fractalNoise'
						baseFrequency='0.006 0.04'
						numOctaves='2'
						seed='2'
						result='turbulence'
					>
						<animate
							attributeName='baseFrequency'
							from='0.006 0.04'
							to='0.005 0.03'
							dur='25s'
							repeatCount='indefinite'
						/>
					</feTurbulence>
					<feDisplacementMap
						in='SourceGraphic'
						in2='turbulence'
						scale='10'
						xChannelSelector='R'
						yChannelSelector='G'
					/>
				</filter>

				<filter id='wavy3'>
					<feTurbulence
						type='fractalNoise'
						baseFrequency='0.007 0.02'
						numOctaves='1'
						seed='3'
						result='turbulence'
					>
						<animate
							attributeName='baseFrequency'
							from='0.007 0.02'
							to='0.006 0.03'
							dur='35s'
							repeatCount='indefinite'
						/>
					</feTurbulence>
					<feDisplacementMap
						in='SourceGraphic'
						in2='turbulence'
						scale='8'
						xChannelSelector='R'
						yChannelSelector='G'
					/>
				</filter>
			</defs>
		</svg>
	);
}
