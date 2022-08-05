import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

/* Formulário controlled / uncontrolled
Controlled: é quando utiliza um estado para ir atualizando a cada modificação no input,
você cria um estado e a função de atualizar esse estado fica no onChange e também utiliza
o value como o valor do estado.
as vantagens de utilizar um formulário controled é ter o valor do input em tempo real para
se caso utilizar uma lógica de habilitar e desabilitar algum botão quando estiver algo preenchido
por exemplo. A desvantagem é que o componente é atualizado a cada digitação, então em formulários
muito grandes e complexos pode causar lentidão. 
Uncontrolled: é quando se atualiza quando for necessáriamente precisar das informações, por exemplo no onSubmit
do formulário, nesse caso seria mais performático pois o componente não iria se atualizar a cada digitação mas
também nos perderíamos a referencia do valor do input se caso for habilitar ou desabilitar algo baseado no 
valor do input.
**** É bom sempre analisar qual é a melhor forma de utilizar, cada um deles vai ser bem útil em cada situação.
*/

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'), // Validando o campo task, é uma string de no mínimo 1 caracter e se o usuário não preencher será exibida a mensagem de erro.
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ter no mímino 5 minutos')
    .max(60, 'O ciclo precisa ter no máximo 60 minutos'),
  // Validando o campo minutesAmount, é um number de no mínimo 5 e no máximo 60, se o usuário preencher um número fora desse intervalo será exibida a mensagem.
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset, formState } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema), // é para utilizar s validações do zod no useForm e utilizar o schema que foi criado com a variável newCycleFormValidationSchema
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // Essa variavel está guardando o total de segundos, no caso do input pegamos o valor por minutos e aqui estamos convertendo tudo para segundos.

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        // A diferença está sendo validada comparando a data atual e a data de início, sempre colocando a data mais atual primeiro nos parametros da função differenceIn
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          clearInterval(interval)
          setAmountSecondsPassed(totalSeconds)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000) // Não utilizar o contador do setInterval pois não é preciso, isso é uma estimativa e pode acontecer de não se passar 1 segundo.
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime()) // É retornado o time value em milisegundos
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle]) // Sempre que atualizar o estado e ele necessita do valor anterior, é melhor utilizar o formato de arrow.
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    ) // Essa parte está atualizando os ciclos para que quando for interrompido ele percorre todo o array de ciclos pegando o id do ciclo ativo e quando encontra altera a propriedade interruptedDate para a data atual, ou seja, quando foi atualizado.
    setActiveCycleId(null)
  }

  console.log(formState.errors) // Essa é a forma de pegar os erros de validação do formulário, tem um objeto chamado formState e nele tem um atributo chamado errors.

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // Essa variável está guardado a quantidade de segundos que sobraram, ele faz um calculo do total de segundos subtraindo pela quantidade de segundos que já passaram.

  const minutesAmount = Math.floor(currentSeconds / 60) // Vai converter os segundos para minutos minutos arredondando para baixo para pegar sempre um número inteiro.
  const secondsAmount = currentSeconds % 60 // O resto dos segundos que sobraram.

  const minutes = String(minutesAmount).padStart(2, '0') // O método padStart vai preencher a string com os caracteres faltantes para inteirar o tamanho informado.
  const seconds = String(secondsAmount).padStart(2, '0') // O método padStart vai preencher a string com os caracteres faltantes para inteirar o tamanho informado.

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task // Variável de controle para desabilitar o botão

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê umo nome para o seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Abacate" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
