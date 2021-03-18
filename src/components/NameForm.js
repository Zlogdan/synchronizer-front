import React from 'react';
import Table from "./Table";
import axios from "axios";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.state.newTable=''
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let url='http://localhost:8080/api/get-table/?schema=qwe&table='+this.state.value
        var self=this
        axios({
            method: 'get',
            url: url
        })
            .then(function (response) {
                console.log(response.data)
                // alert(response.data.tableName)
                self.setState({newTable:response.data})
            })
        //alert('Отправленное имя: ' + this.state.value);//select table по имени

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Имя:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/> </label>
                    <input type="submit" value="Отправить"/>
                </form>
                <Table table={this.state.newTable}/>
            </div>
        );
    }
}

export default NameForm;