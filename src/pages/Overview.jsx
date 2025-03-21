import React from 'react'
import useToday from '../hooks/useToday'
import LineChartExpensesSavings from '../components/Charts/LineChartExpensesSavings.jsx/LineChartExpensesSavings'
import PieChartExpenses from '../components/Charts/PieChartExpenses/PieChartExpenses'


const Overview = () => {
  const today = useToday()

  return (
    <>
      <h3>Today is {today}</h3>
      <LineChartExpensesSavings />
      <PieChartExpenses />
    </>
  )
}

export default Overview
