import { useEffect, useState } from 'react'

//! Hook para mostrar la fecha de hoy, lo importaremos en las diferentes páginas.

const useToday = () => {
  const [today, setToday] = useState('') //Inicializamos today como un string vacío "" porque aún no hemos calculado la fecha.

  useEffect(() => {
    const date = new Date() //Creamos una variable date con la fecha y hora actual usando new Date(). Esto nos da un objeto Date con la fecha y hora del sistema.

    setToday(
      //actualiza el estado de "today"
      date.toLocaleDateString('en-US', {
        //toLocaleDateString convierte la fecha en un string legible según el formato indicado."en-US" es el formato de fecha en inglés (ej. 12/31/2022)
        weekday: 'long', //muestra el dia de la semana completa (ej. Sunday)
        month: 'long', //muestra el mes completo (ej. January)
        day: 'numeric', //muestra el día del mes como un número (ej. 1, 2, 3, ..., 31)
        year: 'numeric' //muestra el año como un número (ej. 2023)
      })
    )
  }, []) //se ejecuta una sola vez, al montar el componente.

  return today
}

export default useToday