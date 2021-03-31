import React from 'react';
import Table from "./Table";
import axios from "axios";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'DICT_ROUTE_SUB'};
        this.state.newTable = ''
        this.state.schema = this.props.schema
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});

    }

    handleSubmit(event) {
        let url = 'http://localhost:8080/api/get-table/?schema=' + this.state.schema + '&table=' + this.state.value
        console.log(url)
        var self = this
        axios({
            method: 'get',
            url: url
        })
            .then(function (response) {
                self.setState({newTable: response.data})
            })

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Имя таблицы:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/> </label>
                    <input type="submit" value="Отправить"/>
                </form>
                <Table table={this.state.newTable}/>
            </div>
        );
    }
}

export default NameForm;