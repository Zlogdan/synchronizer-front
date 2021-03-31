import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../../css/Table.css'
import '../../react-bootstrap-table/dist/react-bootstrap-table-all.min.css'


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        }
    }

    onSelectRow(row, isSelect, selected, e) {
        //console.log(this.state.selected)
        //console.log(e)
        // if (isSelect) {
        //     this.setState(prevState => ({
        //         selected: [...prevState.selected, row]
        //     }))
        // }else {
        //
        // }
    }

    selectRowProp = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, selected, e) => {
            this.onSelectRow(row, isSelect, selected, e)
        },
        bgColor: 'gray'
    };

    whatRender(dictTable) {
        let table = dictTable.responseTable;
        // console.log(table)
        if (table === '' || table === undefined) {
            return (
                <form>
                    <p className="Table-header">Введите имя таблицы и нажмите кнопку "Показать..."</p>
                </form>
            )
        } else if (table.columnNames[0] === "kek") {
            return (
                <form>l
                    <p className="Table-header">Неправильное окружение</p>
                </form>
            )
        } else if (table.data.length === 0) { //todo сделать проверку на пустые данные в ответе
            return (
                <form>
                    <p className="Table-header">Нет данных в таблице</p>
                </form>
            )
        } else {
            //console.log('whatRender table: ' + table.data)
            return (
                <div >
                    <p className="Table-header">{dictTable.schema+": "+table.tableName}</p>
                    <div className="text-size">
                        <BootstrapTable data={table.data} selectRow={this.selectRowProp}>
                            {this.renderTableHeaderColumn(table)}
                        </BootstrapTable>
                    </div>
                </div>
            )
        }
    }

    renderTableHeaderColumn(table) {
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
            this.whatRender(this.props.dictTable)
        )
    }
}

export default Table