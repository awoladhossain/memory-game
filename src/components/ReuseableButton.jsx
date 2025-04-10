import React from "react";

const ReuseableButton = ({ handleClick, children }) => {
  return (
    <button className="btn btn--text" onClick={handleClick}>
      {children}
    </button>
  );
};

export default ReuseableButton;
