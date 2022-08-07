import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { createContext, useState } from 'react'
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

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

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'), // Validando o campo task, é uma string de no mínimo 1 caracter e se o usuário não preencher será exibida a mensagem de erro.
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ter no mímino 5 minutos')
    .max(60, 'O ciclo precisa ter no máximo 60 minutos'),
  // Validando o campo minutesAmount, é um number de no mínimo 5 e no máximo 60, se o usuário preencher um número fora desse intervalo será exibida a mensagem.
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), // é para utilizar s validações do zod no useForm e utilizar o schema que foi criado com a variável newCycleFormValidationSchema
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset, formState } = newCycleForm

  console.log(formState.errors) // Essa é a forma de pegar os erros de validação do formulário, tem um objeto chamado formState e nele tem um atributo chamado errors.

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

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

  const task = watch('task')
  const isSubmitDisabled = !task // Variável de controle para desabilitar o botão

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

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
