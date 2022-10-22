import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ImageContaner, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string,
    description: string
    defaultPriceId: string
  } 
}

export default function Product({product}: ProductProps){
  const { isFallback } = useRouter()
  const [isCreatingChechoutSession, setIsCreatingChechoutSession] = useState(false)

  async function hendleBuyProduct(){
    try{
      setIsCreatingChechoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutURL } = response.data

      window.location.href = checkoutURL
    }catch(err){
      //Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      setIsCreatingChechoutSession(false)

      alert('falha ao redirecionar ao checkout!!!')
    }
  }

  if(isFallback){
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
  
      <ProductContainer>
        <ImageContaner>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContaner>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isCreatingChechoutSession} onClick={hendleBuyProduct}>Comprar Agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_Me1RDR6Q5O9Ci9' } },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id:product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour 
  }
}