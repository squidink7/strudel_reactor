import React, { useState } from 'react';
import { soundMap } from '@strudel/web';
import { SimplePart, CodePart } from '../../data/Part';

export function SimplePartEditor ({ part, onSave, onClose, onDelete }) {
  const [title, setTitle] = useState(part.title);
  const [type, setType] = useState(part.type);
  const [instrument, setInstrument] = useState(part.instrument);
  const [notes, setNotes] = useState(part.notes.join(' '));
  const [gain, setGain] = useState(part.gain);

  function handleSave() {
    let newPart = part;
    newPart.title = title;
    newPart.instrument = instrument;
    newPart.notes = notes.split(' ').filter(note => note.trim() !== '');
    newPart.gain = gain;
    onSave(newPart);
    onClose();
  }

  function handleDelete() {
    onDelete(part.id);
    onClose();
  }

  function convertToCode() {
    console.log(part);
    Object.setPrototypeOf(part, SimplePart.prototype);
    let codePart = new CodePart(title, part.toCode());
    codePart.id = part.id;
    onSave(codePart);
  }

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Part</h5>
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
              <label className="form-label">Instrument</label>
              <select 
                className="form-select" 
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
              >
                {Object.keys(soundMap.get()).map((inst, index) => (
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
            <button className="btn btn-outline-danger" onClick={handleDelete}>
                Delete
            </button>
            <button className="btn btn-secondary" onClick={convertToCode}>
              Convert to Code
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
