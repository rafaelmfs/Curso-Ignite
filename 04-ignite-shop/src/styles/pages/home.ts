import { isAbsolute } from "path";
import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',

  '.swiper-button-next, .swiper-button-prev': {
    color: 'white',
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '1.25rem',

    boxSizing: 'border-box',

    height: '100vh',
    width: '136px',
    background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
    transition: 'all 0.2s',

    '&:hover': {
      background: 'linear-gradient(rgba(18, 18, 20, 0.2), rgba(18, 18, 20, 100))',
    }

  },

  '.swiper-button-next': {
    right: 0,
  },
  
  '.swiper-button-next:after, .swiper-button-prev:after ': {
    fontSize: '$xl',
  },

  '.swiper-button-prev': {
    left: 0,
  },

  '.swiper-button-disabled': {
    display: 'none'
  }

})

export const Product = styled('a', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  // padding: '0.25rem',
  cursror: 'pointer',
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    'strong': {
      fontSize: '$lg',

    },

    span: {
      fontSize: 'xl',
      fontWeight: 'bold',
      color: '$green300',

    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  }
})