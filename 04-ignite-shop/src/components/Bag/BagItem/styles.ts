import { styled } from "../../../styles";

export const BagItemContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  maxHeight: '6rem',

  gap: '1.25rem',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: '6.5rem',
  maxHeight: '6rem',
  height: '6rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const ItemDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  padding: '0.25rem 0',

  span: {
    fontSize: '$md',
    fontWeight: 400,
    lineHeight: 1.6,

    color: '$gray300',
  },
  strong: {
    fontSize: '$md',
    fontWeight: 700,
    lineHeight: 1.6,

    color: '$gray100',
  },
  button: {
    marginTop: '0.5rem',
    background: 'transparent',
    border: 0,

    textAlign: 'start',
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1.6,
    color: '$green500',

    '&:hover':{
      color: '$green300',
      cursor: 'pointer',
    },
  }
})