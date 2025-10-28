import React, { useState } from 'react';
import { instruments } from '../../data/Instruments'

export function SimplePartEditor ({ part, onSave, onCancel }) {
  const [title, setTitle] = useState(part.title);
  const [type, setType] = useState(part.type);
  const [instrument, setInstrument] = useState(part.instrument);
  const [notes, setNotes] = useState(part.notes.join(' '));
  const [gain, setGain] = useState(part.gain);

  function handleSave() {
    const updatedpart = {
      ...part,
      title,
      type,
      instrument,
      notes: notes.split(' ').filter(note => note.trim() !== ''),
      gain
    };
    onSave(updatedpart);
  };

  function convertToCode(part) {

  }

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Instrument</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
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
              <label className="form-label">Instrument</label>
              <select 
                className="form-select" 
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
              >
                {instruments.map((inst, index) => (
                  <option key={index} value={inst}>{inst}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea 
                className="form-control" 
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="form-text">Enter notes separated by spaces (e.g. C4 E4 G4)</div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Gain: {(gain * 100).toFixed(0)}%</label>
              <input 
                type="range" 
                className="form-range" 
                min="0" 
                max="1" 
                step="0.01"
                value={gain}
                onChange={(e) => setGain(parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary">
              Convert to Code
            </button>
            <button className="btn btn-outline-secondary" onClick={onCancel}>
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