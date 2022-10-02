import styled from "styled-components";

const Button = styled.button.attrs(props => ({
  type: props.type || 'button'
}))`
  width: 100%;
  height: 3rem;
  border-radius: 4px;
  background-color: #6200EE;
  color: #EFEFEF;
  transition: all 0.2s linear;

  &:hover {
    background-color: #3700B3;
  }

  &:disabled {
    cursor: not-allowed;
    transition: none;
    background-color: #D5BFF9;
  }
`

export default Button;