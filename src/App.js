import React, { useState, useCallback, useRef } from "react";
import { useStore } from "./context/store";
import { ACTIONS } from "./context/actions";
import { neighbors } from "./helpers/neighbors";
import {
  Container,
  BoardContainer,
  ControlButton,
  Cell,
} from "./styles/container";

import { InfoPanel } from "./components/InfoPanel";
import produce from "immer";
import RubberSlider from "@shwilliam/react-rubber-slider";
import "@shwilliam/react-rubber-slider/dist/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const state = useStore();

  const { speed, size, running, generations } = state.state;

  const newGrid = () => {
    const rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(Array.from(Array(size), () => 0));
    }
    return rows;
  };

  const randomGrid = () => {
    const rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(Array.from(Array(size), () => (Math.random() > 0.6 ? 1 : 0)));
    }
    return rows;
  };

  const { dispatch } = state;
  const [grid, setGrid] = useState(() => {
    return newGrid();
  });

  // const [buffer, setBuffer] = useState(() => {
  //   return newGrid();
  // });

  console.log("initial size: ", size);
  const [value, setValue] = useState(0.6);

  // setting the width for responsive design
  const dimensions = Math.round((window.innerWidth * 0.36) / size);

  // retrieving actions for context
  const { RUNNING, STOP_RUNNING, NEXT_GEN, RANDOM_BOARD, CLEAR } = ACTIONS;

  const valueRef = useRef(value);
  valueRef.current = value;

  const runningRef = useRef(running);
  runningRef.current = running;

  const updateTime = speed / value;

  // The buffer needs to run this way - the grid is set. The buffer runs the next step in the grid and saves that value.
  // When the grid needs to refresh its value, it can just pull that value directly from the buffer.
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((grid) => {
      return produce(grid, (draft) => {
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            let neighborCount = 0;
            neighbors.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;

              if (newI >= 0 && newI < size && newJ >= 0 && newJ < size) {
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
  }, [grid, NEXT_GEN, dispatch, updateTime, size]);

  // currently set to run the buffer.
  const runNext = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((grid) => {
      return produce(grid, (draft) => {
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            let neighborCount = 0;
            neighbors.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;

              if (newI >= 0 && newI < size && newJ >= 0 && newJ < size) {
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
  }, [size]);

  return (
    <>
      <BoardContainer>
        <h2>Conway's Game of Life</h2>
        <p>Generation: {generations}</p>
      </BoardContainer>
      <Container>
        <BoardContainer>
          <div
            // dimensions={dimensions}
            // size={size}
            style={{
              display: "grid",
              width: "40vw",
              alignItems: "center",
              // border: "1px solid LightGray",
              gridTemplateColumns: `repeat(${size}, ${dimensions}px)`,
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
                  // dimensions={dimensions}
                  // alive={grid[i][j] ? true : false}
                  style={{
                    width: `${dimensions}px`,
                    height: `${dimensions}px`,
                    backgroundColor: grid[i][j] ? "#cccccc" : "white",
                    border: "solid 1px #efefef",
                  }}
                />
              ))
            )}
          </div>
        </BoardContainer>
        <InfoPanel />
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
            dispatch({ type: NEXT_GEN });
            if (!running) {
              runningRef.current = true;
              runNext();
            }
          }}
        >
          Next
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
        <label for="speed-slider">Speed</label>
        <RubberSlider
          width={200}
          value={value}
          onChange={setValue}
          id="speed-slider"
          name="speed-slider"
          min={1}
          max={20}
          default={10}
        />
        {/* <div>{updateTime}</div> */}
      </Container>
      {/* 
      <Container>
        <label for="size">Size</label>
        <RubberSlider
          width={200}
          value={size}
          // onChange={setSize}
          id="size"
          name="size"
          min={20}
          max={100}
          step={10}
          default={10}
        /> */}
      {/* 
        <div>{size}</div>
      </Container> */}
    </>
  );
};

export default App;
