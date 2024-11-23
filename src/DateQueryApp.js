import React, { useState } from "react";
import Papa from "papaparse";
import dsData from "./ds.csv";
import TicTacToe from "./TicTacToe";

const buildTimestamp = "Build Version: " + new Date().toLocaleString();

const DateQueryApp = () => {
  const [date, setDate] = useState({
    year: "2024",
    month: "January",
    day: "1",
  });
  const [result, setResult] = useState("ready to go");

  const handleInputChange = (event, dateType) => {
    const value = event.target.value;
    setDate({ ...date, [dateType]: value });
  };

  const handleSubmit = () => {
    Papa.parse(dsData, {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        console.log("Parsed Data:", data); // Log the parsed data to verify it's correct

        const monthMap = {
          January: "01",
          February: "02",
          March: "03",
          April: "04",
          May: "05",
          June: "06",
          July: "07",
          August: "08",
          September: "09",
          October: "10",
          November: "11",
          December: "12",
        };

        const targetDateString = `${date.year}${monthMap[date.month]}${String(
          date.day
        ).padStart(2, "0")}`;

        // Assuming the csv file has a date column named 'date' in the format 'YYYYMMDD'
        const filteredData = data.filter((item) => {
          if (item.date) {
            const itemDateString = item.date.trim();
            return itemDateString === targetDateString;
          }
          return false;
        });

        console.log("Filtered Data:", filteredData); // Log filtered data to check if the filtering is working
        setResult(filteredData.length > 0 ? filteredData : "No data found");
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
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
      <h2 style={{ textAlign: "center", color: "#333" }}>Date Query App</h2>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h3 style={{ marginBottom: "10px", color: "#555" }}>Select Date</h3>
        <select
          value={date.year}
          onChange={(e) => handleInputChange(e, "year")}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          {Array.from({ length: 2024 - 1970 + 1 }, (_, i) => 1970 + i).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            )
          )}
        </select>
        <select
          value={date.month}
          onChange={(e) => handleInputChange(e, "month")}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={date.day}
          onChange={(e) => handleInputChange(e, "day")}
          style={{ padding: "5px" }}
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>
              {day}
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
        <h3 style={{ color: "#555" }}>Results</h3>
        {typeof result === "string" ? (
          <p style={{ color: "#007bff" }}>{result}</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {result.map((item, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#e9ecef",
                  margin: "5px 0",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {item.value}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <TicTacToe />
      </div>
    </div>
  );
};

export default DateQueryApp;
