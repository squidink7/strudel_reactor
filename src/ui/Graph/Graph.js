import { selectAll, select, scaleSequential, scaleLinear, interpolateYlGnBu } from 'd3';
import { getAudioContext } from '@strudel/web';
import { getAnalyzerData } from '@strudel/web';
import { useEffect, useState } from 'react';

// After 4 hours of debugging, I give up getting the webaudio analyser to work.

export function Graph() {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		if (!enabled) return;
		
		// Create audio analyser context
		// let context
		// let analyser

		// context = new AudioContext();
		// analyser = context.createAnalyser()
		// analyser.minDecibels = -105
		// analyser.maxDecibels = -25
		// analyser.smoothingTimeConstant = 0.8
		// // let gain = context.createGain()
		// // const src = context.createMediaElementSource(audio)
		// // src.connect(gain)
		// // gain.connect(analyser)
		// analyser.connect(context.destination)

		// Setup graph
		// analyser.fftSize = 128

		
		let svg = select('svg');

		let w = svg.node().getBoundingClientRect().width
		w = w - 40
		let h = svg.node().getBoundingClientRect().height
		h = h - 25

	//   if (document.getElementById('visualizer-svg')) {
	//     selectAll('svg > *').remove()
	//   } else {
	//     selectAll('svg').remove()
	//     svg = select('body').append('svg')
	//       .attr('width', w)
	//       .attr('height', h)
	//       .attr('id', 'visualizer-svg')
	//   }

		let dataArray = getAnalyzerData("time", "a")

		const colorScale = scaleSequential(interpolateYlGnBu)
		.domain([-1, 1])

		const y = scaleLinear()
		.domain([-1, 1])
		.range([h, 0])

		svg.selectAll('rect')
			.data(dataArray)
			.enter().append('rect')
			.attr('width', ((w / dataArray.length) * 0.8))
			.attr('x', function (d, i) { return (((w / dataArray.length) * i) + ((w / dataArray.length) * 0.1)) })

		function renderFrame () {
			dataArray = getAnalyzerData("time", "a")
			requestAnimationFrame(renderFrame)
			console.log(dataArray)
			
			svg.selectAll('rect')
				.data(dataArray)
				.attr('height', function (d) { return (h - y(d)) })
				.attr('y', function (d) { return y(d) })
				.attr('fill', function (d) { return d === 0 ? 'black' : colorScale(d) })
		}
		renderFrame()
	}, [enabled])

	return (
		<div>
			<svg id="visualizer-svg" className='w-100'></svg>
			<button className='btn btn-outline-primary' onClick={() => setEnabled(true)}>Show Graph</button>
		</div>
	)
}