import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";

const numRows = 20;
const numCols = 20;

const newGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const randomGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.6 ? 1 : 0)));
  }
  return rows;
};

const App = () => {
  const [size, setSize] = useState(10);
  const [running, setRunning] = useState(false);
  const [grid, setGrid] = useState(() => {
    return newGrid();
  });

  let neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    // simulation logic goes here

    setGrid((current_grid) => {
      return produce(current_grid, (draft) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighborCount = 0;
            neighbors.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;

              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighborCount += current_grid[newI][newJ];
              }
            });

            if (neighborCount < 2 || neighborCount > 3) {
              draft[i][j] = 0;
            } else if (grid[i][j] === 0 && neighborCount === 3) {
              draft[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 1000);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          setGrid(newGrid());
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          setGrid(randomGrid());
        }}
      >
        Random
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}:${j}`}
              onClick={() => {
                const newGrid = produce(grid, (draft) => {
                  draft[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;
