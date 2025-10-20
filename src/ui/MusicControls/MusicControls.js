export function MusicControls({playFn, pauseFn, processFn}) {
	return (
		<nav>
			<button id="process" className="btn btn-outline-primary" onClick={processFn}>Preprocess</button>
			<button id="process_play" className="btn btn-outline-primary" onClick={() => {processFn();playFn();}}>Proc & Play</button>
			<br />
			<button id="play" className="btn btn-outline-primary" onClick={playFn}>Play</button>
			<button id="stop" className="btn btn-outline-primary" onClick={pauseFn}>Stop</button>
		</nav>
	)
}