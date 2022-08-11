import { createContext, ReactNode, useReducer, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContexProviderProps {
  children: ReactNode
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContexProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      // A função também tem 2 parâmetros que é o state, ou seja, o valor atual e uma action que é qual ação o usuário vai utilizar de alteração para o estado atual.
      if (action.type === 'ADD_NEW_CYCLE') {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }
      }
      if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }
      }
      return state
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  ) // O useReducer recebe dois parâmetros, uma função e o valor inicial.

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  // const [cycles, setCycles] = useState<Cycle[]>([])
  const { cycles, activeCycleId } = cyclesState
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: activeCycleId,
    })
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime()) // É retornado o time value em milisegundos
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
    // setCycles((state) => [...state, newCycle]) // Sempre que atualizar o estado e ele necessita do valor anterior, é melhor utilizar o formato de arrow.
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // ) // Essa parte está atualizando os ciclos para que quando for interrompido ele percorre todo o array de ciclos pegando o id do ciclo ativo e quando encontra altera a propriedade interruptedDate para a data atual, ou seja, quando foi atualizado.
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {},
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
