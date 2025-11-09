import { select, scaleSequential, scaleLinear, interpolateYlGnBu } from 'd3';
import { getAnalyzerData } from '@strudel/web';
import { useEffect, useState } from 'react';

export function Graph() {
	let [setup,] = useState(false);
	function setupGraph() {
		// Strudel analyzer not setup yet.
		if (setup) {
			return;
		}

		// Wait until audio analyzer setup
		if (getAnalyzerData("time", "a") == undefined) {
			window.setTimeout(setupGraph, 100);
		} else {
			// Only run once
			setup = true;

			// Setup D3 Graph.
			let svg = select('svg');

			let w = svg.node().getBoundingClientRect().width
			let h = svg.node().getBoundingClientRect().height

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
				
				svg.selectAll('rect')
					.data(dataArray)
					.attr('height', function (d) { return (h - y(d)) })
					.attr('y', function (d) { return y(d) })
					.attr('fill', function (d) { return d === 0 ? 'black' : colorScale(d) })
			}

			renderFrame()	
		}
	}

	
	useEffect(() => {
		setupGraph();
	}, []);

	return (
		<div>
			<svg id="visualizer-svg" className='w-100'></svg>
		</div>
	)
}