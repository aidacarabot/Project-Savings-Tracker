import { createContext, useEffect, useReducer } from "react";
import financeReducer from "../reducers/FinanceReducer"; //Maneja las acciones y modificaciones del estado financiero.

//! es un “Contexto de Finanzas” que se encarga de compartir la información relacionada con los ingresos, gastos y ahorros a todos los componentes que necesiten acceder a estos datos. Este contexto manejará el acceso y las actualizaciones de las finanzas en toda la aplicación. Hará que los datos financieros estén disponibles para todos los componentes de la aplicación.

const FinanceContext = createContext(); //Creación del contexto. Este contexto proporcionará el estado de las finanzas y la capacidad de actualizarlo (a través de "dispatch") a cualquier componente que lo consuma.

// Definir las categorías y tipos centralizadamente
export const categories = [
  'Home 🏠', 'Transportation 🚗', 'Food & Groceries 🍽️', 'Health & Wellness 🏥',
  'Leisure & Entertainment 🎭', 'Travel ✈️', 'Subscriptions 💳', 'Shopping 🛍️',
  'Education 📚', 'Gifts 🎁', 'Debt 🏦', 'Other ❓'
];

//* Inicializamos el estado inicial de las finanzas
const initialState = {
  income: [],
  expenses: [],
  savings: 0, // es un número porque no se van a ir agregando datos de ahorros, solo se va a actualizar el valor.
  categories
}

//* Función para obtener el estado inicial de las finanzas desde el localStorage.
const getInitialState = () => {
  console.log("Accediendo a localStorage");
  const storedState = localStorage.getItem('financeData');//Esta función se encarga de obtener el estado inicial. Intenta leer los datos almacenados previamente en el localStorage bajo la clave "financeData", hecho en FinanceReducer.jsx.

  console.log("Datos en localStorage FinanceContext 1:", storedState); //! Para ve lo que está en localStorage

    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);

        // Asegúrate de que las categorías y tipos estén presentes, si no, asigna los valores predeterminados
        if (!parsedState.categories) {
          parsedState.categories = categories; // Asignar valores predeterminados
        }

        return parsedState;
      } catch (e) {
        console.error("Error al parsear localStorage:", e);
      }
    }

  return initialState; //Si no hay datos en localStorage, simplemente devuelve el estado inicial definido en "initialState".
};

// FinanceProvider es un componente que actúa como proveedor del contexto. Los componentes que se encuentren dentro de este proveedor tendrán acceso a los datos financieros y la capacidad de actualizarlos. Por eso rodamos <App/> siendo el children.
export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, getInitialState()); //Usamos useReducer para manejar el estado de las finanzas. El primer parámetro es el reducer (financeReducer) que contiene la lógica de cómo cambiar el estado. El segundo parámetro es el estado inicial que se obtiene mediante getInitialState(), como pusimos anteriormente. "state" es el estado actual que contiene los ingresos, gastos y ahorros. "dispatch" es una función que permite enviar acciones al reducer para actualizar el estado.


  // Verifica que el estado esté correctamente inicializado
  console.log("State en FinanceProvider:", state);

  //* Guardar el estado financiero en el localStorage cada vez que cambie.
  useEffect(() => {
    console.log("Guardando en localStorage FinanceContext 2:", state); //! Para ver el estado que guardamos en localStorage
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