import React, { useState } from 'react';
import { Button } from '@material-ui/core';

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
        <div className="form">
            <input onChange={handleChange} placeholder="name" name="name" type='text'></input>
            <input onChange={handleChange} placeholder="type" name="type" type='text'></input>
            <Button 
                onClick={handleClick}
                variant="contained" 
                color="primary"
            >Add</Button>
        </div>
    )
}