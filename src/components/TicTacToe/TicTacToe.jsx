import React, { useState, useRef } from 'react';
import './tictactoe.css';
import circle from '../Assests/circle.png';
import cross from '../Assests/cross.png';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const handleClick = (index) => {
    if (lock || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "X" : "O";
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (newBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] !== "" &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        declareWinner(newBoard[a]);
        return;
      }
    }
  };

  const declareWinner = (winner) => {
    setLock(true);
    if (titleRef.current) {
      titleRef.current.innerHTML = `Congratulations : <img src=${
        winner === "X" ? cross : circle
      } alt="${winner}" /> Wins`;
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCount(0);
    setLock(false);
    if (titleRef.current) {
      titleRef.current.innerHTML = `Tic_Tac_Toe Game in <span>React</span>`;
    }
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic_Tac_Toe Game in <span>React</span>
      </h1>

      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className={`row${row + 1}`}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="boxes"
                  onClick={() => handleClick(index)}
                >
                  {board[index] === "X" && <img src={cross} alt="X" />}
                  {board[index] === "O" && <img src={circle} alt="O" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
