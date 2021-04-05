import React from "react";
import {XGrid} from "@material-ui/x-grid";
//что бы скрыть сообщение о лицензии, найти эту строку в node_modules/@material-ui/x-grid/dist/index-esm.js
// const Wa=({licenseStatus:e})=>e===Ba.Valid.toString()?null:u.createElement("div"
// и дописать в стили style:{display: "none",

class TableMui extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectRow = this.onSelectRow.bind(this);
    }

    onSelectRow(selectionModel) {
        this.props.onSelectRow(selectionModel);
    }

    returnTable() {
        console.log(this.props.dictTable)
        if (this.props.dictTable !== {}) {
            console.log("не туда")
            return (<XGrid
                pagination={true}
                pageSize={7}
                {...this.props.dictTable}
                // loading={this.props.dictTable.rows.length === 0}
                rowHeight={38}
                checkboxSelection
                onSelectionModelChange={(newSelection) => {
                    this.onSelectRow(newSelection.selectionModel)
                }}
            />)
        } else {
            return (<div>Какаха</div>)
        }
    }

    render() {
        return (
            <div>
                <div className="bg-light" style={{height: 400, width: '100%'}}>
                    {this.returnTable()}
                </div>
            </div>
        )
    }

}

export default TableMui;