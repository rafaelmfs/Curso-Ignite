import Head from 'next/head'
import Image from "next/future/image";
import { GetStaticProps } from "next";

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { Arrow, HomeContainer, Product} from "../styles/pages/home";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Link from "next/link";
import { useState } from "react";
import { CaretLeft, CaretRight, Handbag } from "phosphor-react";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({products}: HomeProps) {

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  });

   return (
      <>
        <Head>
          <title>HOME | Ignite Shop</title>
        </Head>
        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map(product => {
            const price = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(product.price)
            return (
              <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                <Product className="keen-slider__slide">
                  <Image src={product.imageUrl} width={520} height={480} alt={""} />

                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{price}</span>
                    </div>
                    <div className='bag'>
                      <Handbag weight="bold" size={32} />
                    </div>
                  </footer>
                </Product>
              </Link>
            )}
          )}
        </HomeContainer>
        <Arrow className="arrow-next" disabled={currentSlide === products.length - 3} onClick={() => instanceRef.current.next()}><CaretRight size={32}/></Arrow>
        <Arrow className="arrow-prev" disabled={currentSlide === 0} onClick={() => instanceRef.current.prev()}><CaretLeft size={32}/></Arrow>
      </>

  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
    } 
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 //2 hours
  }
}