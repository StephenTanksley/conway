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
import {
  Accordion,
  Card,
  Button,
  InputGroup,
  Input,
  FormControl,
} from "react-bootstrap";
import produce from "immer";
import RubberSlider from "@shwilliam/react-rubber-slider";
import "@shwilliam/react-rubber-slider/dist/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const state = useStore();
  const { speed, running, generations } = state.state;
  const { dispatch } = state;
  const [grid, setGrid] = useState(() => {
    return newGrid();
  });

  const [size, setSize] = useState(20);

  console.log("initial size: ", size);
  const [value, setValue] = useState(0.6);
  const numRows = size;
  const numCols = size;

  // setting the width for responsive design
  const dimensions = Math.round((window.innerWidth * 0.25) / size);

  // retrieving actions for context
  const { RUNNING, STOP_RUNNING, NEXT_GEN, RANDOM_BOARD, CLEAR } = ACTIONS;

  const valueRef = useRef(value);
  valueRef.current = value;

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
  }, [grid, updateTime, size]);

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

        <Container>
          <TextContainer>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Info
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    The "Game of Life" was developed by British mathematician
                    John Conway. It is an example of cellular automation, a
                    model studied in automata theory.
                    <br /> <br />
                    In Conway's Game of Life, cells are born and die according
                    to rules defined in the beginning of the simulation.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Rules
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    The rules of Conway's Game of Life are simple.
                    <ul>
                      <li>
                        Any live cell with two or three live neighbours
                        survives.
                      </li>
                      <li>
                        Any dead cell with three live neighbours becomes a live
                        cell.
                      </li>
                      <li>
                        All other live cells die in the next generation.
                        Similarly, all other dead cells stay dead.
                      </li>
                    </ul>
                    For each iteration (or generation as I'm calling them), each
                    cell will be evaluated according to these rules and will
                    either die or be reborn according to the rules provided. The
                    Game of Life is an example of a Turing Complete automata.
                    This means that it can function as a Turing Machine. A
                    Turing Machine is a theoretical machine posited by British
                    mathematician Alan Turing.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    What's A Turing Machine?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <h4>A Turing Machine: </h4>
                    <ul>
                      <li>
                        Imagines an arbitrarily long magnetic tape divided into
                        squares with values on each square.
                      </li>
                      <li>
                        Has a reader which moves along the length of the tape
                        and reads the values at each square.
                      </li>
                      <li>
                        When the reader finds a value, it has coded instructions
                        for what to do (if value x, do y, then enter state z).
                      </li>
                      <li>
                        Finally, there is a finishing state whereby the Turing
                        Machine completes its program and ends computation.
                      </li>
                      <li>
                        The assumption is that a detailed program given to a
                        Turing Machine can solve a problem that it is provided.
                      </li>
                    </ul>
                    For each iteration (or generation as I'm calling them), each
                    cell will be evaluated according to these rules and will
                    either die or be reborn according to the rules provided.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
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
        <label for="speed-slider">Speed</label>
        <RubberSlider
          width={250}
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

      <Container>
        <label for="size-slider">Size</label>
        <RubberSlider
          width={250}
          value={size}
          onChange={setSize}
          id="size-slider"
          name="size-slider"
          min={20}
          max={100}
          step={10}
          default={10}
        />

        <div>{size}</div>
      </Container>
      {/* <Container>
        <InputGroup className="size">
          <FormControl
            aria-label="Size"
            placeholder="Size"
            style={{
              maxWidth: "14vw",
              margin: "0 auto",
            }}
          />
        </InputGroup>
      </Container> */}
    </>
  );
};

export default App;
