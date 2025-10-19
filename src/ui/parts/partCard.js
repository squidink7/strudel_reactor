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
      PART PREVIEW
    </div>
  )
}