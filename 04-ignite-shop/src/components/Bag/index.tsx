import { X } from 'phosphor-react';
import { BagItem } from './BagItem';
import { BagContainer, ButtonClose } from "./styles";

interface BagProps{
  open: boolean
  setOpen: () => void
}

export function Bag({open, setOpen}: BagProps){
  if(!open){
    return
  }
  return (
    <BagContainer className={open && 'open'}      >
      <ButtonClose onClick={setOpen}>
        <X weight='bold' />
      </ButtonClose>

      <h2>Sacola de compras</h2>

      <ul>
        <li>
          <BagItem product={{
            name: 'Camiseta Beyond the Limits',
            price: 'R$ 79,90',
            imageUrl: '',
            id: ''
          }}/>
        </li>
        <li>
          <BagItem product={{
            name: 'Camiseta Beyond the Limits',
            price: 'R$ 79,90',
            imageUrl: '',
            id: ''
          }}/>
        </li>
        <li>
          <BagItem product={{
            name: 'Camiseta Beyond the Limits',
            price: 'R$ 79,90',
            imageUrl: '',
            id: ''
          }}/>
        </li>
      </ul>

      <footer>
        <div>
          <span>Quantidade</span>
          <span className='quantity-items'>3 items</span>
        </div>
        <div>
          <strong>Valor total</strong>
          <strong className='price-value'>R$ 270,00</strong>
        </div>

        <button>Finalizar compra</button>
      </footer>
    </BagContainer>
  )
}