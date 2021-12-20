import React from "react";
import AllAudiosTable from "./all-audios-table";
import ApiService from "../../../services/api-service";
import Spinner from "../../spinner";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddAudioAlert from "../../add-audio-alert";
import NoPermissionsBackdrop from "../../no-permissions-backdrop";


function AddAudioField(props) {
    const { onClick, handleChange } = props
    return (
        <Paper >
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item >
                        <Button fullWidth variant='outlined' onClick={onClick} >
                            Ок
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            id="addAudioField"
                            name='addAudioField'
                            autoComplete="addAudioField-url"
                            onChange={handleChange}
                            InputLabelProps={{shrink: true}}
                            placeholder='вставь ссылку на тикток для парсинга звука'
                        />
                    </Grid>
                </Grid>
            </Toolbar>
        </Paper>
    );
}


export default class AllAudiosPage extends React.Component {
    state = {
        loading: true,
        url: undefined,
        openAlert: false,
        permError: false
    }
    api = new ApiService()

    componentDidMount() {
        this.api.getUser().then(this.onUserLoaded)
    }

    onUserLoaded = (user) => {
        if (typeof user !== 'undefined') {
            this.setState({loading: false, permError: !user.haveAccess}, () => {
                if (this.state.loading) {}
            })
        }
    }

    onAddAudio = () => {
        if (typeof this.state.url !== 'undefined') {
            this.api.addAudio(this.state.url).then(this.onAddAudioApiResponse)
        }
    }

    onAddAudioApiResponse = (response) => {
        let successState = {openAlert: true, alertType: 'success', alertText: 'Звук будет добавлен в ближайшее время'}
        let errorState = {openAlert: true, alertType: 'error', alertText: 'Ошибка с добавлением звука'}
        const newState = response ? successState : errorState
        this.setState(newState, () => {if (this.state.openAlert) {}})
    }

    handleUrlChange = (event) => {
        this.setState({url: event.target.value}, () => {if (this.state.url) {}})
    }

    handleCloseAlert = () => {
        this.setState({openAlert: false}, () => {if (this.state.openAlert) {}})
    }

    render() {
        const {loading, openAlert, alertType, alertText, permError} = this.state
        const page = !loading && !permError ? <AllAudiosTable method={this.props.method}/> : null
        const spinner = loading ? <Spinner /> : null
        const error = permError && !spinner ? <NoPermissionsBackdrop text='У тебя нет доступа' /> : null
        const alert = openAlert ? <AddAudioAlert type={alertType}
                                                 text={alertText}
                                                 closeAlert={this.handleCloseAlert}/> : null

        return (
            <div>
                <Grid container spacing={3} >
                    <Grid item xs={6}>
                        <AddAudioField onClick={this.onAddAudio} handleChange={this.handleUrlChange} />
                    </Grid>
                    <Grid item xs={12}>
                        {error}
                        {spinner}
                        {page}
                        {alert}
                    </Grid>

                </Grid>


            </div>
        )
    }
}