import React from 'react';

const Popup = ({ heading, description, onClose }) => {
  return (
    <div className="popup">
      <h2>{heading}</h2>
      <p>{description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Popup;
