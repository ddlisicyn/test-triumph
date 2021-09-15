import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export function Table({columns, rows, onSelectionChange, onEditRow}) {

  return (
    <div style={{width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={onSelectionChange}
        onEditRowsModelChange={onEditRow}
        autoHeight
      />
    </div>
  );
}
