import { createContext, useEffect, useReducer } from "react";
import financeReducer from "../reducers/FinanceReducer"; //Maneja las acciones y modificaciones del estado financiero.

//! es un “Contexto de Finanzas” que se encarga de compartir la información relacionada con los ingresos, gastos y ahorros a todos los componentes que necesiten acceder a estos datos. Este contexto manejará el acceso y las actualizaciones de las finanzas en toda la aplicación. Hará que los datos financieros estén disponibles para todos los componentes de la aplicación.

//* Inicializamos el estado inicial de las finanzas
const initialState = {
  income: [],
  expenses: [],
  savings: 0, // es un número porque no se van a ir agregando datos de ahorros, solo se va a actualizar el valor.
}
const FinanceContext = createContext(); //Creación del contexto. Este contexto proporcionará el estado de las finanzas y la capacidad de actualizarlo (a través de "dispatch") a cualquier componente que lo consuma.

//* Función para obtener el estado inicial de las finanzas desde el localStorage.
const getInitialState = () => {
  const storedState = localStorage.getItem('financeData');//Esta función se encarga de obtener el estado inicial. Intenta leer los datos almacenados previamente en el localStorage bajo la clave "financeData", hecho en FinanceReducer.jsx.

  console.log("Datos en localStorage:", storedState); //! Para ve lo que está en localStorage

    if (storedState) {
      return JSON.parse(storedState); //Si los datos existen en localStorage, los convierte de vuelta a un objeto JSON para ser utilizados como estado inicial.
    }

  return initialState; //Si no hay datos en localStorage, simplemente devuelve el estado inicial definido en "initialState".
};

// FinanceProvider es un componente que actúa como proveedor del contexto. Los componentes que se encuentren dentro de este proveedor tendrán acceso a los datos financieros y la capacidad de actualizarlos. Por eso rodamos <App/> siendo el children.
export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, getInitialState()); //Usamos useReducer para manejar el estado de las finanzas. El primer parámetro es el reducer (financeReducer) que contiene la lógica de cómo cambiar el estado. El segundo parámetro es el estado inicial que se obtiene mediante getInitialState(), como pusimos anteriormente. "state" es el estado actual que contiene los ingresos, gastos y ahorros. "dispatch" es una función que permite enviar acciones al reducer para actualizar el estado.

  //* Guardar el estado financiero en el localStorage cada vez que cambie.
  useEffect(() => {
    console.log("Guardando en localStorage:", state); //! Para ver el estado que guardamos en localStorage
    localStorage.setItem("financeData", JSON.stringify(state)); //El estado se convierte en una cadena JSON antes de ser guardado. 
  }, [state]); //Se ejecuta cada vez que el estado (state) cambia. Es decir, cuando agregamos un nuevo gasto, ingreso o actualizamos el ahorro.

  return (
    //Este es el proveedor del contexto. Envuelve a todos los componentes hijos y les propociona acceso al contexto financiero. value={{ state, dispatch }}: Proporciona tanto el state como la función dispatch al contexto. Los componentes que consuman este contexto podrán acceder a ambos valores.
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceContext;