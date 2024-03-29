import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: '65vh',

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$green500',

    textDecoration: 'none',

    '&:hover' :{
      color: '$green300',
    }
  },

  '& div.images': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 132,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  padding: '0.25rem',
  marginTop: '4rem',
  marginBottom: '2rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  filter: 'drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.25))',

  img: {
    objectFit: 'cover',
  },

  '&.margin-left': {
    marginLeft: '-25%',
  }

})