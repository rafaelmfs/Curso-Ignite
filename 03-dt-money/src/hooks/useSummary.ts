import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/transactionsContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  // Sempre que o componente for renderizado as variáveis são criadas novamente e acaba ocupando um espaço diferente na memṕoria,
  // Para que ela seja criada uma única vez, podemos utilizar o hook useMemo e passar um array de dependencias para que ela altere somente se alguma informação das dependencias alterarem.
  // const summary = useMemo(() => {
  //   transactions.reduce(
  //     (acc, transaction) => {
  //       if (transaction.type === 'income') {
  //         acc.income += transaction.price
  //         acc.total += transaction.price
  //       } else {
  //         acc.outcome += transaction.price
  //         acc.total -= transaction.price
  //       }

  //       return acc
  //     },
  //     {
  //       income: 0,
  //       outcome: 0,
  //       total: 0,
  //     },
  //   )
  // }, [transactions])

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return summary
}

/** O que é o useMemo?
 *  - Um hook focado em performance que memoriza valores computados e reavalia esses valores caso uma de suas dependências seja alterada.
 * O que é o useCallback?
 *  - Um hook focado em performance que memoriza funções e as recria caso uma de suas dependências seja alterada.
 */
