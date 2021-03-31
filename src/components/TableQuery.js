import React from 'react';
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import PageviewIcon from '@material-ui/icons/Pageview';

import TableMui from "./TableMui";
import tableExampleMui from "./TableExampleMui";
import {Paper} from "@material-ui/core";

const url = 'http://10.218.2.28:8080/api/';

class TableQuery extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectRow = this.onSelectRow.bind(this);
        this.state = {
            tableNames: [],
            selectionModel: [],
            dictTable: '',
            value: 'TEST_TEST',
            selectedOption: {
                fromSelected: this.props.selectList.options[0],
                toSelected: this.props.selectList.options[1],
            },
            options: this.props.selectList.options
        };
    }

    getTableNames(schema) {
        let self = this
        axios.get(url + 'get-table-names', {
            params: {
                schema: schema
            }
        })
            .then(function (response) {
                self.setState({tableNames: response.data});
            })
    }

    onSelectRow(value) {
        this.setState({selectionModel: value});
    }

    // handleChange(source, event) {
    //     switch (source) {
    //         case "fromSelect":
    //             this.setState({
    //                 selectedOption: {
    //                     fromSelected: event.target.value,
    //                     toSelected: this.state.selectedOption.toSelected
    //                 }
    //             });
    //             this.getTableNames(event.target.value);
    //             break;
    //         case "toSelect":
    //             this.setState({
    //                 selectedOption: {
    //                     fromSelected: this.state.selectedOption.fromSelected,
    //                     toSelected: event.target.value
    //                 }
    //             });
    //             break;
    //         case "comboBox":
    //             this.setState({value: event.target.newValue});
    //
    //             break;
    //         case "input":
    //             this.setState({value: event.target.value});
    //             break
    //     }
    // }

    // handleSubmit(source, event) {
    //
    //
    // }

    handleClick(source, event) {
        const self = this;
        switch (source) {
            case "viewing":
                axios.get(url + 'get-table', {
                    params: {
                        schema: this.state.selectedOption.fromSelected,
                        table: this.state.value
                    }
                })
                    .then(function (response) {
                        if (response.status !== 200) {
                            alert(response.statusText + " " + response.status)
                        }
                        self.setState({
                            dictTable: {
                                responseTable: response.data,
                                schema: self.state.selectedOption.fromSelected
                            }
                        })
                    })
                break;
            case "copying":
                // console.log("copying")
                let body = {
                    schemaFrom: this.state.selectedOption.fromSelected,
                    schemaTo: this.state.selectedOption.toSelected,
                    table: this.state.value,
                    rowIds: []
                }
                if (body.schemaFrom !== body.schemaTo) {
                    axios.post(url + 'insert-rows', body)
                        .then(function (response) {
                            alert(response.statusText)
                        })
                } else {
                    alert("Нельзя копировать в исходную схему!!!")
                }
                break;
            default:
                break;
        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Paper className="mb-2 bg-light">
                    <div className="form-inline">
                        <div className="form-group ml-3 mt-3 mb-2 mr-2">
                            <Autocomplete
                                size="small"
                                options={this.state.options}
                                style={{width: 250, marginRight: 20}}
                                value={this.state.selectedOption.fromSelected}
                                onChange={(event, newValue) => {
                                    this.setState({
                                        selectedOption: {
                                            fromSelected: newValue,
                                            toSelected: this.state.selectedOption.toSelected
                                        }
                                    });
                                    this.getTableNames(newValue);
                                }}
                                renderInput={(params) =>
                                    <TextField {...params} label="Сервер источник" variant="outlined"/>}
                            />
                            <Autocomplete
                                size="small"
                                options={this.state.options}
                                style={{width: 250, marginRight: 20}}
                                value={this.state.selectedOption.toSelected}
                                onChange={(event, newValue) => {
                                    this.setState({
                                        selectedOption: {
                                            fromSelected: this.state.selectedOption.fromSelected,
                                            toSelected: newValue
                                        }
                                    });
                                }}
                                renderInput={(params) =>
                                    <TextField {...params} label="Сервер получатель" variant="outlined"/>}
                            />
                            <Autocomplete
                                size="small"
                                options={this.state.tableNames}
                                style={{width: 300}}
                                value={this.state.value}
                                onChange={(event, newValue) => {
                                    this.setState({value: newValue})
                                }}
                                renderInput={(params) =>
                                    <TextField {...params} label="Введите имя таблицы" variant="outlined"/>}
                            />
                        </div>
                        <div className="form-group  mt-2 ml-2">
                            <Button
                                variant="outlined"
                                color="primary"
                                size="medium"
                                className="mr-2"
                                onClick={this.handleClick.bind(this, "viewing")}
                                endIcon={<PageviewIcon/>}
                            >
                                Показать таблицу
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="medium"
                                className=""
                                onClick={this.handleClick.bind(this, "copying")}
                                endIcon={<SaveIcon/>}
                            >
                                Копировать
                                c {this.state.selectedOption.fromSelected} на {this.state.selectedOption.toSelected}
                            </Button>
                        </div>
                    </div>
                </Paper>
                <TableMui
                    dictTable={tableExampleMui}
                    onSelectRow={this.onSelectRow}
                />
            </div>
        );
    }

}

export default TableQuery;