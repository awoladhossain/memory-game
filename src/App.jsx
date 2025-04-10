import React, { useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

const App = () => {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  console.log(emojisData);
  async function startGame(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the API");
      }
      const result = await response.json();
      // console.log(result);
      const dataSample = result.slice(0, 5);
      // console.log(dataSample)
      setEmojisData(dataSample);

      setIsGameOn(true);
    } catch (error) {
      console.log("you got an error: ", error);
    }
  }

  function turnCard() {
    console.log("Memory card clicked");
  }
  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard data={emojisData} handleClick={turnCard} />}
    </main>
  );
};

export default App;
