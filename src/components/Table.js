import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export function Table({columns, rows, onSelectionChange}) {
  return (
    <div style={{width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={onSelectionChange}
        autoHeight
      />
    </div>
  );
}
