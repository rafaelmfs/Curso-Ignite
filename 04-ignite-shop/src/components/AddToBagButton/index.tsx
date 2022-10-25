import { Handbag } from "phosphor-react"
import { AddToBagContainer } from "./styles"
import { ButtonHTMLAttributes } from 'react'

interface AddToBagButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  home: boolean
}

export function AddToBagButton({home, ...props}: AddToBagButtonProps){
  return (
    <AddToBagContainer {...props}>  
      {home ? <Handbag weight="bold" size={32} /> : 'Colocar na sacola' }
    </AddToBagContainer>
  )
}