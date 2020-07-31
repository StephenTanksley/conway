import React, { useState, useCallback, useRef } from "react";
import { useStore } from "./context/store";
import { ACTIONS } from "./context/actions";
import { neighbors } from "./helpers/neighbors";
import { newGrid, randomGrid } from "./helpers/grids";
import produce from "immer";
import "./App.css";

const numRows = 20;
const numCols = 20;

const App = () => {
  const state = useStore();
  const { size, speed, running, generations } = state.state;
  const { dispatch } = state;
  const [grid, setGrid] = useState(() => {
    return newGrid();
  });

  const {
    RUNNING,
    STOP_RUNNING,
    NEXT_GEN,
    RANDOM_BOARD,
    UPDATE_BOARD,
    CLEAR,
  } = ACTIONS;

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
  }, [grid]);

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: RUNNING });
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
                const clickedGrid = produce(grid, (draft) => {
                  draft[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(clickedGrid);
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
