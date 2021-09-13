import React, { useState } from 'react';
import { Table } from './components/Table';

const columns = [
  {
    field: 'name',
    headerName: 'name',
    type: 'string',
    minWidth: 90,
    sortable: false,
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

export default function App() {
  const [rows, setRows] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  }

  const handleDeleteClick = () => {
    const set = new Set(selectedRows);
    setRows(rows.filter(row => !set.has(row.id)));
  }

  return (
    <div style={{width: '100%'}}>
     <Table
      rows={rows} 
      columns={columns}
      onSelectionChange={handleSelectionChange}
     />
     <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
