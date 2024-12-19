import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import dsData from "./ds.csv";
import TicTacToe from "./TicTacToe";

const buildTimestamp =
  process.env.REACT_APP_BUILD_TIMESTAMP || "Build Version: Unknown";

const DateQueryApp = () => {
  const [dates, setDates] = useState({ date1: "", date2: "" });
  const [result, setResult] = useState({ data: [] });
  const [date1Options, setDate1Options] = useState([]);
  const [date2Options, setDate2Options] = useState([]);
  const [showGame, setShowGame] = useState({ tictactoe: false });

  useEffect(() => {
    // Parse CSV on initial load to populate dropdown options
    Papa.parse(dsData, {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        const uniqueDate1 = Array.from(new Set(data.map((item) => item.date1)));
        const uniqueDate2 = Array.from(new Set(data.map((item) => item.date2)));
        setDate1Options(uniqueDate1);
        setDate2Options(uniqueDate2);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }, []);

  const handleInputChange = (event, dateType) => {
    const value = event.target.value;
    setDates({ ...dates, [dateType]: value });
  };

  const handleSubmit = () => {
    if (!dates.date1 || !dates.date2) {
      setResult({ data: "Please select both dates before submitting." });
      return;
    }

    Papa.parse(dsData, {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        console.log("Parsed Data:", data); // Log the parsed data to verify it's correct

        // Assuming the csv file has columns named 'date1' and 'date2'
        const filteredData = data.filter((item) => {
          return item.date1 === dates.date1 && item.date2 === dates.date2;
        });

        console.log("Filtered Data:", filteredData); // Log filtered data to check if the filtering is working
        setResult({
          data: filteredData.length > 0 ? filteredData : "No Match",
        });
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  const toggleGame = () => {
    setShowGame((prevState) => ({ tictactoe: !prevState.tictactoe }));
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "12px",
          color: "#666",
        }}
      >
        {buildTimestamp}
      </div>
      <h2 style={{ textAlign: "center", color: "#333" }}>Data Match</h2>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <label style={{ marginRight: "10px", color: "#555" }}>Person 1:</label>
        <select
          value={dates.date1}
          onChange={(e) => setDates({ ...dates, date1: e.target.value })}
          style={{ padding: "5px" }}
        >
          <option value=''>Select Date 1</option>
          {date1Options.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <label style={{ marginRight: "10px", color: "#555" }}>Person 2:</label>
        <select
          value={dates.date2}
          onChange={(e) => setDates({ ...dates, date2: e.target.value })}
          style={{ padding: "5px" }}
        >
          <option value=''>Select Date 2</option>
          {date2Options.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3 style={{ color: "#007bff", fontSize: "20px", fontWeight: "bold" }}>
          Match Results
        </h3>
        {typeof result.data === "string" && (
          <p style={{ color: "#ff6347", fontSize: "18px", fontWeight: "bold" }}>
            {result.data}
          </p>
        )}
        {Array.isArray(result.data) && result.data.length > 0 && (
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              textAlign: "left",
              margin: "20px 0",
            }}
          >
            {result.data.map((item, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#f0f8ff",
                  margin: "10px 0",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div>
                  <strong>Value 1:</strong> {item.value1}
                </div>
                <div>
                  <strong>Value 2:</strong> {item.value2}
                </div>
                <div>
                  <strong>Value Z:</strong> {item.ValueZ}
                </div>
                <div>
                  <strong>Relationship:</strong> {item.Relationship}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        {!showGame.tictactoe && (
          <button
            onClick={toggleGame}
            style={{
              marginBottom: "20px",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Play Tic-Tac-Toe
          </button>
        )}
        {showGame.tictactoe && (
          <>
            <TicTacToe />
          </>
        )}
      </div>
    </div>
  );
};

export default DateQueryApp;
