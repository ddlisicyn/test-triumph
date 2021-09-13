import React, { useState } from 'react';

export function Form({addNewRow}) {
    const [inputs, setInputs] = useState({name: '', 
    type: '', 
    color: ''});

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setInputs({
            ...inputs,
            [name]: value,
        })
    }

    const handleClick = () => {
        addNewRow(inputs);
    }

    return(
        <div>
            <input onChange={handleChange} placeholder="name" name="name" type='text'></input>
            <input onChange={handleChange} placeholder="type" name="type" type='text'></input>
            <input onChange={handleChange} placeholder="color" name="color" type='text'></input>
            <button onClick={handleClick}>Add</button>
        </div>
    )
}