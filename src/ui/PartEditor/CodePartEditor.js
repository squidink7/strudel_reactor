import React, { useState } from 'react';

export function CodePartEditor ({ part, onSave, onClose, onDelete }) {
  const [title, setTitle] = useState(part.title);
  const [code, setCode] = useState(part.code);

  function handleSave() {
	let newPart = part;
	newPart.title = title;
	newPart.code = code;
	onSave(newPart);
	onClose();
  }

  function handleDelete() {
	onDelete(part.id);
	onClose();
  }

  return (
	<div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
	  <div className="modal-dialog modal-lg">
		<div className="modal-content">
		  <div className="modal-header">
			<h5 className="modal-title">Edit Instrument</h5>
			<button type="button" className="btn-close" onClick={onClose}></button>
		  </div>
		  <div className="modal-body">
			<div className="mb-3">
			  <label className="form-label">Title</label>
			  <input 
				type="text" 
				className="form-control" 
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			  />
			</div>
			
			<div className="mb-3">
			  <label className="form-label">Code</label>
			  <textarea 
				className="form-control font-monospace" 
				rows="10"
				value={code}
				onChange={(e) => setCode(e.target.value)}
				placeholder="Enter your music code here..."
			  />
			  <div className="form-text">Write strudel code above.</div>
			</div>
		  </div>
		  <div className="modal-footer">
			<button className="btn btn-outline-danger" onClick={handleDelete}>
				Delete
			</button>
			<button className="btn btn-outline-secondary" onClick={onClose}>
			  Cancel
			</button>
			<button className="btn btn-primary" onClick={handleSave}>
			  OK
			</button>
		  </div>
		</div>
	  </div>
	</div>
  );
};