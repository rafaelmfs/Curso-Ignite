import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

// CreateContext está vindo da biblioteca use-context-selector. Basicamente quando os componentes forem utilizar o contexto,
// É possível selecionar qual a parte do contexto que o componente vai observar para que ele não seja renderizado sempre que qualquer outra informação do contexto mude.
export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  // Com useCallback essa função não vai ser recriada em memória a não ser que alguma informação do array de dependências mude
  // Se tiver alguma informação fora da função e que ela utilize, é necessário colocar no array de dependência
  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data
      try {
        const response = await api.post('transactions', {
          category,
          description,
          price,
          type,
          createdAt: new Date(),
        })

        setTransactions((state) => [response.data, ...state])
      } catch (err) {
        console.log(err)
      }
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
