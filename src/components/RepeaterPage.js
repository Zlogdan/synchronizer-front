import React from "react";
import {Grid, Paper, TextField} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from "@material-ui/lab/Autocomplete";

class RepeaterPage extends React.Component {

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className="bg-light">
                        <div className="text-left ml-2 pb-2">
                            <h3>Просмотр заявки</h3>
                            <div className="form-inline mb-2 pt-2">
                                <Autocomplete
                                    size="small"
                                    options={["dev","test"]}
                                    style={{width: 150, marginRight: 5}}
                                    value="ДЕВ"
                                    renderInput={(params) =>
                                        <TextField {...params} label="Выберите сервер" variant="outlined"/>}
                                />

                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="эндпоинт"
                                    style={{width: 360, marginRight: 5}}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <TextField
                                style={{width: 405}}
                                size="small"
                                id="outlined-basic"
                                label="Введите aspr_id"
                                variant="outlined"/>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="medium"
                                style={{height:40,marginLeft:5}}
                                // onClick={this.handleClick.bind(this, "copying")}
                                endIcon={<SearchIcon/>}
                            >
                                Найти
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        Отправка заявки
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="btn-warning"
                            // onClick={this.handleClick.bind(this, "copying")}
                            endIcon={<SaveIcon/>}
                        >
                            Отправить
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default RepeaterPage;

