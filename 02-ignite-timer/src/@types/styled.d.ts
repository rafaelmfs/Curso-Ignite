// Nos arquivos .d.ts contém somente códigos typescript, mais usado para definição tipagens
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

// Estamos guardando a tipagem de defaultTheme em ThemeType
type ThemeType = typeof defaultTheme

// Aqui estamos sobrescrevendo uma definição de tipos do styled components
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
