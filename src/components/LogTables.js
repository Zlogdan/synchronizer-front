import {XGrid} from "@material-ui/x-grid";
import React, {useEffect, useState} from "react";

export const LogTables = (props) => {
    console.log(props)
    const [curTable, setCurTable] = useState(props.table);

    useEffect(() => {
        console.log(props.table)
        setCurTable(props.table)
    });


    if (curTable === undefined) {
        return (
            <div>Пустая таблица</div>
        )
    }

    return (
        <div className="bg-light" style={{height: 450, width: '100%'}}>
            <XGrid
                pagination={true}
                pageSize={7}
                {...curTable}
                rowHeight={38}
            />
        </div>)

}