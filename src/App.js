import React from 'react';
import './css/App.css';
import {Link, Route, Switch} from "react-router-dom";
import Dict from "./routes/Dict";
import Repeater from "./routes/Repeater";
import Home from "./routes/Home";
import {Nav, Navbar} from 'react-bootstrap';


const NavBar = () => (
    <div>
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <li><Link className="navbar-brand" to='/'>АСПР мультитул</Link></li>
                <li><Link className="nav-link" to='/dict'>Словари</Link></li>
                <li><Link className="nav-link" to='/repeater'>Запросы</Link></li>
            </Nav>
        </Navbar>
    </div>
)

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/dict' component={Dict}/>
            <Route path='/repeater' component={Repeater}/>
        </Switch>
    </main>
)

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <Main/>
            </div>
        );
    }
}

export default App;