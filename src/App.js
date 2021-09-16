import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Table } from './components/Table';
import { Form } from './components/Form';
import { data } from './data/data';

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
    disableColumnMenu: true,
  },
  {
    field: 'color',
    headerName: 'color',
    type: 'string',
    sortable: false,
    editable: false,
    minWidth: 90,
    flex: 1,
    disableColumnMenu: true,
  }
];

if (localStorage.getItem('data') === null) {
  localStorage.setItem('data', JSON.stringify(data));
}

let dataFromLocalStorage;
try {
  dataFromLocalStorage = JSON.parse(localStorage.getItem('data'));
} catch (e) {
  console.log(e);
}

export default function App() {
  const [rows, setRows] = useState(dataFromLocalStorage);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  }

  const handleDeleteClick = () => {
    const set = new Set(selectedRows);
    if (set.size) {
      const filteredRows = rows.filter((row) => !set.has(row.id));
      setRows(filteredRows);
      localStorage.setItem('data', JSON.stringify(filteredRows));
    } else {
      alert('Вы не выбрали ни одну из строчек!');
    }
  }

  const updateRows = (editibleRow) => {
    const rows = JSON.parse(localStorage.getItem('data'));
    const updatedRows = rows.map(row => (row.id === editibleRow.id) ? editibleRow : row);
    setRows(updatedRows);
    localStorage.setItem('data', JSON.stringify(updatedRows));
  }

  const addNewRow = (inputs) => {
    const rows = JSON.parse(localStorage.getItem('data'));
    console.log(rows);
    const row = { ...inputs, id: rows.length + 1 };
    rows.push(row)
    setRows(rows);
    localStorage.setItem('data', JSON.stringify(rows));
  }

  return (
    <>
      <div className="main">
        <div className="table-manipulation">
          <Form addNewRow={addNewRow} />
          <Button
            onClick={handleDeleteClick}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </div>
        <Table
          rows={rows}
          columns={columns}
          onSelectionChange={handleSelectionChange}
          updateRows={updateRows}
        />
      </div>
    </>
  );
}
