import React, { useState, useCallback, useRef } from "react";
import { useStore } from "./context/store";
import { ACTIONS } from "./context/actions";
import { neighbors } from "./helpers/neighbors";
import { newGrid, randomGrid } from "./helpers/grids";
import {
  Container,
  BoardContainer,
  TextContainer,
  ControlButton,
  Cell,
} from "./styles/container";
import produce from "immer";
import RubberSlider from "@shwilliam/react-rubber-slider";
import "@shwilliam/react-rubber-slider/dist/styles.css";

import "./App.css";

const App = () => {
  const state = useStore();
  const { size, speed, running, generations } = state.state;
  const { dispatch } = state;
  const [grid, setGrid] = useState(() => {
    return newGrid();
  });
  const [value, setValue] = useState(0.6);
  const numRows = 20;
  const numCols = 20;

  // setting the width for responsive design
  const width = Math.round((window.innerWidth * 0.36) / size);

  // retrieving actions for context
  const { RUNNING, STOP_RUNNING, NEXT_GEN, RANDOM_BOARD, CLEAR } = ACTIONS;

  const valueRef = useRef(value);
  valueRef.current = value;

  console.log(valueRef.current);
  const runningRef = useRef(running);
  runningRef.current = running;

  const updateTime = speed / value;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((grid) => {
      return produce(grid, (draft) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighborCount = 0;
            neighbors.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;

              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighborCount += grid[newI][newJ];
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
    dispatch({ type: NEXT_GEN });
    setTimeout(runSimulation, updateTime);
  }, [grid, updateTime]);

  return (
    <>
      <BoardContainer>
        <h2>Conway's Game of Life</h2>
        <p>Generation: {generations}</p>
      </BoardContainer>
      <Container>
        <BoardContainer>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numCols}, 20px)`,
            }}
          >
            {grid.map((rows, i) =>
              rows.map((col, j) => (
                <Cell
                  key={`${i}:${j}`}
                  onClick={
                    runningRef.current === false
                      ? () => {
                          const clickedGrid = produce(grid, (draft) => {
                            draft[i][j] = grid[i][j] ? 0 : 1;
                          });
                          setGrid(clickedGrid);
                        }
                      : undefined
                  }
                  // dimensions={size}
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: grid[i][j] ? "#cccccc" : "white",
                    border: "solid 1px #efefef",
                  }}
                />
              ))
            )}
          </div>
        </BoardContainer>

        <Container>
          <TextContainer>
            <p>
              The "Game of Life" was developed by British mathematician John
              Conway
            </p>
          </TextContainer>
        </Container>
      </Container>

      <Container>
        <ControlButton
          onClick={() => {
            dispatch({ type: RUNNING });
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </ControlButton>
        <ControlButton
          onClick={() => {
            setGrid(newGrid());
            dispatch({ type: CLEAR });
            dispatch({ type: STOP_RUNNING });
          }}
        >
          Clear
        </ControlButton>
        <ControlButton
          onClick={() => {
            setGrid(randomGrid());
            dispatch({ type: RANDOM_BOARD });
          }}
        >
          Random
        </ControlButton>
      </Container>
      <Container>
        <RubberSlider
          width={250}
          value={value}
          onChange={setValue}
          min={1}
          max={20}
          default={10}
        />
        {/* This should be increasing the amount that we divide the speed value with. 
        We start at 2000 (every two seconds) and then divide that by the amount that we're returning
        from the rubber slider. */}
      </Container>
    </>
  );
};

export default App;
