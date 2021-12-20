import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import jwt from 'jsonwebtoken'
import NavigationPanel from "../navigaton-panel";
import LoginPage from "../pages/login-page";
import SaveIcon from '@material-ui/icons/Save';
import {MuiThemeProvider} from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import Pages from "../pages";
import { ruRU } from '@material-ui/core/locale';
import ApiService from "../../services/api-service";
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import GradeIcon from '@material-ui/icons/Grade';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';


const leftPanelListItems = [
    {text: 'Все звуки', icon: <AudiotrackIcon />, link: '/audios'},
    {text: 'Избранные звуки', icon: <GradeIcon />, link: '/favourite'},
    {text: 'Добавленные звуки', icon: <SaveIcon />, link: '/added'},
    {text: 'Абсолютный чарт', icon: <InsertChartIcon />, link: '/chart_absolute'},
    {text: 'Процентный чарт', icon: <DonutLargeIcon />, link: '/chart_percent'},
]


const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 13,
    },
    palette: {
        type: 'light',
        primary: {
            main: pink[600],
        },
        secondary: {
            main: pink[400],
        },
    },
}, ruRU);


const checkLoggedIn = () => {
    let loggedIn = false

    const token = localStorage.getItem('token')
    if (token) {
        const decodedToken = jwt.decode(token)
        const dateNow = new Date()
        if (decodedToken.exp * 1000 > dateNow.getTime())
            loggedIn = true
    }

    return loggedIn
}


const App = () => {

    const isLoggedInCheck = checkLoggedIn()
    const [isLoggedIn, changeLoggedInStatus] = useState(isLoggedInCheck)
    const [user, setUser] = useState({
        username: 'unknown',
    })

    const fetchUser = async () => {
        const checkUserResponse = (resp) => {
            if (typeof resp !== 'undefined') {
                setUser(resp)
            }
        }
        const api = new ApiService()
        api.getUser().then(checkUserResponse)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    let data = (
        <Switch>
            <Route path='/login' render={() => <LoginPage changeLoggedInStatus={changeLoggedInStatus}/>}/>
            <Redirect to='/login'/>
        </Switch>
    )

    if (isLoggedIn) {
        data = (
            <NavigationPanel leftPanelListItems={leftPanelListItems} user={user} >
                <Pages/>
            </NavigationPanel>
        )
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                {data}
            </Router>
        </MuiThemeProvider>
    )
}

export default App