import {GridToolbar, XGrid} from "@material-ui/x-grid";
import React, {useEffect, useState} from "react";

export const DictTable = (props) => {
    const [curTable, setCurTable] = useState(props.table);


    useEffect(() => {
        setCurTable(props.table)
    });


    if (curTable === undefined) {
        return (
            <div>Пустая таблица</div>
        )
    }

    if (curTable.columns[0].field !== 'id') {
        curTable.columns.unshift({
            field: 'id',
            headerName: 'id',
            width: 20
        })
        let i = 0;
        curTable.rows.forEach((row) => {
            row.id = i;
            i = i + 1;
        })
    }
    return (
        <div className="bg-light" style={{height: 450, width: '100%'}}>
            <XGrid
                pagination={true}
                pageSize={7}
                {...curTable}
                rowHeight={38}
                checkboxSelection
                onSelectionModelChange={(newSelection) => {
                    props.onSelectRow(newSelection.selectionModel)
                }}
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </div>)

}