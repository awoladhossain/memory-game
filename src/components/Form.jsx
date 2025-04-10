import React from "react";
import ReuseableButton from "./ReuseableButton";

const Form = ({ handleSubmit }) => {
  return (
    <>
      <form className="wrapper">
        <ReuseableButton handleClick={handleSubmit}>Start Game</ReuseableButton>
      </form>
    </>
  );
};

export default Form;
