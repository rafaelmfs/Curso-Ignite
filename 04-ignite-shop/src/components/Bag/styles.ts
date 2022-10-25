import { styled, keyframes } from "../../styles";

const open = keyframes({
  from: { width: 0},
  to: { width: 480},
});

export const BagContainer = styled('div', {
  position: 'absolute',
  height: '100vh',
  right: 0,
  top: 0,

  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  maxWidth: 480,

  paddingTop: '1.5rem',
  paddingRight: '1.5rem',  
  paddingLeft: '3rem',
  paddingBottom: '3rem',
  
  backgroundColor: '$gray800',
  zIndex: 999,

  overflow: 'hidden',

  '&.open': { animation: `${open} 200ms` },
  
  h2: {
    marginBottom: '2rem',

    fontSize: '$lg',
    lineHeight: 1.6,
    color: '$gray100',
  },

  '& ul': {
    listStyle: 'none',
    width: '100%',
    marginBottom: '1rem',

    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  footer: {
    marginTop: 'auto',

    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      span: {
        fontSize: '$sm',
        lineHeight: 1.6,

        color: '$gray300',

        '&.quantity-items': {
          fontSize: '$md',
        }
      },

      strong: {
        fontSize: '$mm',
        lineHeight: 1.6,

        color: '$gray100',

        '&.price-value': {
          fontSize: '$xl',
        }
      },
    },

    button: {
      width: '100%',
      backgroundColor: '$green500',
      border: 0,
      color: '$white',
      borderRadius: 8,
      padding: '1.25rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '$md',
      marginTop: '3rem',
      
      '&:not(:disabled):hover':{
        backgroundColor: '$green300',
        transition: '0.2s all',
      },
  
      '&:disabled': {
        opacity: 0.6, 
        cursor: 'not-allowed',
      },
    }
  }

})

export const ButtonClose = styled('button', {
  cursor: 'pointer',
  alignSelf: 'end',

  background: 'transparent',
  border: 0,
  color: '$gray500',
  fontSize: '$xl',

  '&:hover': {
    color: '$gray300',
  }
})