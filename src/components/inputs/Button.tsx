import styled from "@emotion/styled";
import { inputStyle } from "./styles";

const Button = styled.button`
  ${inputStyle};
  outline: transparent;
  background-color: #6200ee;
  color: #efefef;
  transition: background-color 0.2s linear;

  &:hover {
    background-color: #3700b3;
  }

  &:disabled {
    cursor: not-allowed;
    transition: none;
    background-color: #d5bff9;
  }
`;

export default Button;
