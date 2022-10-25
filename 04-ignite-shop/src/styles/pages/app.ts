import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',

})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '&.success-page': {
    justifyContent: 'center',
  },
})

export const ShowCart = styled('button', {
  width: 48,
  height: 48,
  
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',
  fontSize: '1.5rem',
  borderRadius: 6,
  border: 0,
  background: '$gray800',
  color: '$gray500',
  cursor: 'pointer',

  '&:hover': {
    opacity: '0.8',
    transition: '0.2s',
  },

  variants: {
    empty: {
      false: {
        color: '$gray300'
      }
    }
  },
})

export const NumberOfItems = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.75rem',
  height: '1.75rem',
  border: '3px solid $gray900',
  borderRadius: '50%',

  position: 'absolute',
  top: 0,
  right: 0,

  transform: 'translateY(-25%) translateX(25%)',
  
  background: '$green500',
  color: '$gray100',
  fontSize: '0.875rem',
  lineHeight: '1.6',
  fontWeight: 700,


})
