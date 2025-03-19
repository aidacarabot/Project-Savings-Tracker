import React from 'react'
import useToday from '../hooks/useToday';
import LineChartExpensesSavings from '../components/LineChartExpensesSavings.jsx/LineChartExpensesSavings';

const Overview = () => {
  const today = useToday();

  return (
    <>
    <h3>Today is {today}</h3>
    <LineChartExpensesSavings/>
    </>
  )
}

export default Overview