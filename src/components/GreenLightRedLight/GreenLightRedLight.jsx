import { useEffect, useState } from "react";
import styled from "styled-components";

function GreenLightRedLight() {
  const [startGame, setStartGame] = useState(false);
  const [boxcolor, setBoxColor] = useState("red");
  const [gameOver, setGameOver] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setBoxColor((color) => (color === "red" ? "green" : "red"));
    }, Math.floor(Math.random() * 1000 + 1000));
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (startGame && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [startGame, gameOver, timeLeft]);

  const handleStartGame = () => {
    setStartGame(true);
    setGameOver(false);
    setTimeLeft(15);
    setScoreCount(0);

  };
  const handleBoxClick = () => {
    if (boxcolor === "red") {
      setGameOver(true);
    }
    else if (boxcolor === "green") {
      setScoreCount((count) => count + 1);
    } 
  };

  return (
    <WrapperDiv>
      {!startGame && <Button onClick={handleStartGame}>Start Game</Button>}
      {startGame && !gameOver && <ScoreDiv>Time Left: {timeLeft}s </ScoreDiv>}
      <ScoreDiv>Score :{scoreCount} </ScoreDiv>
      {gameOver && (
        <ScoreDiv>
          {scoreCount < 3 ? "Game Over !!!" : "You Win !!!"}{" "}
        </ScoreDiv>
      )}
      {startGame && !gameOver && (
        <Box color={boxcolor} onClick={handleBoxClick}></Box>
      )}
    </WrapperDiv>
  );
}

export default GreenLightRedLight;
const ScoreDiv = styled.div`
  margin-top: 2%;
  font-weight: bold;
  font-size: 18px;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.color};
`;
const WrapperDiv = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;
const Button = styled.button`
  cursor: pointer;
`;
