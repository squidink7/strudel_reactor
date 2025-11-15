import { useState } from "react";

export function MusicControls({handlePlayStop, handleShowCode, onSave, onLoad, cps, setCps}) {
	const [isPlaying, setIsPlaying] = useState(false);

	// Trigger load from JSON when file selected
	function handleLoad(event) {
		if (event.target.files) {
			onLoad(event.target.files[0]);
  		}
	}

	// Update CPS based on textbox
	function handleSetCps(e) {
		let newCps = e.target.value;
		setCps(newCps);
	}

	return (
		<div className="d-flex justify-content-between align-items-center p-3 bg-light border-top" style={{ height: '10vh' }}>
			<div className="d-flex gap-2">
				<button className="btn btn-outline-primary" onClick={onSave}>
					Save
				</button>
				<label htmlFor="file-load-button" className="btn btn-outline-secondary">Load</label>
				<input className="d-none" type="file" accept=".json,application/json" onChange={handleLoad} id="file-load-button" />
			</div>
			<div className="d-flex align-items-center">
				<button 
					className={`btn rounded-circle ${isPlaying ? 'btn-danger' : 'btn-success'} d-flex align-items-center justify-content-center`}
					style={{ width: '60px', height: '60px', fontSize: '24px' }}
					onClick={() => {setIsPlaying(!isPlaying); handlePlayStop(!isPlaying)}}
				>
					{isPlaying ? '■' : '▶'}
				</button>
				<button
					className="btn btn-outline-secondary ms-3"
					onClick={handleShowCode}
				>
					Show Code
				</button>
			</div>
			<div>
				<label>CPS</label>
				<input
					type="text"
					className="form-control"
					value={cps}
					onChange={handleSetCps}
					style={{ maxWidth: '200px' }}
				/>
			</div>
		</div>
	)
}