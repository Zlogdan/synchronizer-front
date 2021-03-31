import React from 'react';

function Cell(props) {
    return (
        <label className="cell">{props.value}</label>
    );
}

class MyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderCell(i) {
        return (
            <Cell
                value={this.props.squares[i]}
            />
        );
    }

    renderColumn(table) {
        let columns = []

        for (let i = 0; i < table.columnNames.length; i++) {
            let row = []
            for (let j = 0; j < table.rows.length; j++) {
                let columnCell = (
                    <div className="row">
                        <Cell
                            value={table.rows[j][i]}
                        />
                    </div>
                )
                row.push(columnCell)
            }
            let cell = (
                <div className="col-sm-1">
                    <div className="row">
                        <Cell
                            value={table.columnNames[i]}
                        />
                    </div>
                    {row}
                </div>
            )
            columns.push(cell)
        }

        return (columns)
    }

    newRenderTable(table) {
        let rows = []
        for (let i=0;i<5;i++) {
            let row=(
                <div className="row">
                    <div className="col-sm">
                        Одна из трёх колонок 1
                    </div>
                    <div className="col-sm">
                        Одна из трёх колонок 2
                    </div>
                    <div className="col-sm">
                        Одна из трёх колонок 3
                    </div>
                </div>
            )
            rows.push(
                row
            )
        }

        return (rows)
    }

    render() {
        return (
            <form>
                <div className="container">
                    {this.newRenderTable(this.props.table)}
                </div>
                другая
                <div className="container">
                    <div className="row ">
                        {this.renderColumn(this.props.table)}
                    </div>
                </div>
            </form>
        );
    }
}

export default MyTable