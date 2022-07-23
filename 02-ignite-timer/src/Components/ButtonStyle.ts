import styled, { css } from "styled-components";

export type buttonVariants = 'primary' | 'secondary' | 'danger' | 'neutral'

interface ButtonContainerProps {
  variants: buttonVariants;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  neutral: 'gray'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin: 0 8px;

  background-color: ${props => props.theme[props.variants]};

  /* ${props => {
    return css`
      background-color: ${buttonVariants[props.variants]};
    `
  }} */

`