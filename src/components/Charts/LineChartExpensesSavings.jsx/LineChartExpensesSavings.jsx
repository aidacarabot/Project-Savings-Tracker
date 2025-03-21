import React, { useState } from 'react'
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import useFinanceStats from '../../../hooks/useFinanceStats'




const LineChartExpensesSavings = () => {
  const [view, setView] = useState('Month') //vista por defecto (mes)

  //Obtener datos actuales de expenses y savings
  const { expenses, savings } = useFinanceStats()

  // Función para obtener los datos agrupados según la vista seleccionada (week, month, year)
  const getChartData = () => {
    const groupedData = []; // Array para almacenar los datos agrupados
    let filteredExpenses = [...expenses]; // Copia de los gastos para no modificar el original

    // Agrupación de los datos según la vista seleccionada
    if (view === 'Week') {
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      // Recorre cada día de la semana
      daysOfWeek.forEach(day => {
        const dayExpenses = filteredExpenses.filter(expense => expense.day === day); // Obtener los gastos del día actual
        const daySavings = savings.filter(saving => saving.day === day); // Obtener los ahorros del día actual

        const totalExpenses = dayExpenses.reduce((acc, expense) => acc + expense.amount, 0); // Suma y acumula gastos de cada día
        const totalSavings = daySavings.reduce((acc, saving) => acc + saving.amount, 0); // Suma y acumula ahorros de cada día

        // Asegurarnos de que si no hay gastos o ahorros, asignamos 0
        groupedData.push({
          name: day,
          expenses: totalExpenses > 0 ? totalExpenses : 0,  // Si no hay gastos, asignamos 0
          savings: totalSavings > 0 ? totalSavings : 0,    // Si no hay ahorros, asignamos 0
        });
      });
    } else if (view === 'Month') {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      months.forEach(month => {
        const monthExpenses = filteredExpenses.filter(expense => expense.month === month); // Obtener los gastos del mes actual
        const monthSavings = savings.filter(saving => saving.month === month); // Obtener los ahorros del mes actual

        const totalExpenses = monthExpenses.reduce((acc, expense) => acc + expense.amount, 0); // Suma y acumula gastos de cada mes
        const totalSavings = monthSavings.reduce((acc, saving) => acc + saving.amount, 0); // Suma y acumula ahorros de cada mes

        // Asegurarnos de que si no hay gastos o ahorros, asignamos 0
        groupedData.push({
          name: month,
          expenses: totalExpenses > 0 ? totalExpenses : 0,  // Si no hay gastos, asignamos 0
          savings: totalSavings > 0 ? totalSavings : 0,    // Si no hay ahorros, asignamos 0
        });
      });
    } else if (view === 'Year') {
      const currentYear = new Date().getFullYear(); // Año actual

      // Obtener los años únicos de los gastos y ahorros
      const years = [
        ...new Set([
          currentYear,  // Siempre incluir el año actual
          ...filteredExpenses.map(expense => expense.year),  // Extraer años de los gastos
          ...savings.map(saving => saving.year)  // Extraer años de los ahorros
        ])
      ];

      years.forEach(year => {
        const yearExpenses = filteredExpenses.filter(expense => expense.year === year);
        const yearSavings = savings.filter(saving => saving.year === year);

        const totalExpenses = yearExpenses.reduce((acc, expense) => acc + expense.amount, 0); // Suma y acumula gastos de cada año
        const totalSavings = yearSavings.reduce((acc, saving) => acc + saving.amount, 0); // Suma y acumula ahorros de cada año

        // Asegurarnos de que si no hay gastos o ahorros, asignamos 0
        groupedData.push({
          name: year.toString(),  // Convertir a string para la clave "name"
          expenses: totalExpenses > 0 ? totalExpenses : 0, // Si no hay gastos, asignamos 0
          savings: totalSavings > 0 ? totalSavings : 0,    // Si no hay ahorros, asignamos 0
        });
      });
    }

    return groupedData;
  };

  // Obtener los datos formateados
  const chartData = getChartData();

  return (
    <>
      <div className='buttons-view'>
        <button onClick={() => setView('Week')}>Week</button>
        <button onClick={() => setView('Month')}>Month</button>
        <button onClick={() => setView('Year')}>Year</button>
      </div>

      <LineChart width={730} height={250} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis
            dataKey="name"
            hide={false}
        />
        <YAxis />
        <Tooltip />
        <Legend iconType='circle' iconSize='10' />
        <Line type='monotone' dataKey='expenses' stroke='#FF3C38' strokeWidth={2} dot={{ fill: '#FF3C38' }} />
        <Line type='monotone' dataKey='savings' stroke='#3185FC' strokeWidth={2} dot={{ fill: '#3185FC' }}/>
      </LineChart>
    </>
  )
}

export default LineChartExpensesSavings