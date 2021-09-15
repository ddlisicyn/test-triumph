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

        setInputs((lastInputs) => ({
            ...lastInputs,
            [name]: value,
        }))
    }

    const handleClick = () => {
        if (inputs.name && inputs.type && inputs.color) {
            addNewRow(inputs);
        } else {
            alert("Заполните все поля!");
        }
    }

    return(
        <div className="form">
            <input onChange={handleChange} placeholder="name" name="name" type="text"></input>
            <input onChange={handleChange} placeholder="type" name="type" type="text"></input>
            <div className="form__buttom">
                <input onChange={handleChange} placeholder="color" name="color" type="text"></input>
                <Button 
                    onClick={handleClick}
                    variant="contained" 
                    color="primary"
                >Add</Button>
            </div>
        </div>
    )
}