import { Handbag } from "phosphor-react"
import { useShoppingCart } from "use-shopping-cart"
import { NumberOfItems, ShowBag } from "./styles"

export function ShowBagButtom(){

  const { cartCount, handleCartHover, shouldDisplayCart } = useShoppingCart()

  return (
    <ShowBag empty={cartCount === 0} onClick={handleCartHover}>
      <Handbag weight="bold" />
      {cartCount > 0 && <NumberOfItems>{cartCount}</NumberOfItems>}
    </ShowBag>
  )
}