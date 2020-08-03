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
  width: 36.8vw;
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
  border-radius: 0.3rem;
  border: solid 1px #efefef;
  background-color: ${(props) =>
    `${props.alive === true ? LivingColor() : "white"}`};
  height: ${(props) => `${props.dimensions}px`};
  width: ${(props) => `${props.dimensions}px`};
`;

export const LivingColor = () => {
  const ColorChoices = ["#c3e8d1", "#b0d1bc", "#40e67d", "#27c461"];
  const randomColor = Math.floor(Math.random() * ColorChoices.length);

  return ColorChoices[randomColor];
};
