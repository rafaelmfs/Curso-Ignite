import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',

  'a:first-child': {
    marginLeft: 'calc((100vw - 1180px) / 2)',
  },
})

export const Arrow = styled('button', {
  position: 'absolute',
  top: '0',
  bottom: '0',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  boxSizing: 'border-box',
  border: 0,
  color: '$gray300',

  width: '98px',
  transition: 'all 0.2s',

  '&:not(:disabled):hover': {
    color: '$gray100',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  '&:disabled': {
    display: 'none',
  },

  '&.arrow-next':{
    background: 'linear-gradient(90deg, rgba(18,18,20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
    right: 0,
  },

  '&.arrow-next:hover': {
    background: 'linear-gradient(90deg, rgba(18, 18, 20, 0), rgba(18, 18, 20, 0.9))',

  },


  '&.arrow-prev':{
    background: 'linear-gradient(270deg, rgba(18,18,20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
    left: 0,
  },
  
  '&.arrow-prev:hover': {
    background: 'linear-gradient(270deg, rgba(18, 18, 20, 0), rgba(18, 18, 20, 0.9))',

  },


})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursror: 'pointer',
  position: 'relative',
  color: '$gray100',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',
  cursor: 'pointer',

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
    backdropFilter: 'blur(8px)',
    // background: 'rgba(12,30,45, 0.7)',

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