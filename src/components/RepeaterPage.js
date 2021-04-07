import React from "react";
import {Grid, Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from "@material-ui/lab/Autocomplete";
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";
import {LogTables} from "./LogTables";
import getUserIP from "./GetIp";

const url = process.env.REACT_APP_REPEATER_API_URL;
const format = require('xml-formatter');

class RepeaterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendButtons: true,
            tableButtonFrom: true,
            tableButtonTo: true,
            asprId: 'ASPR_ID_ASD_QWE_!@#_123_?><',
            newAsprId: '',
            selectedOption: {
                sourceDb: '',
                targetDb: '',
                target: '',
                endpoint: '',
            },
            options: {
                sources: [],
                targets: [],
                endpoints: [],
            },
            xmlRequest: '',
            xmlRequestError: false,
            xmlResponse: '',
            xmlResponseError: false,
            requestTableFrom: undefined,
            requestTableTo: undefined,
            tableFrom: undefined,
            tableTo: undefined,
            userIp:'',
        };
    }

    componentDidMount() {
        getUserIP((ip)=>{
            this.setState({userIp:ip})
        })
        let self = this
        axios.get(url + 'sources')
            .then((sourcesResponse) => {
                axios.get(url + 'targets')
                    .then((targetsResponse) => {
                        self.setState({
                            options: {
                                sources: sourcesResponse.data,
                                targets: targetsResponse.data,
                                endpoints: self.state.options.endpoints,
                            },
                        })
                    });
            })
    }

    onChangeTargetDb(event, newValue) {
        let self = this
        axios.get(url + 'endpoints', {
            params: {
                source: newValue,
            }
        })
            .then((endpointsResponse) => {
                self.setState({
                    sendButtons: false,
                    options: {
                        sources: self.state.options.sources,
                        targets: self.state.options.targets,
                        endpoints: endpointsResponse.data,
                    },
                    selectedOption: {
                        sourceDb: self.state.selectedOption.sourceDb,
                        targetDb: newValue,
                        target: self.state.selectedOption.target,
                        endpoint: endpointsResponse.data[0],
                    }
                });
            })
    }

    getFindRequest() {
        let self = this
        axios.get(url + 'request', {
            params: {
                id: self.state.asprId,
                source: self.state.selectedOption.sourceDb
            }
        })
            .then((requestResponse) => {

                self.setState({
                    xmlRequest: format(requestResponse.data, {collapseContent: true}),
                    xmlRequestError: false,
                })
            })
            .catch((e) => {
                console.log("ОШИБКА")
                console.log(e)
                self.setState({
                    xmlRequest: e,
                    xmlRequestError: true
                })
            })
    }

    updateXmlRequest() {
        let self = this
        let body = {
            request: this.state.xmlRequest,
            endpoint: this.state.selectedOption.endpoint
        }
        axios.post(url + 'update', body)
            .then((requestResponse) => {
                self.setState({
                    xmlRequest: format(requestResponse.data, {collapseContent: true})
                })
            }).catch((e) => {
            console.log("ОШИБКА")
            console.log(e)
            self.setState({
                xmlResponse: e
            })
        })
    }

    sendRequest() {
        let self = this
        let body = {
            request: this.state.xmlRequest,
            target: this.state.selectedOption.target,
            ip: this.state.userIp,
        }
        axios.post(url + 'send', body)
            .then((requestResponse) => {
                console.log("requestResponse")
                console.log(requestResponse)
                let error = false;
                if (requestResponse.data.status !== "OK") {
                    error = true;
                }

                self.setState({
                    xmlResponse: format(requestResponse.data.body, {collapseContent: true}),
                    newAsprId: requestResponse.data.id,
                    xmlResponseError: error,
                })
            })
            .catch((e) => {
                console.log("ОШИБКА")
                console.log(e)
                self.setState({
                    xmlResponse: e
                })
            })
    }

    getTableFrom() {
        let self = this
        axios.get(url + 'info', {
            params: {
                id: self.state.asprId,
                source: self.state.selectedOption.sourceDb
            }
        })
            .then((response) => {
                this.setState({
                    requestTableFrom: response.data,
                    tableButtonFrom: false
                })
            })
    }

    getTableTo() {
        let self = this
        axios.get(url + 'info', {
            params: {
                id: self.state.newAsprId,
                source: self.state.selectedOption.targetDb
            }
        })
            .then((response) => {
                this.setState({
                    requestTableTo: response.data,
                    tableButtonTo: false
                })
            })
    }

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper className="bg-light mb-3">
                            <div className="text-left ml-2 pb-3">
                                <h3>Просмотр заявки</h3>
                                <div className="form-inline mb-3 pt-2">
                                    <Autocomplete
                                        size="small"
                                        options={this.state.options.sources}
                                        style={{width: 180, marginRight: 5}}
                                        onChange={(event, newValue) => {
                                            this.setState({
                                                selectedOption: {
                                                    sourceDb: newValue,
                                                    targetDb: this.state.selectedOption.targetDb,
                                                    target: this.state.selectedOption.target,
                                                    endpoint: this.state.selectedOption.endpoint,
                                                }
                                            })
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params} label="Выберите БД" variant="outlined"/>}
                                    />
                                    <TextField
                                        style={{width: 405}}
                                        size="small"
                                        id="outlined-basic"
                                        label="Введите aspr_id"
                                        onChange={(event) => {
                                            this.setState({asprId: event.target.value})
                                        }}
                                        variant="outlined"/>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="medium"
                                        style={{height: 40, marginLeft: 5}}
                                        onClick={() => {
                                            this.getFindRequest()
                                        }}
                                        endIcon={<SearchIcon/>}
                                    >
                                        Найти
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                        <TextField
                            error={this.state.xmlRequestError}
                            fullWidth
                            multiline
                            id="outlined-multiline-static"
                            label="XML код запроса"
                            rows={18}
                            value={this.state.xmlRequest}
                            onChange={(event => {
                                this.setState({xmlRequest: event.target.value})
                            })}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className="bg-light mb-3">
                            <div className="text-left ml-2 pb-3">
                                <h3>Отправка заявки</h3>
                                <div className="form-inline mb-3 pt-2">
                                    <Autocomplete
                                        size="small"
                                        options={this.state.options.targets}
                                        style={{width: 180, marginRight: 5}}
                                        onChange={(event, newValue) => {
                                            this.setState({
                                                selectedOption: {
                                                    sourceDb: this.state.selectedOption.sourceDb,
                                                    targetDb: this.state.selectedOption.targetDb,
                                                    target: newValue,
                                                    endpoint: this.state.selectedOption.endpoint,
                                                }
                                            })
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params} label="Выберите сервер" variant="outlined"/>}
                                    />
                                    <Autocomplete
                                        size="small"
                                        options={this.state.options.sources}
                                        style={{width: 180, marginRight: 5}}
                                        onChange={(event, newValue) => {
                                            this.onChangeTargetDb(event, newValue)
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params} label="Выберите БД" variant="outlined"/>}
                                    />
                                    <Autocomplete
                                        size="small"
                                        options={this.state.options.endpoints}
                                        noOptionsText="Выберите сервер для отправки заявки"
                                        style={{width: 330, marginRight: 5}}
                                        value={this.state.selectedOption.endpoint}
                                        onChange={(event, newValue) => {
                                            this.setState({
                                                selectedOption: {
                                                    sourceDb: this.state.selectedOption.sourceDb,
                                                    targetDb: this.state.selectedOption.targetDb,
                                                    target: this.state.selectedOption.target,
                                                    endpoint: newValue,
                                                }
                                            })
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params} label="эндпоинт" variant="outlined"/>}
                                    />
                                </div>
                                <div className="form-inline">
                                    <Button
                                        disabled={this.state.sendButtons}
                                        variant="outlined"
                                        color="primary"
                                        size="medium"
                                        style={{width: 170, height: 40}}
                                        onClick={() => {
                                            this.updateXmlRequest()
                                        }}
                                        endIcon={<SpellcheckIcon/>}
                                    >
                                        Адаптировать
                                    </Button>
                                    <Button
                                        disabled={this.state.sendButtons}
                                        variant="outlined"
                                        color="secondary"
                                        size="medium"
                                        style={{width: 170, height: 40, marginLeft: 5}}
                                        onClick={() => {
                                            this.sendRequest()
                                        }}
                                        endIcon={<SendIcon/>}
                                    >
                                        Отправить
                                    </Button>
                                    <TextField
                                        style={{width: 350, marginLeft: 5}}
                                        size="small"
                                        id="outlined-basic"
                                        label="Введите локальный ip"
                                        value={this.state.userIp}
                                        onChange={(event) => {
                                            this.setState({userIp: event.target.value})
                                        }}
                                        variant="outlined"/>
                                </div>
                            </div>
                        </Paper>
                        <TextField
                            error={this.state.xmlResponseError}
                            fullWidth
                            multiline
                            id="outlined-multiline-static"
                            label="XML ответ"
                            value={this.state.xmlResponse}
                            rows={16}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper className="bg-light mb-3">
                            <div className="form-horizontal mb-3 pt-2">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="medium"
                                    style={{width: 170, height: 40}}
                                    onClick={() => {
                                        this.getTableFrom()
                                    }}
                                >
                                    Получить
                                </Button>
                                <Button
                                    disabled={this.state.tableButtonFrom}
                                    variant="outlined"
                                    color="default"
                                    size="medium"
                                    style={{width: 170, height: 40, marginLeft: 5}}
                                    onClick={() => {
                                        if (this.state.requestTableFrom !== undefined) {
                                            this.setState({tableFrom: this.state.requestTableFrom.ASPR_WSCALL_LOG})
                                        }
                                    }}
                                >
                                    wsCallLog
                                </Button>
                                <Button
                                    disabled={this.state.tableButtonFrom}
                                    variant="outlined"
                                    color="default"
                                    size="medium"
                                    style={{width: 170, height: 40, marginLeft: 5}}
                                    onClick={() => {
                                        if (this.state.requestTableFrom !== undefined) {
                                            this.setState({tableFrom: this.state.requestTableFrom.ASPR_BASE_RESULT})
                                        }
                                    }}
                                >
                                    baseResult
                                </Button>
                            </div>
                            <LogTables table={this.state.tableFrom}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className="bg-light mb-3">
                            <div className="form-horizontal mb-3 pt-2">
                                <Button
                                    disabled={this.state.sendButtons}
                                    variant="outlined"
                                    color="primary"
                                    size="medium"
                                    style={{width: 150, height: 40}}
                                    onClick={() => {
                                        this.getTableTo()
                                    }}
                                >
                                    Получить
                                </Button>
                                <Button
                                    disabled={this.state.tableButtonTo}
                                    variant="outlined"
                                    color="default"
                                    size="medium"
                                    style={{width: 150, height: 40, marginLeft: 5}}
                                    onClick={() => {
                                        if (this.state.requestTableTo !== undefined) {
                                            this.setState({tableTo: this.state.requestTableTo.ASPR_WSCALL_LOG})
                                        }
                                    }}
                                >
                                    wsCallLog
                                </Button>
                                <Button
                                    disabled={this.state.tableButtonTo}
                                    variant="outlined"
                                    color="default"
                                    size="medium"
                                    style={{width: 150, height: 40, marginLeft: 5}}
                                    onClick={() => {
                                        if (this.state.requestTableTo !== undefined) {
                                            this.setState({tableTo: this.state.requestTableTo.ASPR_BASE_RESULT})
                                        }
                                    }}
                                >
                                    baseResult
                                </Button>
                                <TextField
                                    style={{width: 340, marginLeft: 5}}
                                    size="small"
                                    id="outlined-basic"
                                    label="Введите aspr_id"
                                    value={this.state.newAsprId}
                                    onChange={(event) => {
                                        this.setState({newAsprId: event.target.value})
                                    }}
                                    variant="outlined"/>
                            </div>
                            <LogTables table={this.state.tableTo}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default RepeaterPage;

