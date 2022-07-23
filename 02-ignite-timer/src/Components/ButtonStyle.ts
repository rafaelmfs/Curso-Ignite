import styled from 'styled-components'

export type buttonVariants = 'primary' | 'secondary' | 'danger' | 'neutral'

interface ButtonContainerProps {
  variants: buttonVariants
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
