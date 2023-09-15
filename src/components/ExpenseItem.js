import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";

import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);
    const { currency } =useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({ //Dispatch take an Action as parameter:
            type: 'ADD_EXPENSE',
            payload: expense // Object defined above
        });

    };

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({ //Dispatch take an Action as parameter y lo envía al reducer ubicado en AppContex.js que centraliza/contiene el estado inicial de las variables/valores de la app y es así como cada componente por sepadao puede actuar para actualizar/interactuar con la app general:
            type: 'DECREASE',
            payload: expense
        });
    };


    return (
        <tr>
        <td>{props.name}</td>
        <td>{ currency }{props.cost}</td>
        <td><AiFillPlusCircle onClick={event=> increaseAllocation(props.name)} 
        size={'1.25em'}  style={{cursor: 'pointer', userSelect:'none', color: 'green' }} > 
        </AiFillPlusCircle> </td>

        <td><AiFillMinusCircle onClick={e=> decreaseAllocation(props.name)} 
        size={'1.25em'}  style={{cursor: 'pointer', userSelect:'none', color: 'orange' }} > 
        </AiFillMinusCircle> </td>

        <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;


