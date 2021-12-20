import React from "react";
import ApiService from "../../../services/api-service";
import Spinner from "../../spinner";
import DiagramView from "../../diagrams/diagram-view";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";


const header = (cover, artist, title, playUrl) => {
    return (
        <Grid container alignItems='center' spacing={3}>
            <Grid item xs={false} />
            <Grid item >
                <Avatar src={cover} alt='cover' style={{width: 100, height: 100}} />
            </Grid>
            <Grid item xs={9}>
                <Typography variant='h5' style={{cursor: 'pointer'}} onClick={() => {window.open(playUrl)}}>
                    {`${artist} - ${title}`}
                </Typography>
            </Grid>
            <Grid item xs={12} />
        </Grid>
    )
}


export default class AudioStatsPage extends React.Component {
    state = {
        loading: true,
    }
    api = new ApiService()

    componentDidMount() {
        this.api.getUser().then(this.onUserLoaded)
    }

    onUserLoaded = (user) => {
        if (typeof user !== 'undefined') {
            this.setState({loading: false}, () => {if (this.state.loading) {}})
            this.api.getAudioStats(this.props.audio_id).then(this.onDataLoaded)
        }
    }

    onDataLoaded = (data) => {
        if (typeof data !== 'undefined') {
            this.setState({data: data}, () => {if (this.state.data) {}})
        }
    }

    render() {
        const { loading, data } = this.state
        const spinner = loading ? <Spinner /> : null

        return (
            <>
                {spinner}
                {data ? header(data.coverUrl, data.artist, data.title, data.playUrl) : null}
                {data ? <DiagramView data={data.stats} /> : null}
            </>
        )
    }
}