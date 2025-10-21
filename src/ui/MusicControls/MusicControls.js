import { useState } from "react";

export function MusicControls({handlePlayStop, handleShowCode}) {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className="d-flex justify-content-center align-items-center p-3 bg-light border-top">
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
	)
}