import React from 'react';

function Currency() {
  return (
    <div className='alert alert-secondary' >
                        {/* <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}> */}
                        
                        <select className="custom-select" id="inputGroupSelect01">
                        <option defaultValue>Currency</option>
                        <option name="$" >Dollar</option>
                        <option name="£" >Pound</option>
                        <option name="€" >Euro</option>
                        <option name="₹">Ruppee</option>
                
                         </select>
    </div>
  );
}

export default Currency;