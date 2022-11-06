import styled, { css } from "styled-components";

const Input = styled.input<{ valid?: boolean }>`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  border-radius: 4px;

  outline: 1px solid black;
  ${({ valid }) => valid === false && css`
    outline: 2px solid #B00020;
  `}
  
  &:focus {
    outline: 2px solid #6200EE;
  }
`

export default Input