import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { ColorPicker } from './ColorPicker';

export function Table({
  columns, rows, onSelectionChange, updateRows,
}) {
  const [visibility, setVisibility] = useState(false);
  const [defaultColor, setDefaultColor] = useState('');
  const [idRow, setIdRow] = useState();

  const editColor = (color) => {
    const obj = rows.filter((row) => row.id === idRow)[0];
    obj.color = color;
    updateRows(obj);
  }

  const editRow = (row) => {
    const [id] = Object.keys(row);
    if (id) {
      const [property] = Object.keys(row[id]);
      const obj = rows.filter((row) => row.id.toString() === id.toString())[0];
      obj[property] = row[id][property].value;
      updateRows(obj);
    }
  }

  const openColorpicker = () => setVisibility(true);
  const closeColorpicker = () => setVisibility(false);

  const onColorChange = (id, value) => (e) => {
    e.preventDefault();
    setIdRow(id);
    setDefaultColor(value);
    openColorpicker();
  }

  const handleColorChange = (color) => {
    console.log(color);
  }

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns.map((item) => ((item.field === 'color') ? {
          ...item,
          renderCell: ({ id, value }) => (
            <div
              className="color__wrapper"
              onDoubleClick={onColorChange(id, value)}
            >
              <div className="color__preview" style={{ backgroundColor: value }} />
              {value}
            </div>
          ),
        } : item))}
        checkboxSelection
        onSelectionModelChange={onSelectionChange}
        onEditRowsModelChange={editRow}
        autoHeight
      />
      <ColorPicker
        defaultColor={defaultColor}
        visibility={visibility}
        closeColorpicker={closeColorpicker}
        handleColorChange={handleColorChange}
        openColorpicker={openColorpicker}
        editColor={editColor}
      />
    </div>
  );
}
