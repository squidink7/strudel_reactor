import { useState } from "react";

export function CodeDialog({ handleCloseDialog }) {
	return (
		<div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Song Code</h5>
						<button type="button" className="btn-close" onClick={handleCloseDialog}></button>
					</div>
					<div className="modal-body">
						<pre className="bg-light p-3 rounded">
							{`[song code goes here]`}
						</pre>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={handleCloseDialog}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}