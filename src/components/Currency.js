// import React from "react";
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import "../styles/style-currency.css";

  const CustomSelect = () => {

    const { currency } =useContext(AppContext); //Se trae el valor inicial de currency para mostrarse por defecto a través de 'value='.
    const { dispatch } =useContext(AppContext); //useConext en la función y AppConext es la función que se crea.

    const setCurrency = (e) => {

        console.log({e});
      dispatch({ //Dispatch take an Action as parameter:
          type: 'CHG_CURRENCY',
          payload: e
      });
  };

    

  return (
    
    <div className="alert alert-secondary currency"> 
        <div className="mycustom-select">
        {/* <span>Currency</span> */}
      <select value={currency} onChange={(event) => setCurrency(event.target.value)} className="select-style" >
        <option value="$"  className="option-style">Currency $ Dollar</option>
        <option value="£" className="option-style" >Currency £ Pound</option>  {/* currency' hace que sea selecionado como valor inicial al arrancar la interfaz, ya que es el que está cargado como base. */}'
        <option value="€" className="option-style" >Currency € Euro</option>
        <option value="₹" className="option-style" >Currency ₹ Ruppee</option>
      </select>
    </div>

    </div>

  );
}

export default CustomSelect;
