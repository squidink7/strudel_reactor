import React, { useState } from 'react';

export function PartCard({ instrument }) {
  const [isEnabled, setIsEnabled] = useState(instrument.enabled);
  const [gain, setGain] = useState(instrument.gain || 0.8);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  const handleGainChange = (e) => {
    setGain(parseFloat(e.target.value));
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{instrument.title}</h5>
        <div className='badge' style={{backgroundColor: instrument.type === 'simple' ? '#0eddbe' : '#cd50dd'}}>
          {instrument.type.charAt(0).toUpperCase() + instrument.type.slice(1)}
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="card-subtitle mb-1 text-muted">Instrument</h6>
            <p className="card-text mb-0">{instrument.name}</p>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id={`toggle-${instrument.id}`}
              checked={isEnabled}
              onChange={handleToggle}
            />
            <label className="form-check-label" htmlFor={`toggle-${instrument.id}`}>
              {isEnabled ? 'ON' : 'OFF'}
            </label>
          </div>
        </div>
        
        <div className="mb-3">
          <h6 className="card-subtitle mb-1 text-muted">Notes</h6>
          <div className="d-flex flex-wrap gap-1">
            {instrument.notes.map((note, index) => (
              <span key={index} className="badge bg-light text-dark border">
                {note}
              </span>
            ))}
          </div>
        </div>
        
        {instrument.gain != null && (
          <div className="mt-3">
            <div className="d-flex justify-content-between mb-1">
              <label htmlFor={`gain-${instrument.id}`} className="form-label">
                Gain
              </label>
              <span className="text-muted">{(gain * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              className="form-range"
              id={`gain-${instrument.id}`}
              min="0"
              max="1"
              step="0.01"
              value={gain}
              onChange={handleGainChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}