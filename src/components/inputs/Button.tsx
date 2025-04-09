import styled from "@emotion/styled";
import { inputStyle } from "./styles";

const Button = styled.button`
  ${inputStyle};
  background-color: #6200ee;
  color: #efefef;
  transition: all 0.2s linear;

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
