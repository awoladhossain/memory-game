import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

const App = () => {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  console.log(matchedCards);
  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

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
      const dataSlice = await getDataSlice(result);
      const emojisArray = await getEmojisArray(dataSlice);
      setEmojisData(emojisArray);
      setIsGameOn(true);
    } catch (error) {
      console.log("you got an error: ", error);
    }
  }
  const getDataSlice = async (data) => {
    const randomIndices = getRandomIndices(data);
    const dataSlice = randomIndices.map((item) => data[item]);
    //  const dataSlice = randomIndices.reduce((array, index) => {
    //    array.push(data[index]);
    //    return array;
    //  }, []);
    return dataSlice;
  };
  const getRandomIndices = (data) => {
    let randomIndicesArray = [];
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNumber)) {
        randomIndicesArray.push(randomNumber);
      } else {
        i--;
      }
    }
    return randomIndicesArray;
  };

  const getEmojisArray = async (data) => {
    const pairedEmojisArray = [...data, ...data];
    // * Fisher-Yates algorithm
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }
    return pairedEmojisArray;
  };

  function turnCard(name, index) {
    const selectedCardEntry = selectedCards.find(
      (emoji) => emoji.index === index
    );

    if (!selectedCardEntry && selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (!selectedCardEntry && selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
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
