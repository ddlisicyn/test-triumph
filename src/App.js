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

if (localStorage.length === 0) {
  data.forEach((item) => {
    localStorage.setItem(`id${item.id}`, JSON.stringify(item));
  })
}

const dataFromLocalStorage = [];

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  dataFromLocalStorage.push(JSON.parse(localStorage.getItem(key)));
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
      setRows(rows.filter((row) => !set.has(row.id)));
      selectedRows.forEach((row) => localStorage.removeItem(`id${row}`));
    } else {
      alert('Вы не выбрали ни одну из строчек!');
    }
  }

  const updateRows = (row) => {
    localStorage.setItem(`id${row.id}`, JSON.stringify(row));
    const updatedRows = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      updatedRows.push(JSON.parse(localStorage.getItem(key)));
    }
    setRows(updatedRows);
  }

  const addNewRow = (inputs) => {
    const length = localStorage.length + 1;
    setRows(rows.concat([{ ...inputs, id: length }]));
    data.push({ ...inputs, id: length });
    localStorage.setItem(`id${length}`, JSON.stringify({ ...inputs, id: length }));
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
