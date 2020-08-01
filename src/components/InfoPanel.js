import React from "react";
import {
  Accordion,
  Card,
  Button,
  InputGroup,
  Input,
  FormControl,
} from "react-bootstrap";
import {
  Container,
  BoardContainer,
  TextContainer,
  ControlButton,
  Cell,
} from "../styles/container";

export const InfoPanel = () => {
  return (
    <div>
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
                  The "Game of Life" was developed by British mathematician John
                  Conway. It is an example of cellular automation, a model
                  studied in automata theory.
                  <br /> <br />
                  In Conway's Game of Life, cells are born and die according to
                  rules defined in the beginning of the simulation.
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
                      Any live cell with two or three live neighbours survives.
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
                  Game of Life is an example of a Turing Complete automata. This
                  means that it can function as a Turing Machine. A Turing
                  Machine is a theoretical machine posited by British
                  mathematician Alan Turing.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Turing Machine
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
                      Has a reader which moves along the length of the tape and
                      reads the values at each square.
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
    </div>
  );
};
