import React from "react";
import {Grid, Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from "@material-ui/lab/Autocomplete";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import SendIcon from '@material-ui/icons/Send';

class RepeaterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            asprId: 'ASPR_ID_ASD_QWE_!@#_123_?><',
            selectedOption: {
                fromSelected: this.props.serverList[0],
                toSelected: this.props.serverList[1],
            },
            options: this.props.serverList
        };
    }


    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className="bg-light mb-3">
                        <div className="text-left ml-2 pb-3">
                            <h3>Просмотр заявки</h3>
                            <div className="form-inline mb-3 pt-2">
                                <Autocomplete
                                    size="small"
                                    options={this.state.options}
                                    style={{width: 160, marginRight: 5}}
                                    value={this.state.selectedOption.fromSelected}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Выберите сервер" variant="outlined"/>}
                                />
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="Адрес сервера"
                                    style={{width: 350, marginRight: 5}}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div className="form-inline">
                                <TextField
                                    style={{width: 405}}
                                    size="small"
                                    id="outlined-basic"
                                    label="Введите aspr_id"
                                    defaultValue={this.state.asprId}
                                    variant="outlined"/>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="medium"
                                    style={{height: 40, marginLeft: 5}}
                                    // onClick={this.handleClick.bind(this, "copying")}
                                    endIcon={<SearchIcon/>}
                                >
                                    Найти
                                </Button>
                            </div>
                        </div>
                    </Paper>
                    <TextField
                        fullWidth
                        multiline
                        id="outlined-multiline-static"
                        label="XML код запроса"
                        rows={18}
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
                                    options={this.state.options}
                                    style={{width: 165, marginRight: 5}}
                                    value={this.state.selectedOption.toSelected}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Выберите сервер" variant="outlined"/>}
                                />
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="эндпоинт"
                                    style={{width: 350, marginRight: 5}}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div className="form-inline">
                                <Button
                                    variant="outlined"
                                    color="default"
                                    size="medium"
                                    style={{width: 170, height: 40}}
                                    // onClick={this.handleClick.bind(this, "copying")}
                                    endIcon={<FileCopyIcon/>}
                                >
                                    Копировать
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="medium"
                                    style={{width: 170, height: 40, marginLeft: 5}}
                                    // onClick={this.handleClick.bind(this, "copying")}
                                    endIcon={<SpellcheckIcon/>}
                                >
                                    Адаптировать
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="medium"
                                    style={{width: 170, height: 40, marginLeft: 5}}
                                    // onClick={this.handleClick.bind(this, "copying")}
                                    endIcon={<SendIcon/>}
                                >
                                    Отправить
                                </Button>
                            </div>
                        </div>
                    </Paper>
                    <TextField
                        fullWidth
                        multiline
                        id="outlined-multiline-static"
                        label="XML ответ"
                        rows={18}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        )
    }
}

export default RepeaterPage;

