import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../css/Table.css'
import '../react-bootstrap-table/dist/react-bootstrap-table-all.min.css'


function onSelectRow(row, isSelected, e) {
    if (isSelected) {
        //alert(`You just selected '${row['name']}'`)
    }
}

const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: onSelectRow,
    bgColor: 'gray'
};

class Table extends Component {

    renderTableHeaderColumn(tableExample) {
        let table = []
        let keys = Object.keys(tableExample.data[0])

        table.push(<TableHeaderColumn isKey
                                      tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataField={keys[0]}>{tableExample.columnNames[0]}</TableHeaderColumn>)
        for (let i = 1; i < keys.length; i++) {
            table.push(<TableHeaderColumn
                tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataField={keys[i]}>{tableExample.columnNames[i]}</TableHeaderColumn>)
        }
        return table;
    }

    render() {
        return (
            <div className="text-size">
                <BootstrapTable data={this.props.tableExample.data} selectRow={selectRowProp}>
                    {this.renderTableHeaderColumn(this.props.tableExample)}
                </BootstrapTable>
            </div>
        )
    }
}

export default Table