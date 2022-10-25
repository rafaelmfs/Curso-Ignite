import { styled } from "../../styles";

export const AddToBagContainer = styled('button', {
  backgroundColor: '$green500',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '0.75rem',
  fontWeight: 'bold',
  fontSize: '$md',

  '&:not(:disabled):hover':{
    backgroundColor: '$green300',
    transition: '0.2s all',
  },

  variants: {
    home: {
      false: {
        marginTop: 'auto',
        padding: '1.25rem',
        cursor: 'pointer',
    
        '&:disabled': {
          opacity: 0.6, 
          cursor: 'not-allowed',
        },
      }
    }
  }
})