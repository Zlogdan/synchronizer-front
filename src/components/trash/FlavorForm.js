import React from 'react';
import NameForm from "./NameForm";

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: this.props.selectList.selectedOption,
            options: this.props.selectList.options
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({selectedOption: event.target.value});
    }

    handleSubmit(event) {
        alert('Выберите стенд: ' + this.state.selectedOption);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <label className="mr-2 mb-2" htmlFor="fruit">Выберите стенд:</label>
                    <div className="form-group mb-2">
                        <select className="form-control" id="fruit" value={this.state.selectedOption}
                                onChange={this.handleChange}>
                            {this.state.options.map((option) => <option>{option}</option>)}
                        </select>
                    </div>
                    <div className="form-group mb-2 ml-2">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FlavorForm;