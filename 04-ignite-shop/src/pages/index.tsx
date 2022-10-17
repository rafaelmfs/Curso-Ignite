import { styled } from "../styles"

const Button = styled('button', {
  backgroundColor: '$green500',
  border: 0,
  borderRadius: 4,
  padding: '8px 6px',

  span:{
    fontWeight: 'bold',
  },

  '&:hover': {
    filter: 'brightness(0.8)'
  }
})

export default function Home() {
  return (
    <Button>Click-me <span>++</span></Button>
  )
}
