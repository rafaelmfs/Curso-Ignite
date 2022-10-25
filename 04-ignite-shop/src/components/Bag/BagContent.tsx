import axios from 'axios';
import { X } from 'phosphor-react';
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

import { BagItem } from './BagItem';
import { BagContainer, ButtonClose } from "./styles";


export function BagContent(){

  const { 
    formattedTotalPrice, 
    cartCount, 
    cartDetails,
    clearCart,
    handleCloseCart, 
    shouldDisplayCart,
  } = useShoppingCart()
  const [isCreatingChechoutSession, setIsCreatingChechoutSession] = useState(false)

  
  const products = Object.values(cartDetails)

  async function handleFinishCheckout(){
    try{
      setIsCreatingChechoutSession(true)

      const lineItems = products.map(product => {
        return {
          price: product.defaultPriceId,
          quantity: product.quantity,
        }
      }) 
      const response = await axios.post('/api/checkout', {
        lineItems: lineItems,
      })

      const { checkoutURL } = response.data
      clearCart()
      
      window.location.href = checkoutURL
    }catch(err){
      //Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      setIsCreatingChechoutSession(false)

      alert('falha ao redirecionar ao checkout!!!')
    }
  }


  if(!shouldDisplayCart){
    return 
  }
  return (
    <BagContainer className={shouldDisplayCart && 'open'}>
      <ButtonClose onClick={handleCloseCart}>
        <X weight='bold' />
      </ButtonClose>

      <h2>Sacola de compras</h2>

     {cartCount > 0 ? 
      <>
        <ul>
          {products.map(product => {
            return (
            <li key={product.id}>
              <BagItem product={{
                name: product.name,
                price: product.formattedValue,
                imageUrl: product.imageUrl,
                id: product.id
              }}/>
            </li>
            )
          })}
        </ul>

        <footer>
          <div>
            <span>Quantidade</span>
            <span className='quantity-items'>{cartCount} {cartCount > 1 ? 'itens' : 'item'}</span>
          </div>
          <div>
            <strong>Valor total</strong>
            <strong className='price-value'>{ formattedTotalPrice }</strong>
          </div>

          <button disabled={isCreatingChechoutSession} onClick={handleFinishCheckout}>Finalizar compra</button>
        </footer>
      </> 
        : 
          <strong className="empty-bag"> Sua sacola está vazia!!!</strong>
        }
    </BagContainer>
  )
}