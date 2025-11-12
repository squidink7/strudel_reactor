import React, { useState } from 'react';

export function ArrangementSection ({ section, onSectionChange, parts, onDelete }) {
  const [title, setTitle] = useState(section.title);
  const [duration, setDuration] = useState(section.duration);
  const [sectionParts, setSectionParts] = useState(section.parts);

  function handleTitleChange(e) {
    setTitle(e.target.value);
    section.title = e.target.value;
    onSectionChange(section);
  };

  function handleDurationChange(e) {
    setDuration(e.target.value);
    section.duration = e.target.value;
    onSectionChange(section);
  };

  function addPart(partId) {
    if (partId !== "") {
      // Get part by id
      let part;
      
      parts.forEach(p => {
        if (p.id === partId) {
          part = p;
        }
      });

      if (part === null) return;

      // Add part to section
      let newSectionParts = [...sectionParts]; // Create new array to force re-render
      newSectionParts.push(part);
      section.parts = newSectionParts;
      setSectionParts(newSectionParts);
      onSectionChange(section);
    }
  }

  function removePart(partId) {
    if (partId !== "") {
      // Get part by id
      let newParts = [];
      
      sectionParts.forEach(p => {
        if (p.id !== partId) {
          newParts.push(p);
        }
      });

      // Add part to section
      section.parts = newParts;
      setSectionParts(newParts);
      onSectionChange(section);
    }
  }

  function unAddedParts() {
    let result = [];

    parts.forEach(p => {
      if (!sectionParts.includes(p))
        result.push(p);
    });

    return result;
  }

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
          className="form-control me-2"
          value={duration}
          onChange={handleDurationChange}
          style={{ width: '100px' }}
        />
        <select 
          className="form-select me-2" 
          value="Add Part"
          onChange={(e) => addPart(e.target.value)}
        >
          <option key="-1" value="">Add Part</option>
          {
            unAddedParts().map((part, index) => (
              <option key={index} value={part.id}>{part.title}</option>
            ))
          }
        </select>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(section.id)}
        >
          ×
        </button>
      </div>
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center">
          {sectionParts.map((part, index) => (
            <div key={index} className="d-flex align-items-center bg-light border rounded p-2 me-2 mb-2">
              <span className="me-2">{part.title}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removePart(part.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrangementSection;
