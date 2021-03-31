import React from 'react';
import axios from "axios";

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    }

    // Эта привязка обязательна для работы `this` в колбэке.    this.handleClick = this.handleClick.bind(this);  }

    handleClick() {
        axios.get('http://localhost:8080/api/get-table/?schema=qwe&table=eeeeeeeeee')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        fetch('http://localhost:8080/api/get-table/?schema=qwe&table=eeeeeeeeee')
            .then(response => response.json())
            .then(json => console.log(json))
    }

    render() {
        return (
            <button onClick={this.handleClick}>        {this.state.isToggleOn ? 'Включено' : 'Выключено'}
            </button>
        );
    }
}

export default Toggle;