import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 60vw;
  flex-direction: row;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`;

export const BoardContainer = styled(Container)`
  flex-direction: column;
  margin-bottom: 1rem;
  border: 1px solid blue;
`;

export const TextContainer = styled(Container)`
  max-width: 20vw;
  border: 1px solid green;
`;

export const ControlButton = styled.button`
  font-size: 1rem;
  margin: 1rem;
  background-color: white;
  border-radius: 0.2rem;
`;

export const Cell = styled.div`
  border-radius: 0.05rem;
`;
