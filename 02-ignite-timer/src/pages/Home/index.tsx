import { Play } from 'phosphor-react'
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
  TaskInput,
} from './styles'

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
    .min(5, 'O ciclo precisa ter no mímino 5 minutos')
    .max(60, 'O ciclo precisa ter no máximo 60 minutos'),
  // Validando o campo minutesAmount, é um number de no mínimo 5 e no máximo 60, se o usuário preencher um número fora desse intervalo será exibida a mensagem.
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset, formState } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema), // é para utilizar s validações do zod no useForm e utilizar o schema que foi criado com a variável newCycleFormValidationSchema
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

  console.log(formState.errors) // Essa é a forma de pegar os erros de validação do formulário, tem um objeto chamado formState e nele tem um atributo chamado errors.
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê umo nome para o seu projeto"
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
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
