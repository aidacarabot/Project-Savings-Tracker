import { useState } from 'react'
import useToday from '../hooks/useToday'
import PieChartExpenses from '../components/Charts/PieChartExpenses/PieChartExpenses'

const Transactions = () => {
  const today = useToday()

  // Estado para manejar qué vista mostrar
  const [view, setView] = useState('All') // Empezamos con la vista 'All'

  return (
    <>
      <h3>Today is {today}</h3>

      <div className='buttons-transactions'>
        <button onClick={() => setView('Expenses')}>Expenses</button>
        <button onClick={() => setView('Income')}>Income</button>
        <button onClick={() => setView('All')}>All</button>
      </div>

      <h2>{`You are in the ${view} view`}</h2>

      {view === 'All'}
      {view === 'Income'}
      {view === 'Expenses' && <PieChartExpenses />}
    </>
  )
}

export default Transactions
