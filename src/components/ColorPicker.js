import React, { useState } from 'react'
import { SketchPicker } from 'react-color';

export function ColorPicker({visibility, currentColor, id, rows, changeColorInRow, changeVisibility}) {
    const [color, setColor] = useState(`${currentColor}`);

    const handleColorChange = (color) => {
        setColor(color);

        const obj = JSON.parse(localStorage.getItem(`id${id}`))
        obj.color = color.hex;
        localStorage.setItem(`id${id}`, JSON.stringify(obj));
        
        const newRow = rows.map(row => {
            if (row.id == id) {
                row.color = color.hex;
            }
            return row;
        });

        changeColorInRow(newRow);
    }

    const handleChangeVisibility = (e) => {
        if (e.target.className === 'wrapper__color-picker') {
            changeVisibility();
        }
    }

    return (
        <div 
            className={visibility ? "wrapper__color-picker" : "hide"}
            onClick={handleChangeVisibility}
        >
            <div className="color-picker">
                <SketchPicker
                    color={color}
                    onChangeComplete={(color) => handleColorChange(color)}
                />
            </div>
        </div>

    )
}

