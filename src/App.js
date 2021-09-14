import React, { useState } from 'react';
import { Table } from './components/Table';
import { Form } from './components/Form';

const columns = [
  {
    field: 'name',
    headerName: 'name',
    type: 'string',
    minWidth: 90,
    sortable: true,
    editable: true,
    disableColumnMenu: true,
  },
  {
    field: 'type',
    headerName: 'type',
    type: 'string',
    minWidth: 90,
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
    disableColumnMenu: true,
  },
];

const data = [
  { id: 1, name: 'name1', type: 'main', color: '#f4f4f4'},
  { id: 2, name: 'name2', type: 'side', color: '#f8f8f8'},
  { id: 3, name: 'name3', type: 'side', color: '#f8f8f8'},
  { id: 4, name: 'name4', type: 'side', color: '#f8f8f8'},
  { id: 5, name: 'name5', type: 'side', color: '#f8f8f8'},
];

if (!localStorage.getItem('id1')) {
  data.forEach(item => {
    localStorage.setItem(`id${item.id}`, JSON.stringify(item));
  })
}

const dataFromLocalStorage = [];

for (let i = 0; i < localStorage.length; i++) {
  dataFromLocalStorage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
} 

export default function App() {
  const [rows, setRows] = useState(dataFromLocalStorage);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  }

  const handleDeleteClick = () => {
    const set = new Set(selectedRows);
    setRows(rows.filter(row => !set.has(row.id)));
    selectedRows.forEach(row => localStorage.removeItem(`id${row}`));
  }

  const addNewRow = (inputs) => {
    const length = data.length + 1;
    setRows(rows.concat([{...inputs, id: length}]));
    data.push({...inputs, id: length});
    localStorage.setItem(`id${length}`, JSON.stringify({...inputs, id: length}));
  }

  const editRow = (row) => {
    const [id] = Object.keys(row);
    if (!!id) {
      const [property] = Object.keys(row[id]);
      const obj = JSON.parse(localStorage.getItem(`id${id}`));
      obj[`${property}`] = row[id][`${property}`].value;
      localStorage.setItem(`id${id}`, JSON.stringify(obj));
    }
  }

  return (
    <div style={{width: '100%'}}>
     <Table
      rows={rows} 
      columns={columns}
      onSelectionChange={handleSelectionChange}
      onEditRow={editRow}
     />
     <button onClick={handleDeleteClick}>Delete</button>
     <Form addNewRow={addNewRow} />
    </div>
  );
}
