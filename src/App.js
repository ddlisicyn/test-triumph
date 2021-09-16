import React, { useState } from 'react';
import { Table } from './components/Table';
import { Form } from './components/Form';
import { ColorPicker } from './components/ColorPicker';
import { Button } from '@material-ui/core';

const columns = [
  {
    field: 'name',
    headerName: 'name',
    type: 'string',
    minWidth: 90,
    flex: 1,
    sortable: true,
    editable: true,
    disableColumnMenu: true,
  },
  {
    field: 'type',
    headerName: 'type',
    type: 'string',
    minWidth: 90,
    flex: 1,
    sortable: false,
    editable: true,
    disableColumnMenu: true
  },
  {
    field: 'color',
    headerName: 'color',
    type: 'string',
    sortable: false,
    editable: true,
    minWidth: 90,
    flex: 1,
    disableColumnMenu: true,
  },
];

const data = [
  { id: 1, name: 'name1', type: 'main', color: '#f4f4f4'},
  { id: 2, name: 'name2', type: 'side', color: '#f8f8f8'},
  { id: 3, name: 'name3', type: 'section', color: '#f2f2f2'},
  { id: 4, name: 'name4', type: 'side', color: '#f8f8f8'},
  { id: 5, name: 'name5', type: 'article', color: '#f4f4f4'},
];

if (localStorage.length === 0) {
  data.forEach(item => {
    localStorage.setItem(`id${item.id}`, JSON.stringify(item));
  })
}

const dataFromLocalStorage = [];

for (let i = 1; i < localStorage.length + 1; i++) {
  dataFromLocalStorage.push(JSON.parse(localStorage.getItem(`id${i}`)));
} 

export default function App() {
  const [rows, setRows] = useState(dataFromLocalStorage);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [currentColor, setCurrentColor] = useState('');
  const [id, setId] = useState();

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  }

  const handleDeleteClick = () => {
    const set = new Set(selectedRows);
    if (set.size) {
      setRows(rows.filter(row => !set.has(row.id)));
      selectedRows.forEach(row => localStorage.removeItem(`id${row}`));
    } else {
      alert("Вы не выбрали ни одну из строчек!");
    }
    
  }

  const addNewRow = (inputs) => {
    const length = localStorage.length + 1;
    setRows(rows.concat([{...inputs, id: length}]));
    data.push({...inputs, id: length});
    localStorage.setItem(`id${length}`, JSON.stringify({...inputs, id: length}));
  }

  const editRow = (row) => {
    const [id] = Object.keys(row);
    if (!!id) {
      const [property] = Object.keys(row[id]);
      const obj = JSON.parse(localStorage.getItem(`id${id}`));
      if (property === 'color') {
        setCurrentColor(obj[property]);
        setId(id);
        setVisibility(true);
      }
      obj[`${property}`] = row[id][`${property}`].value;
      localStorage.setItem(`id${id}`, JSON.stringify(obj));
    }
  }
  
  const changeColorInRow = (rows) => setRows(rows);

  const changeVisibility = () => setVisibility(false);

  return (
    <>
    <div className="main">
        <div className="table-manipulation">
          <Form addNewRow={addNewRow} />
          <Button
            onClick={handleDeleteClick}
            variant="contained" 
            color="secondary"
          >Delete</Button>
        </div>
        <Table
          rows={rows} 
          columns={columns}
          onSelectionChange={handleSelectionChange}
          onEditRow={editRow}
        />
    </div>
    <ColorPicker 
          visibility={visibility}
          currentColor={currentColor}
          id={id}
          changeColorInRow={changeColorInRow}
          changeVisibility={changeVisibility}
        />
    </>
  );
}
