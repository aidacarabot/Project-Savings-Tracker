import { useState } from 'react'
import useToday from '../hooks/useToday'
import useFinanceStats from '../hooks/useFinanceStats';
import ExpensesGoals from '../components/ExpensesGoals/ExpensesGoals';
import { CalendarDays } from 'lucide-react';

const Goals = () => {
  const [view, setView] = useState('Month') // Estado para manejar qué vista mostrar
  const today = useToday();
  const currentMonth = today.split(" ")[1];  // Extraemos solo el nombre del mes de la fecha de hoy
  const { groupedIncomeByMonth } = useFinanceStats(); // Obtenemos los ingresos agrupados por mes

  //*Obtener el total de ingresos del mes actual
  const totalIncome = groupedIncomeByMonth[currentMonth]
    ? groupedIncomeByMonth[currentMonth].reduce((acc, income) => acc + income.amount, 0)
    : 0;
  
  return (
    <>
    <h3 className="today-date"> <CalendarDays className="icon-date"/>Today is {today}</h3>

    <div className='buttons-goals'>
        <button onClick={() => setView('Week')}>Week Goal</button>
        <button onClick={() => setView('Month')}>Month Goal</button>
        <button onClick={() => setView('Year')}>Year Goal</button>
    </div>

    <p>Income for {currentMonth}: ${totalIncome}</p> 
    {/* //! Hay que arreglar esto porque no muestra bien lo números */}

     <h2>{`You are in the ${view} view`}</h2>

      {view === 'Week' && (
        <>
          <ExpensesGoals/>
        </>
      )}
      {view === 'Month' && (
        <>
          <ExpensesGoals/>
        </>
      )}
      {view === 'Year' && (
        <>
          <ExpensesGoals/>
        </>
      )}
    </>
  );
};

export default Goals