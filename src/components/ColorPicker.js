import React, { useState } from 'react'
import { SketchPicker } from 'react-color';

export function ColorPicker({visibility, currentColor, id, changeColorInRow, changeVisibility}) {
    const [color, setColor] = useState(currentColor);

    const handleColorChange = (color) => {
        setColor(color.hex);
        const obj = JSON.parse(localStorage.getItem(`id${id}`))
        obj.color = color.hex;
        localStorage.setItem(`id${id}`, JSON.stringify(obj));
    }

    const handleChangeVisibility = (e) => {
        if (e.target.className === 'wrapper__color-picker') {
            const newRows = [];

            for (let i = 1; i < localStorage.length + 1; i++) {
                newRows.push(JSON.parse(localStorage.getItem(`id${i}`)));
            }
            changeColorInRow(newRows);
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

