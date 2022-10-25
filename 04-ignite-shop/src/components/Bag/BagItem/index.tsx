import Image from "next/future/image";
import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
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

  const { removeItem } = useShoppingCart()

  return (
    <BagItemContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={96} height={96} />
      </ImageContainer>

      <ItemDetails>
        <span>{product.name}</span>
        <strong>{product.price}</strong>
        <button onClick={() => removeItem(product.id)}>Remover</button>
      </ItemDetails>
    </BagItemContainer>
  )
}