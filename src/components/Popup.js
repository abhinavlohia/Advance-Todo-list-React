import React from "react";

const Popup = ({ heading, description, closePopup }) => {
  return (
    <div className="popup">
      <h2 id="popup-heading">{heading}</h2>
      <p id="popup-description">{description}</p>
      <button onClick={closePopup}>Close</button>
    </div>
  );
};

export default Popup;
