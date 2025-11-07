import React, { useState } from 'react';

export function ArrangementSection ({ section, onSectionChange, onPartAdd, onPartRemove }) {
  const [title, setTitle] = useState(section.title);
  const [duration, setDuration] = useState(section.duration);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onSectionChange({ ...section, title: e.target.value });
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    onSectionChange({ ...section, duration: e.target.value });
  };

  return (
    <div className="card m-3">
      <div className="card-header d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          value={title}
          onChange={handleTitleChange}
          style={{ maxWidth: '200px' }}
        />
        <span className="me-2">Duration:</span>
        <input
          type="text"
          className="form-control"
          value={duration}
          onChange={handleDurationChange}
          style={{ width: '100px' }}
        />
      </div>
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center">
          {section.parts.map((part, index) => (
            <div key={index} className="d-flex align-items-center bg-light border rounded p-2 me-2 mb-2">
              <span className="me-2">{part.title}</span>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={() => onPartRemove(section.id, part.id)}
              >
                ×
              </button>
            </div>
          ))}
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => onPartAdd(section.id)}
          >
            + Add Part
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrangementSection;
