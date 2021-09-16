import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { ColorPicker } from './ColorPicker';

export function Form({ addNewRow }) {
  const [inputs, setInputs] = useState({
    name: '',
    type: '',
    color: '',
  });
  const [visibility, setVisibility] = useState(false);

  const openColorpicker = () => setVisibility(true);
  const closeColorpicker = () => setVisibility(false);

  const editColor = (color) => {
    setInputs({
      ...inputs,
      color,
    })
  }

  const handleChange = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const handleClickColor = () => {
    openColorpicker();
  }

  const handleClick = () => {
    if (inputs.name && inputs.type && inputs.color) {
      addNewRow(inputs);
      setInputs({
        name: '',
        type: '',
        color: '',
      });
    } else {
      alert('Заполните все поля!');
    }
  }

  return (
    <>
      <div className="form">
        <input onChange={handleChange} placeholder="name" name="name" type="text" value={inputs.name} />
        <input onChange={handleChange} placeholder="type" name="type" type="text" value={inputs.type} />
        <div className="form__buttom">
          <input
            onChange={handleChange}
            onClick={handleClickColor}
            placeholder="color"
            name="color"
            type="text"
            autoComplete="off"
            value={inputs.color}
            readOnly
          />
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
      </div>
      <ColorPicker
        visibility={visibility}
        closeColorpicker={closeColorpicker}
        openColorpicker={openColorpicker}
        editColor={editColor}
      />
    </>
  )
}
