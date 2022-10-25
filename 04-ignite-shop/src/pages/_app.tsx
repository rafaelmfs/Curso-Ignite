import { AppProps } from "next/app"
import Image from 'next/future/image'

import { globalStyles } from "../styles/global"
import logo from '../assets/Logo.svg'
import { Container, Header } from "../styles/pages/app";
import { Bag } from "../components/Bag";
import { useRouter } from "next/router";
import { CartProvider } from "use-shopping-cart";

globalStyles();


export default function App({ Component, pageProps }: AppProps) {

  const route = useRouter()

  const isSuccessPage = route.pathname === '/success'
 
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`


  return (
    <CartProvider
      stripe={process.env.STRIPE_SECRET_KEY}
      cartMode="checkout-session"
      currency="BRL"
      language="pt-BR"
    >
      <Container>
        <Header className={ isSuccessPage && 'success-page'}>
          <Image src={logo} alt="" />
          { !isSuccessPage && <Bag.ShowBag /> }

        </Header>
        
        <Component {...pageProps} />
        <Bag.Content />
      </Container>
    </CartProvider>
  )
}
