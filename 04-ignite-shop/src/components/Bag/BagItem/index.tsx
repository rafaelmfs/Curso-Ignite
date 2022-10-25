import Image from "next/future/image";
import { BagItemContainer, ImageContainer, ItemDetails } from "./styles";

interface BagItemProps{
  product: {
    name: string
    price: string
    imageUrl: string
    id: string
  }
}

export function BagItem({product}: BagItemProps){
  return (
    <BagItemContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" />
      </ImageContainer>

      <ItemDetails>
        <span>{product.name}</span>
        <strong>{product.price}</strong>
        <button>Remover</button>
      </ItemDetails>
    </BagItemContainer>
  )
}