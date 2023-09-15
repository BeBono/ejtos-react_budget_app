import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/style-budget.css'



const Budget = () => {
    const { budget } = useContext(AppContext);

    const { dispatch } = useContext(AppContext); //Incorpora la funcionalidad de 'dispatch' a este componente.

    const {currency} =useContext(AppContext);  //Trae el valor de currency que está cargado en el estado.

    const setBudget = (count) => {
    
        dispatch({ //Dispatch take an Action as parameter:
            type: 'SET_BUDGET',
            payload: count //value set into input tag.
        })


    };

    return (
        <div className='alert alert-secondary'>
            {/* <span>Budget: £{budget}</span> */}
            
            Budget: {currency} <input className='style-budget' type="number" min={10} max={20000} step={10} value={budget} onChange={(e) => setBudget(e.target.value) } />
        </div>
    );
};
export default Budget;
