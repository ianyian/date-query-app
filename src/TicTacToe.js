import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const getBestMove = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        return i;
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);

    if (!calculateWinner(newBoard)) {
      const computerMove = getBestMove(newBoard);
      if (computerMove !== null) {
        newBoard[computerMove] = "O";
        setTimeout(() => {
          setBoard(newBoard);
          setIsXNext(true);
        }, 500);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div style={{ textAlign: "center" }}>
      {!isCollapsed && (
        <>
          <div
            style={{
              marginBottom: "10px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {status}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 100px)",
              gap: "10px",
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
                  cursor: value || winner ? "not-allowed" : "pointer",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "5px",
                }}
                disabled={value || winner}
              >
                {value}
              </button>
            ))}
          </div>
        </>
      )}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={resetGame}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Reset Game
        </button>
        <button
          onClick={toggleCollapse}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
