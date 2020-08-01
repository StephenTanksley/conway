import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 60vw;
  flex-direction: row;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

export const GridContainer = styled.div`
  display: grid;
  width: 75vw;
  height: auto;
  margin: 0 auto;
  justify-ontent: center;
  align-tems: center;
  border: 1px solid LightGray;
  grid-template-columns: ${(props) =>
    `repeat(${props.size}, ${props.dimensions}px)`};
`;

export const BoardContainer = styled(Container)`
  flex-direction: column;
  margin-bottom: 1rem;
  justify-content: center;
`;
// border: 1px solid blue;

export const TextContainer = styled(Container)`
  max-width: 18vw;
  line-height: 1.3rem;
  display: flex;
  flex-direction: column;
  padding-top: 0rem;
`;
// border: 1px solid green;

export const ControlButton = styled.button`
  font-size: 1rem;
  margin: 1rem;
  background-color: white;
  border-radius: 0.2rem;
`;

export const Cell = styled.div`
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  margin: 0;
  align-items: center;
  border-radius: 0.3rem;
  border: solid 1px #efefef;
  background-color: ${(props) =>
    `#${props.alive === true ? "#cccccc" : "white"}`};
  box-shadow: inset 0px 0px 1px #000000;
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
`;
