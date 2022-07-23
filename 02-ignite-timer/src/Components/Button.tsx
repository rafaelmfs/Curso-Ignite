import { ButtonContainer, buttonVariants } from "./ButtonStyle";

interface ButtonProps {
  variants?:  buttonVariants;
}

export function Button({variants = 'primary'}: ButtonProps){
  return <ButtonContainer variants={variants}>Enviar</ButtonContainer>
}