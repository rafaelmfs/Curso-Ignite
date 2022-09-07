import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { CountdownContainer, Separator } from './style'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // Essa variavel está guardando o total de segundos, no caso do input pegamos o valor por minutos e aqui estamos convertendo tudo para segundos.

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // Essa variável está guardado a quantidade de segundos que sobraram, ele faz um calculo do total de segundos subtraindo pela quantidade de segundos que já passaram.

  const minutesAmount = Math.floor(currentSeconds / 60) // Vai converter os segundos para minutos minutos arredondando para baixo para pegar sempre um número inteiro.
  const secondsAmount = currentSeconds % 60 // O resto dos segundos que sobraram.

  const minutes = String(minutesAmount).padStart(2, '0') // O método padStart vai preencher a string com os caracteres faltantes para inteirar o tamanho informado.
  const seconds = String(secondsAmount).padStart(2, '0') // O método padStart vai preencher a string com os caracteres faltantes para inteirar o tamanho informado.

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = `Ignite Timer`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        // A diferença está sendo validada comparando a data atual e a data de início, sempre colocando a data mais atual primeiro nos parametros da função differenceIn
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(interval)
          setSecondsPassed(totalSeconds)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000) // Não utilizar o contador do setInterval pois não é preciso, isso é uma estimativa e pode acontecer de não se passar 1 segundo.
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
