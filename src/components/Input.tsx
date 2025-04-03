import styled from '@emotion/styled';
import { css } from "@emotion/react";

import { inputStyle } from './styles';

const Input = styled.input<{ valid?: boolean }>`
  ${inputStyle}
  outline: 1px solid black;
  ${({ valid }) => valid === false && css`
    outline: 2px solid #B00020;
  `}
  
  &:focus {
    outline: 2px solid #6200EE;
  }
`

export default Input