import React from 'react'
import useToday from '../hooks/useToday'
import LineChartExpensesSavings from '../components/Charts/LineChartExpensesSavings.jsx/LineChartExpensesSavings'
import PieChartExpenses from '../components/Charts/PieChartExpenses/PieChartExpenses'
import { CalendarDays } from 'lucide-react'


const Overview = () => {
  const today = useToday()

  return (
    <>
      <h3 className="today-date"><CalendarDays className="icon-date"/> Today is {today} </h3>
      <div className="overview-charts">
        <LineChartExpensesSavings />
        <PieChartExpenses />
      </div>
    </>
  )
}

export default Overview
