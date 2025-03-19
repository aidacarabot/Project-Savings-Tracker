import { createContext, useEffect, useReducer } from "react";
import financeReducer from "../reducers/FinanceReducer";

//! es un “Contexto de Finanzas” que se encarga de compartir la información relacionada con los ingresos, gastos y ahorros a todos los componentes que necesiten acceder a estos datos. Este contexto manejará el acceso y las actualizaciones de las finanzas en toda la aplicación.

//Inicializamos el estado inicial de las finanzas
const initialState = {
  income: [],
  expenses: [],
  savings: 0,
}
const FinanceContext = createContext();

const getInitialState = () => {
  const storedState = localStorage.getItem('financeData');
    if (storedState) {
      return JSON.parse(storedState);
    }
  return initialState;
};

// El proveedor del contexto que envuelve a los componentes de la app.
export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem("financeData", JSON.stringify(state));
  }, [state]); 

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceContext;