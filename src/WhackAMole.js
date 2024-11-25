import React, { useState, useEffect } from "react";

const WhackAMole = () => {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMoles = moles.map(() => Math.random() < 0.3);
      setMoles(newMoles);
    }, 1000);
    return () => clearInterval(interval);
  }, [moles]);

  const handleMoleClick = (index) => {
    if (moles[index]) {
      setScore(score + 1);
      const newMoles = [...moles];
      newMoles[index] = false;
      setMoles(newMoles);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Score: {score}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {moles.map((isMole, index) => (
          <button
            key={index}
            onClick={() => handleMoleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: isMole ? "brown" : "lightgrey",
              borderRadius: "50%",
              cursor: "pointer",
              border: "none",
            }}
          >
            {isMole ? "Mole!" : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WhackAMole;
