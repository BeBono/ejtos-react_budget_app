import React, { createContext, useReducer } from 'react'; //Use Reducer es una función propia de React al igual que createContext (no son métodos).

    // 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => { //'state' es el nombre del estado de la aplicación definida dentro de AppProvider().
    let budget = 0;
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget = 0;
            total_budget = state.expenses.reduce(
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost
                },0
            );
            total_budget = total_budget + action.payload.cost;
            action.type = "DONE";
            if(total_budget <= state.budget) {
                total_budget = 0;
                state.expenses.map((currentExp)=> {
                    if(currentExp.name === action.payload.name) {
                        currentExp.cost = action.payload.cost + currentExp.cost;
                    }
                    return currentExp
                });
                return {
                    ...state,
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return {
                    ...state
                }
            }
            case 'RED_EXPENSE':
                const red_expenses = state.expenses.map((currentExp)=> {
                    if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                        currentExp.cost =  currentExp.cost - action.payload.cost;
                        budget = state.budget + action.payload.cost
                    }
                    return currentExp
                })
                action.type = "DONE";
                return {
                    ...state,
                    expenses: [...red_expenses],
                };

                case 'DECREASE': 
                action.type = "DONE";  //This avoid that the case repeat.

                const Decrease = state.expenses.map((mycurrentExp)=> { //Recorre el arreglo 'expenses'
                    if(mycurrentExp.name === action.payload.name) { //Asses when 'name' from Action makes match.   
                        
                        if (mycurrentExp.cost === 0) {
                            alert ('Cost is already zero');
                            return {...state}
                        } else {

                            mycurrentExp.cost = mycurrentExp.cost - action.payload.cost; // Modify the array copied from 'state.expenses'. // Resta el costo actual - 10 (que está cargado en 'cost').
                            return mycurrentExp //Return nuevo estado y que es cargada a la variable 'Deacrese'
                        }

                    } else {
                        return  {...state} //Mientras se ejecuta .map y no hay coincidencias, devuelve el mismo estado.
                    }

               
                });

                return { //Requerido para renderizar.
                    Decrease //React detecta que eL 'Decrease' es diferente respecto a 'state' y renderiza.
                 
                };


            case 'DELETE_EXPENSE':
            action.type = "DONE";
            state.expenses.map((currentExp)=> {
                if (currentExp.name === action.payload) {
                    budget = state.budget + currentExp.cost
                    currentExp.cost =  0;
                }
                return currentExp
            })
            action.type = "DONE";
            return {
                ...state,
                budget
            };
        case 'SET_BUDGET':
            action.type = "DONE";

            //Funcion para manejo cuando el numero digitado supera los 20.0000:
            
                if (action.payload > 20000) {
                    state.budget = 20000; //Load the upper budget allowed.
                    alert ('$20000 is the maximum budget');
                    return {
                        ...state   // '...state' creates a copy of the original 'state' with changes, then React to render it.
                    }
                } else {
                state.budget = action.payload           

                     return {
                 ...state
                    };

                }

            
        case 'CHG_CURRENCY':
         action.type = "DONE";
            state.currency = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }

};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState); //La función/hook useReducer en React simplemente espera que la función reductora (primer parámetro) que se proporciona siga la estructura estándar con dos argumentos: el primer argumento representa el estado actual y el segundo argumento es la acción que desencadena la actualización del estado (AppReducer(state, action)).
    let remaining = 0;

    if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};


// NOTAS:

// ******
// const [state, dispatch] = useReducer(AppReducer, initialState);

// state representa el estado actual del componente. En el momento en que se llama a useReducer, state tendrá el valor inicial que proporcionaste en initialState.

// dispatch es una función que se utiliza para enviar acciones que desencadenan actualizaciones en el estado. Cuando llamas a dispatch, pasas una acción como argumento, y esa acción se envía a la función reductora (AppReducer en este caso) junto con el estado actual. La función reductora procesa la acción y el estado actual y devuelve un nuevo estado, que luego se almacena en state.

// La función reductora (AppReducer en tu ejemplo) debe seguir una estructura estándar. Debe aceptar dos argumentos: el estado actual y la acción.

// Cualquier de estas palagras dentro de la expresión puede ser personalizad, excepto el nombre del hook 'useReducer' propio de React.

// ******

//si se desea acceder al arreglo de gastos dentro de tu función reducer o en cualquier otro lugar donde tengas acceso al estado, puedes hacerlo utilizando state.expenses.

// ******

// case 'DECREASE': Dentro del contexto del reducer, no es necesario invocar explícitamente la función que moficará el estado. La lógica que contiene la función map () se ejecuta automáticamente cuando se llama al reducer en respuesta a una acción. El reducer se encarga de aplicar las modificaciones al estado y, en este caso, actualiza la propiedad expenses con el nuevo arreglo.

// NOTA: Si un 'case' no contiene una función o una lógica que modifique el estado, aún así debe devolver el estado actual sin modificar. Esto se hace utilizando la declaración 'return' para devolver el estado original.
// El 'return' puede estar anidado en un condicional, y aún así será suficiente para provocar la renderización, pero para garantizar la renderización, hay que utilizar un return al final del 'case'.

// ******