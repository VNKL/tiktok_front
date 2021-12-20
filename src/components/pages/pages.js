import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import MainPage from "./main-page";
import AllAudiosPage from "./all-audios-page";
import AudioStatsPage from "./audio-stats-page";
import ChartPage from "./chart-page";


const Pages = () => {

    return (
        <Switch>

            <Route path='/audios' render={() => {
                return <AllAudiosPage method='getAllAudios' />
            }} />

            <Route path='/audio/:audio_id?' render={({match}) => {
                const {audio_id} = match.params
                return <AudioStatsPage audio_id={audio_id} />
            }}/>

            <Route path='/favourite' render={() => {
                return <AllAudiosPage method='getFavouriteAudios' />
            }} />

            <Route path='/added' render={() => {
                return <AllAudiosPage method='getAddedAudios' />
            }} />

            <Route path='/chart_absolute' render={() => {
                return <ChartPage method='getAbsoluteChart' />
            }} />

            <Route path='/chart_percent' render={() => {
                return <ChartPage method='getPercentChart' />
            }} />

            <Route path='/' component={MainPage} />

            <Redirect to='/' />

        </Switch>
    )
}


export default Pages