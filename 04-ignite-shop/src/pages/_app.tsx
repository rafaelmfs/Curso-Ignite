import { Handbag } from "phosphor-react";

import { AppProps } from "next/app"
import Image from 'next/future/image'

import { globalStyles } from "../styles/global"
import logo from '../assets/Logo.svg'
import { Container, Header, NumberOfItems, ShowCart } from "../styles/pages/app";
import { Bag } from "../components/Bag";
import { useState } from "react";
import { useRouter } from "next/router";

globalStyles();


export default function App({ Component, pageProps }: AppProps) {

  const [openBag, setOpenBag] = useState<boolean>(false)
  const route = useRouter()

  const isSuccessPage = route.pathname === '/success'
 
  function showBag(){
    setOpenBag((state) => !state)
  }


  return (
    <Container>
      <Header className={ isSuccessPage && 'success-page'}>
        <Image src={logo} alt="" />
        {
          !isSuccessPage &&          
          <ShowCart empty={false} onClick={showBag}>
            <Handbag weight="bold" />
            <NumberOfItems>1</NumberOfItems>
          </ShowCart>
        }

      </Header>
      
      <Component {...pageProps} />
      <Bag open={openBag} setOpen={showBag} />
    </Container>
  )
}
