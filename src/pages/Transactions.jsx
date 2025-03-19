import React from 'react'
import useToday from '../hooks/useToday'

const Transactions = () => {
  const today = useToday();

  return (
    <h3>Today is {today}</h3>
  )
}

export default Transactions