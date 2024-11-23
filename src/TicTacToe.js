// good one
import React, { useState, useEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [showGame, setShowGame] = useState(false);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  useEffect(() => {
    if (!isXNext && !calculateWinner(board)) {
      const emptyIndices = board
        .map((value, index) => (value === null ? index : null))
        .filter((val) => val !== null);
      if (emptyIndices.length > 0) {
        const randomIndex =
          emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const newBoard = board.slice();
        newBoard[randomIndex] = "O";
        setBoard(newBoard);
        setIsXNext(true);
      }
    }
  }, [isXNext, board]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const toggleGame = () => {
    setShowGame(!showGame);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={toggleGame}
        style={{
          marginBottom: "20px",
          padding: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {showGame ? "Collapse Game" : "Play Tic-Tac-Toe"}
      </button>
      {showGame && (
        <div>
          <div style={{ marginBottom: "10px" }}>{status}</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 100px)",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            {board.map((value, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                {value}
              </button>
            ))}
          </div>
          <button
            onClick={handleReset}
            style={{
              marginTop: "20px",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
