import React from 'react';
import './css/App.css';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import Dict from "./routes/Dict";
import Repeater from "./routes/Repeater";
import Home from "./routes/Home";
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

//при возникновении надоедливых ошибок про лицензию
//закоментировать в файле node_modules/@material-ui/x-license/dist/esm/index.js строку
// console.error(["********************

const NavBar = () => (
    <div>
        <Navbar bg="dark" variant="dark" className="mb-4">
            <Nav className="mr-auto">
                <li><Link className="navbar-brand" to='/'>ZINA Мультитул</Link></li>
                <li><Link className="nav-link" to='/dict'>Словари</Link></li>
                <li><Link className="nav-link" to='/repeater'>Запросы</Link></li>
                <Nav.Link target="_blank" href="http://msb-aspr-app01:1112/">ExCamAd</Nav.Link>
                <Nav.Link target="_blank" href="http://msb-aspr-app01:1113/app/discover">Kibana</Nav.Link>
                <NavDropdown title="Spring Boot Admin" id="basic-nav-dropdown">
                    <NavDropdown.Item target="_blank" href="http://msb-aspr-app01:8090/">dev</NavDropdown.Item>
                    <NavDropdown.Item target="_blank" href="http://msb-aspr-app02:8090/">preprod</NavDropdown.Item>
                    <NavDropdown.Item target="_blank" href="http://msbrc-app01:8090/">prod</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Swagger" id="basic-nav-dropdown">
                    <NavDropdown.Item target="_blank"
                                      href="http://msb-aspr-app01:8085/swagger-ui.html">dev</NavDropdown.Item>
                    <NavDropdown.Item target="_blank"
                                      href="http://msb-aspr-app02:8085/swagger-ui.html">preprod</NavDropdown.Item>
                    <NavDropdown.Item target="_blank"
                                      href="http://msbrc-app01:8085/swagger-ui.html">prod</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="RTDM" id="basic-nav-dropdown">
                    <NavDropdown.Item target="_blank" href="http://toronto/cgi-bin/msb_dev.pl">dev</NavDropdown.Item>
                    <NavDropdown.Item target="_blank"
                                      href="http://toronto/cgi-bin/msb_test.pl">preprod</NavDropdown.Item>
                    <NavDropdown.Item target="_blank" href="http://toronto/cgi-bin/msb.pl">prod</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="RTDM Proxy" id="basic-nav-dropdown">
                    <NavDropdown.Item target="_blank"
                                      href="http://monreal:8092/rtdmproxy-ws/rtdmproxy.wsdl">dev</NavDropdown.Item>
                    <NavDropdown.Item target="_blank"
                                      href="http://sasrtdmpreprod:8092/sasrtdmpreprod/rtdmproxy.wsdl">preprod</NavDropdown.Item>
                    <NavDropdown.Item target="_blank"
                                      href="http://sasrtdmsrv02:8092/rtdmproxy-ws/rtdmproxy.wsdl">prod</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Confluence" id="basic-nav-dropdown">
                    <NavDropdown.Item target="_blank"
                                      href="https://confluence.psbnk.msk.ru/pages/viewpage.action?pageId=130856688">Что
                        нового?</NavDropdown.Item>
                    <NavDropdown.Item target="_blank"
                                      href="https://confluence/pages/viewpage.action?pageId=130856121">Главная
                        АСПР</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link target="_blank" href="https://jira.psbnk.msk.ru/secure/Tempo.jspa">Jira</Nav.Link>
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
            <Redirect to="/" />
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