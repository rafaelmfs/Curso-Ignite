import Image from "next/future/image";
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product} from "../styles/pages/home";

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from "swiper";

import 'swiper/css'
import "swiper/css/navigation";



import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'
import camiseta4 from '../assets/camisetas/4.png'

export default function Home() {
  const swiper = useSwiper();

  console.log(swiper)

  return (
      <HomeContainer>

        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          slidesPerView={3}
          spaceBetween={48}
        >

          <SwiperSlide>
            <Product>
              <Image src={camiseta1} width={520} height={480} alt={""}  />

              <footer>
                <strong>Camiseta X</strong>
                <span>R$ 79,90</span>
              </footer>
            </Product>
          </SwiperSlide>

          <SwiperSlide>
            <Product>
              <Image src={camiseta2} width={520} height={480} alt={""}  />

              <footer>
                <strong>Camiseta X</strong>
                <span>R$ 79,90</span>
              </footer>
            </Product>
          </SwiperSlide>
          
          <SwiperSlide>
            <Product>
              <Image src={camiseta3} width={520} height={480} alt={""}  />

              <footer>
                <strong>Camiseta X</strong>
                <span>R$ 79,90</span>
              </footer>
            </Product>
          </SwiperSlide>
          
          <SwiperSlide>
            <Product>
              <Image src={camiseta4} width={520} height={480} alt={""}  />

              <footer>
                <strong>Camiseta X</strong>
                <span>R$ 79,90</span>
              </footer>
            </Product>
          </SwiperSlide>

        </Swiper>


        
      </HomeContainer>

  )
}
