import React, { useState } from 'react';

export function PartCard({ part, edit }) {
  const [isEnabled, setIsEnabled] = useState(part.enabled);
  const [gain, setGain] = useState(part.gain || 0.8);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  const handleGainChange = (e) => {
    setGain(parseFloat(e.target.value));
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className='d-flex'>
          <h5 className="card-title mb-0">{part.title}</h5>
          <div className='badge mx-2' style={{backgroundColor: part.type === 'simple' ? '#0eddbe' : '#cd50dd'}}>
            {part.type.charAt(0).toUpperCase() + part.type.slice(1)}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => edit(part.id)}>Edit</button>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="card-subtitle mb-1 text-muted">part</h6>
            <p className="card-text mb-0">{part.name}</p>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id={`toggle-${part.id}`}
              checked={isEnabled}
              onChange={handleToggle}
            />
            <label className="form-check-label" htmlFor={`toggle-${part.id}`}>
              {isEnabled ? 'ON' : 'OFF'}
            </label>
          </div>
        </div>
        
        {
          part.type == 'simple' ? (
            <div>
              <div className="mb-3">
                <h6 className="card-subtitle mb-1 text-muted">Notes</h6>
                <div className="d-flex flex-wrap gap-1">
                  {part.notes.map((note, index) => (
                    <span key={index} className="badge bg-light text-dark border">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-1">
                  <label htmlFor={`gain-${part.id}`} className="form-label">
                    Gain
                  </label>
                  <span className="text-muted">{(gain * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  id={`gain-${part.id}`}
                  min="0"
                  max="1"
                  step="0.01"
                  value={gain}
                  onChange={handleGainChange}
                />
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <h6 className="card-subtitle mb-1 text-muted">Code</h6>
              <pre className="bg-dark text-light p-3 rounded" style={{ fontSize: '0.875rem', overflowX: 'auto' }}>
                {part.code || 'empty part'}
              </pre>
            </div>
          )
        }
      </div>
    </div>
  )
}