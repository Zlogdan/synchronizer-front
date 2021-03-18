import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../css/Table.css'
import '../react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
//import table from "./table";


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

    whatRender(table) {
        if (table === '') {
            return (
                <form>
                    <p className="Table-header">Введите имя таблицы</p>
                </form>
            )
        }else if(table.data===[]){ //todo сделать проверку на пустые данные в ответе
            return (
                <form>
                    <p className="Table-header">Ничего нет</p>
                </form>
            )
        } else {
            console.log(table.data)
            return (
                <form>
                    <p className="Table-header">{table.tableName}</p>
                    <div className="text-size">
                        <BootstrapTable data={this.props.table.data} selectRow={selectRowProp}>
                            {this.renderTableHeaderColumn(this.props.table)}
                        </BootstrapTable>
                    </div>
                </form>
            )
        }
    }

    renderTableHeaderColumn(table){
        console.log(table)
        if (table === '') {
            console.log("PIZDOS")
        }
        let currentTable = []
        let keys = Object.keys(table.data[0])

        currentTable.push(<TableHeaderColumn isKey
                                      tdStyle={{
                                          whiteSpace: 'normal',
                                          wordWrap: 'break-word'
                                      }} dataField={keys[0]}>{table.columnNames[0]}</TableHeaderColumn>)
        for (let i = 1; i < keys.length; i++) {
            currentTable.push(<TableHeaderColumn
                tdStyle={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                }} dataField={keys[i]}>{table.columnNames[i]}</TableHeaderColumn>)
        }
        return currentTable;
    }


    render() {
        return (
            this.whatRender(this.props.table)
        )
    }
}

export default Table