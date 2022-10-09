import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/Logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [openModal, setOpenModal] = useState(false)

  function showModal(open: boolean) {
    setOpenModal(() => open)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root onOpenChange={showModal} open={openModal}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal showModal={showModal} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
