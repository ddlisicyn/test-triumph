import React, {useState, useEffect} from 'react'
import { SketchPicker } from 'react-color';

export function ColorPicker({visibility, 
    closeColorpicker,
    defaultColor,
    editColor
}) {
    const [color, setColor] = useState(defaultColor || "#000");

    useEffect(() => {
        setColor(defaultColor || "#000");
    }, [defaultColor]);

    const handleChange = (color) => {
        setColor(color.hex);
    }

    const handleChangeVisibility = (e) => {
        if (e.target.className === 'wrapper__color-picker') {
            closeColorpicker();
            editColor(color);
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
                    onChangeComplete={(color) => handleChange(color)}
                />
            </div>
        </div>

    )
}

